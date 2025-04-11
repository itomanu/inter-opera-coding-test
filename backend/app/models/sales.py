from enum import Enum
from pydantic import BaseModel, EmailStr
from typing import List


class DealStatus(str, Enum):
    closed_won = "Closed Won"
    closed_lost = "Closed Lost"
    in_progress = "In Progress"


class Deal(BaseModel):
    client: str
    value: float
    status: DealStatus


class Client(BaseModel):
    name: str
    industry: str
    contact: EmailStr


class SalesRep(BaseModel):
    id: int
    name: str
    role: str
    region: str
    skills: List[str]
    deals: List[Deal]
    clients: List[Client]


class SalesRepList(BaseModel):
    salesReps: List[SalesRep]
