'''
    v2版本下所有接口都需要token,使用管理后台调用
'''

from fastapi import Header, HTTPException, APIRouter
from apis import OAuth2PasswordBearer
from apis.v2 import sqlites
from apis.v2 import users

routers2 = APIRouter()

routers2.include_router(sqlites.router, prefix="/sqlites", tags=["sqlites"])
routers2.include_router(users.router, prefix="/users", tags=["users"])
