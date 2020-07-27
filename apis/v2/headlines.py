from apis import router, Depends, Session, HTTPException, token_is_true, List
from models.headlines import schemas, crud
from sql_alchemys import headlines
from config.sqlite_engine import engine, get_db
from libs.response_code import JSONResponses

headlines.Base.metadata.create_all(bind=engine)


# 根据条件获取报告分类
@router.post("/created_headline", response_model=List)
async def get_news_class(body: schemas.CreatHeadline, db: Session = Depends(get_db)):
    await token_is_true(body)
    item = crud.creat_home_headline(db, body)
    if item is None: raise JSONResponses.error(code=4000, msg="newsClassItem not found")
    return JSONResponses.success(item["data"], msg="创建头条成功!")
