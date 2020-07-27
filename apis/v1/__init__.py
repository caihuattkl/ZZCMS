from fastapi import Header, HTTPException, APIRouter
from apis.v1 import sqlites,reports

routers1 = APIRouter()

routers1.include_router(sqlites.router, prefix="/sqlites", tags=["sqlites"])
routers1.include_router(reports.router, prefix="/reports", tags=["reports"])