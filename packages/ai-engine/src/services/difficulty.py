"""Dynamic Difficulty Adjustment module."""

from typing import List, Dict, Any

class DifficultyAdjuster:
    """Adjusts task difficulty dynamically based on user performance."""

    def __init__(self, alpha: float = 0.2) -> None:
        """
        Initialize the DifficultyAdjuster.
        
        Args:
            alpha: The smoothing factor for exponential moving average. 
                   Higher values discount older observations faster.
        """
        self.alpha = alpha
        self.min_difficulty = 1.0
        self.max_difficulty = 10.0

    def calculate_adjusted_difficulty(self, current_difficulty: float, completion_time: float, success: bool, user_tier: str) -> float:
        """
        Calculate the adjusted difficulty level.
        
        Args:
            current_difficulty: The current difficulty level (1-10).
            completion_time: Time taken to complete the task (seconds).
            success: Whether the task was completed successfully.
            user_tier: The user's tier (e.g., beginner, intermediate, advanced).
            
        Returns:
            The newly adjusted difficulty level.
        """
        adjustment = 0.0
        
        if success:
            # Increase difficulty if successful
            adjustment += 0.5
            if completion_time < 60: # completed quickly
                adjustment += 0.5
        else:
            # Decrease difficulty if failed
            adjustment -= 1.0
            
        new_difficulty = current_difficulty + adjustment
        
        # Apply exponential moving average (EMA)
        ema_difficulty = (self.alpha * new_difficulty) + ((1 - self.alpha) * current_difficulty)
        
        # Clamp between min and max
        return max(self.min_difficulty, min(self.max_difficulty, ema_difficulty))

    def process_history(self, user_id: str, task_history: List[Dict[str, Any]]) -> float:
        """
        Process the user's task history to determine the next difficulty level.
        
        Args:
            user_id: The ID of the user.
            task_history: List of past tasks and outcomes.
            
        Returns:
            The recommended difficulty level for the next task (1-10).
        """
        if not task_history:
            return 5.0 # Default starting difficulty
            
        current_diff = task_history[-1].get('difficulty', 5.0)
        
        for task in task_history:
            current_diff = self.calculate_adjusted_difficulty(
                current_diff,
                task.get('completion_time', 120),
                task.get('success', True),
                task.get('user_tier', 'beginner')
            )
            
        return current_diff
