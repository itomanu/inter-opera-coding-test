from pydantic import BaseModel, Field, field_validator


class AIRequest(BaseModel):
    question: str = Field(..., description="The question to ask the AI", min_length=1)

    @field_validator("question", mode="after")
    @classmethod
    def question_must_not_be_empty(cls, value: any):
        if not value.strip():
            raise ValueError("Question must not be empty")
        return value


class AIResponse(BaseModel):
    answer: str
