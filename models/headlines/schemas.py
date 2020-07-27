from typing import List, Optional
from pydantic import BaseModel, Json, JsonWrapper
from datetime import datetime


class Token(BaseModel):
    token: str


class CreatHeadline(Token):
    content: str
    description: str
    time: datetime
