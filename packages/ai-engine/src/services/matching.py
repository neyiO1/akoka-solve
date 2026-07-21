"""Task matching service using Collaborative Filtering."""

from typing import List, Dict, Any
import numpy as np
from sklearn.neighbors import NearestNeighbors

class TaskMatcher:
    """Matches users to appropriate tasks using collaborative filtering."""

    def __init__(self, n_neighbors: int = 5) -> None:
        """
        Initialize the TaskMatcher.
        
        Args:
            n_neighbors: Number of neighbors to use for nearest neighbors queries.
        """
        self.n_neighbors = n_neighbors
        self.model = NearestNeighbors(n_neighbors=self.n_neighbors, metric='cosine')
        self.is_fitted = False
        self.task_features = np.array([])
        self.task_ids = []

    def extract_features(self, academic_background: Dict[str, Any], completed_tasks: List[str]) -> np.ndarray:
        """
        Extract feature vector from user profile.
        
        Args:
            academic_background: User's academic history.
            completed_tasks: List of task IDs completed by the user.
            
        Returns:
            A numpy array representing the user's feature vector.
        """
        # Dummy feature extraction logic
        # In a real system, this would encode categorical variables, 
        # TF-IDF on academic subjects, etc.
        feature_vector = np.random.rand(1, 10) 
        return feature_vector

    def fit(self, task_data: List[Dict[str, Any]]) -> None:
        """
        Fit the NearestNeighbors model with available tasks.
        
        Args:
            task_data: List of dictionaries containing task attributes.
        """
        if not task_data:
            return
            
        # Example extraction of task features
        self.task_ids = [task['id'] for task in task_data]
        self.task_features = np.random.rand(len(task_data), 10) # Dummy task features
        
        self.model.fit(self.task_features)
        self.is_fitted = True

    def predict(self, user_id: str, completed_tasks: List[str], academic_background: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Predict the best tasks for a user based on their profile.
        
        Args:
            user_id: The ID of the user.
            completed_tasks: List of task IDs completed by the user.
            academic_background: User's academic history.
            
        Returns:
            A list of recommended tasks with scores, sorted by relevance.
        """
        if not self.is_fitted:
            raise RuntimeError("Model must be fitted before calling predict.")
            
        user_features = self.extract_features(academic_background, completed_tasks)
        
        distances, indices = self.model.kneighbors(user_features)
        
        recommendations = []
        for i, idx in enumerate(indices[0]):
            task_id = self.task_ids[idx]
            if task_id not in completed_tasks:
                score = 1.0 / (1.0 + distances[0][i]) # Convert distance to similarity score
                recommendations.append({
                    "task_id": task_id,
                    "score": float(score)
                })
                
        # Sort by score descending
        recommendations.sort(key=lambda x: x["score"], reverse=True)
        return recommendations
