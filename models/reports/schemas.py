from typing import List, Optional
from pydantic import BaseModel, Json, JsonWrapper
from datetime import datetime


class Token(BaseModel):
    token: str


class ReportList(Token):
    pageSize: int
    pageNumber: int

class ReportClass(BaseModel):
    pass