from fastapi import APIRouter
from app.services.data_loader import load_sales_data
from app.models.sales import SalesRepList

router = APIRouter()

@router.get("/", response_model=SalesRepList)
def get_all_sales():
    """
    Returns list of sales data.
    """
    return load_sales_data()
