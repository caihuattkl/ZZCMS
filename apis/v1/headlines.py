from apis import router, Depends, Session, HTTPException, token_is_true, List
from models.headlines import schemas, crud
from sql_alchemys import headlines
from config.sqlite_engine import engine, get_db
from libs.response_code import JSONResponses

headlines.Base.metadata.create_all(bind=engine)


# 根据条件获取报告分类
@router.post("/get_headline", response_model=List)
async def get_news_class(body: schemas.ReportClass, db: Session = Depends(get_db)):
    item = crud.set_home_headline(db, body)
    if item is None: raise JSONResponses.error(code=4000, msg="newsClassItem not found")
    return JSONResponses.success(item["data"], msg="获取头条信息成功!")
