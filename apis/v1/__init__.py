from fastapi import Header, HTTPException, APIRouter
from apis import OAuth2PasswordBearer
from apis.v1 import sqlites
from apis.v1 import users

routers = APIRouter()

routers.include_router(sqlites.router, prefix="/sqlites", tags=["sqlites"])
routers.include_router(users.router, prefix="/users", tags=["users"])
