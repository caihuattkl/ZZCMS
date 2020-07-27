from apis import router, Depends, Session, HTTPException, token_is_true, List, JSONResponse, jsonable_encoder
from models.sqlite import schemas
from models.sqlite import crud
from sql_alchemys import sqlites
from config.sqlite_engine import engine, get_db
from libs.response_code import JSONResponses

sqlites.Base.metadata.create_all(bind=engine)


# 根据条件获取新闻内容 列表
@router.post("/list", response_model=List)
async def get_news_class(body: schemas.QueryNews, db: Session = Depends(get_db)):
    await token_is_true(body)
    if body.bigClass is None and body.smallClass is None: return JSONResponses.error("输入参数不能为空")
    item = crud.get_news(db, body)
    if item is None:
        raise HTTPException(status_code=404, detail="newsClassItem not found")
    return JSONResponses.success(item["data"], item["jumpPage"], "获取新闻成功!")


# 新增资讯
@router.post("/add_news", response_model=List)
async def get_news_class(body: schemas.AddNews, db: Session = Depends(get_db)):
    await token_is_true(body)
    item = crud.add_news(db, body)
    if item is None: return JSONResponses.error("新增资讯失败!")
    return JSONResponses.success(item, "新增资讯成功!")


# 编辑资讯
@router.post("/edit_news", response_model=List)
async def get_news_class(body: schemas.EditNews, db: Session = Depends(get_db)):
    await token_is_true(body)
    item = crud.edit_news(db, body)
    if item is None: return JSONResponses.error("编辑资讯失败!")
    return JSONResponses.success(item, "编辑资讯成功!")


# 获取某条资讯
@router.post("/detail", response_model=List)
async def get_news_class(body: schemas.NewsDtail, db: Session = Depends(get_db)):
    await token_is_true(body)
    item = crud.get_news_detail(db, body)
    if item is None: return JSONResponses.error("查询失败!")
    return JSONResponses.success(item, "获取资讯成功!")
