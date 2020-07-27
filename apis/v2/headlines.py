from apis import router, Depends, Session, HTTPException, token_is_true, List
from models.headlines import schemas, crud
from sql_alchemys import headlines
from config.sqlite_engine import engine, get_db
from libs.response_code import JSONResponses

headlines.Base.metadata.create_all(bind=engine)


# 设置首页头条
@router.post("/set_headline", response_model=List)
async def get_news_class(body: schemas.CreatHeadline, db: Session = Depends(get_db)):
    await token_is_true(body)
    item = crud.creat_home_headline(db, body)
    if item is None: raise JSONResponses.error(code=4000, msg="newsClassItem not found")
    return JSONResponses.success(item["data"], msg="设置头条成功!")


# 获取首页头条
@router.post("/get_headline", response_model=List)
async def get_news_class(body: schemas.Token, db: Session = Depends(get_db)):
    await token_is_true(body)
    item = crud.get_home_headline(db, body)
    if item is None: raise JSONResponses.error(code=4000, msg="newsClassItem not found")
    return JSONResponses.success(item["data"], msg="获取头条数据成功!")
