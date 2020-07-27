from typing import List, Optional
from pydantic import BaseModel, Json, JsonWrapper
from datetime import datetime


class Token(BaseModel):
    token: str


class NewsDtail(Token):
    id: str


class FrontNewsDtail(BaseModel):
    url: str


class NewsClass(BaseModel):
    className: str = None


class Channel_news(BaseModel):
    className: str


class Class_news_list(BaseModel):
    childClassName: str
    firstClassName: str
    pageSize: int
    pageNumber: int

class HomeList(BaseModel):
    pass


class HeaderTopNav(BaseModel):
    pass


class QueryNews(Token):
    id: int = None
    bigClass: str
    smallClass: str = None
    title: str = None
    pageSize: int
    pageNumber: int


class AddNews(Token):
    classFirstId: str
    classChildId: str
    title: str
    description: str
    keywords: str
    subTitle: str
    subKeywords: str
    newsUrl: str
    source: str
    author: str
    nContent: str
    pv: str
    coverImg: str = None
    time: datetime


class EditNews(NewsDtail):
    classFirstId: str
    classChildId: str
    title: str
    description: str
    keywords: str
    subTitle: str
    subKeywords: str
    newsUrl: str
    source: str
    author: str
    nContent: str
    pv: str
    coverImg: str = None
    time: datetime

# class ItemBase(BaseModel):
#     title: str
#     description: Optional[str] = None
#
#
# class Item(ItemBase):
#     id: int
#     owner_id: int
#
#     class Config:
#         orm_mode = True
# class User(UserBase):
#     id: int
#     is_active: bool
#     items: List[Item] = []
#
#     class Config:
#         orm_mode = True
