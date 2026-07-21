"""Kafka Producer module for AI Engine."""

import json
import logging
from typing import Any, Dict

from confluent_kafka import Producer

from .config import settings

logger = logging.getLogger(__name__)

class AIProducer:
    """Kafka producer for AI events."""

    def __init__(self) -> None:
        """Initialize the Kafka producer."""
        conf = {
            "bootstrap.servers": settings.kafka_broker,
            "client.id": "ai_engine_producer"
        }
        self.producer = Producer(conf)

    def delivery_callback(self, err: Any, msg: Any) -> None:
        """
        Callback for message delivery.
        
        Args:
            err: Error object if delivery failed, else None.
            msg: The delivered message object.
        """
        if err:
            logger.error(f"Message delivery failed: {err}")
        else:
            logger.debug(f"Message delivered to {msg.topic()} [{msg.partition()}]")

    def produce_message(self, topic: str, key: str, value: Dict[str, Any]) -> None:
        """
        Produce a message to a Kafka topic.
        
        Args:
            topic: The topic name.
            key: The message key.
            value: The message payload (dictionary).
        """
        try:
            self.producer.produce(
                topic,
                key=key,
                value=json.dumps(value),
                callback=self.delivery_callback
            )
            self.producer.poll(0)
        except Exception as e:
            logger.error(f"Error producing message: {e}")

    def flush(self) -> None:
        """Flush the producer queue."""
        self.producer.flush()

producer = AIProducer()
