import os
from openai import OpenAI
from .common import LLMHandler, LLMResponseEmptyError, LLMServiceError

client = OpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com"
)


class DeepseekHandler(LLMHandler):
    def handle_prompt(self, prompt, model="deepseek-chat"):
        try:
            response = client.responses.create(
                model=model,
                input=prompt
            )

            if not response.output_text:
                raise LLMResponseEmptyError()

            return response.output_text
        except Exception as e:
            raise LLMServiceError(str(e))
