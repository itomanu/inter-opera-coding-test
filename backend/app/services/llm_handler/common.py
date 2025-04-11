from abc import ABC, abstractmethod


class LLMHandler(ABC):
    @abstractmethod
    def handle_prompt(self, prompt: str, model: str) -> str:
        pass


class LLMResponseEmptyError(Exception):
    """Raised when LLM API returns an empty response."""
    pass


class LLMServiceError(Exception):
    """Raised when there is an issue communicating with LLM API."""
    pass
