import json
from pathlib import Path
from app.models.sales import SalesRepList

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "dummyData.json"

def load_sales_data() -> SalesRepList:
    with open(DATA_PATH, "r") as f:
        data = json.load(f)
    return SalesRepList(**data)
