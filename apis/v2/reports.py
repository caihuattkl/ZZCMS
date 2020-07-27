from apis import router, Depends, Session, HTTPException, token_is_true, List
from models.reports import schemas, crud
from sql_alchemys import sqlites
from config.sqlite_engine import engine, get_db
from libs.response_code import JSONResponses

sqlites.Base.metadata.create_all(bind=engine)


# 根据条件获取报告列表
@router.post("/report_list", response_model=List)
async def get_news_class(body: schemas.ReportList, db: Session = Depends(get_db)):
    await token_is_true(body)
    item = crud.get_report_list(db, body)
    if item is None: raise JSONResponses.error(code=4000, msg="newsClassItem not found")
    return JSONResponses.success(item["data"], item["jumpPage"], msg="获取报告成功!")