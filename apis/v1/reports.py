# coding:utf-8
from apis import router, Depends, Session, HTTPException, token_is_true, List
from models.reports import schemas, crud
from sql_alchemys import sqlites
from config.sqlite_engine import engine, get_db
from libs.response_code import JSONResponses

sqlites.Base.metadata.create_all(bind=engine)


# 根据条件获取报告分类
@router.post("/report_class", response_model=List)
async def get_report_class(body: schemas.ReportClass, db: Session = Depends(get_db)):
    item = crud.get_report_class(db, body)
    if item is None: raise JSONResponses.error(code=4000, msg="newsClassItem not found")
    return JSONResponses.success(item["data"], msg="获取报告分类成功!")


# 根据条件获取报告
@router.post("/reports", response_model=List)
async def get_report_class(body: schemas.ReportClass, db: Session = Depends(get_db)):
    item = crud.get_reports(db, body)
    if item is None: raise JSONResponses.error(code=4000, msg="newsClassItem not found")
    return JSONResponses.success(item["data"], msg="获取报告分类成功!")
