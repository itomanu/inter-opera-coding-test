from fastapi import APIRouter, HTTPException, status
from app.models.ai import AIRequest, AIResponse
from app.services.llm_handler import SUPPORTED_LLM, common

router = APIRouter()

@router.post("/", response_model=AIResponse)
def ai_endpoint(request: AIRequest):
    """
    Accepts a user question and returns a placeholder AI response.
    """
    llm_handler = SUPPORTED_LLM.get("gemini")

    if not llm_handler:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="LLM handler is not fully configured."
        )

    try:
        answer = llm_handler.handle_prompt(request.question)
        return AIResponse(answer=answer)
    except (common.LLMResponseEmptyError, common.LLMServiceError) as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
