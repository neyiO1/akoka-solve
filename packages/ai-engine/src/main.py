"""Main FastAPI application for AI Engine."""

import logging
from typing import List, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .config import settings
from .services.matching import TaskMatcher
from .services.difficulty import DifficultyAdjuster
from .services.bias_audit import BiasAuditor
from .kafka.producer import producer

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mock Global Services
task_matcher = TaskMatcher()
difficulty_adjuster = DifficultyAdjuster()
bias_auditor = BiasAuditor()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events for the FastAPI application."""
    # Startup logic
    logger.info("Starting AI Engine...")
    logger.info(f"Connecting to Redis at {settings.redis_url}")
    logger.info(f"Connecting to Kafka at {settings.kafka_broker}")
    
    # Pre-fit task matcher with dummy data
    dummy_tasks = [{"id": f"task_{i}"} for i in range(100)]
    task_matcher.fit(dummy_tasks)
    
    yield
    
    # Shutdown logic
    logger.info("Shutting down AI Engine...")
    producer.flush()

app = FastAPI(
    title=settings.app_name,
    description="AI Psychometric Engine for Akoka Solve",
    version="0.1.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for unexpected errors."""
    logger.error(f"Unexpected error: {exc}")
    return {"detail": "Internal Server Error"}, 500

# Models
class MatchRequest(BaseModel):
    userId: str
    completedTaskIds: List[str]
    academicBackground: Dict[str, Any]

class DifficultyRequest(BaseModel):
    userId: str
    taskHistory: List[Dict[str, Any]]

class BiasAuditRequest(BaseModel):
    predictions: List[Dict[str, Any]]

# Endpoints
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

@app.post("/v1/ai/match")
async def match_tasks(request: MatchRequest):
    """Match tasks to user based on profile."""
    try:
        recommendations = task_matcher.predict(
            user_id=request.userId,
            completed_tasks=request.completedTaskIds,
            academic_background=request.academicBackground
        )
        
        # Publish event
        producer.produce_message(
            topic="ai_match_ready",
            key=request.userId,
            value={"userId": request.userId, "recommendations": recommendations}
        )
        
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/ai/difficulty")
async def adjust_difficulty(request: DifficultyRequest):
    """Adjust difficulty based on task history."""
    try:
        new_difficulty = difficulty_adjuster.process_history(
            user_id=request.userId,
            task_history=request.taskHistory
        )
        return {"new_difficulty": new_difficulty}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/ai/audit")
async def audit_bias(request: BiasAuditRequest):
    """Audit model predictions for bias."""
    try:
        report = bias_auditor.generate_report(request.predictions)
        
        if report.get("requires_human_review"):
            producer.produce_message(
                topic="bias_alert",
                key="alert",
                value={"report": report}
            )
            
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
