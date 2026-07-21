"""Configuration settings for the AI Engine."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings using Pydantic."""
    
    app_name: str = "Akoka Solve AI Engine"
    environment: str = "development"
    redis_url: str = "redis://localhost:6379"
    kafka_broker: str = "localhost:9092"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
