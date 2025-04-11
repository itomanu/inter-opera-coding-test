import os
from google import genai
from .common import LLMHandler, LLMResponseEmptyError, LLMServiceError

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class GeminiHandler(LLMHandler):
    def handle_prompt(self, prompt, model="gemini-2.0-flash"):
        try:
            response = client.models.generate_content(
                model=model,
                contents=[prompt]
            )
            if not response.text:
                raise LLMResponseEmptyError()

            return response.text
        except Exception as e:
            raise LLMServiceError(str(e))
