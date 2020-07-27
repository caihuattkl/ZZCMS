from fastapi import Header, HTTPException, APIRouter
from apis.v1 import sqlites, reports, headlines

routers1 = APIRouter()
routers1.include_router(headlines.router, prefix="/headlines", tags=["headlines"])
routers1.include_router(sqlites.router, prefix="/sqlites", tags=["sqlites"])
routers1.include_router(reports.router, prefix="/reports", tags=["reports"])
