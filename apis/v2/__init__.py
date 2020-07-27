'''
    v2版本下所有接口都需要token,使用管理后台调用
'''

from fastapi import Header, HTTPException, APIRouter
from apis.v2 import reports, users, headlines, news

routers2 = APIRouter()
routers2.include_router(news.router, prefix="/news", tags=["news"])
routers2.include_router(headlines.router, prefix="/headlines", tags=["headlines"])
routers2.include_router(reports.router, prefix="/reports", tags=["reports"])
routers2.include_router(users.router, prefix="/users", tags=["users"])
