from apis import router, Depends, Session, HTTPException, token_is_true, List, JSONResponse, jsonable_encoder
from models.sqlite import schemas
from models.sqlite import crud
from sql_alchemys import sqlites
from config.sqlite_engine import engine, get_db
from libs.response_code import JSONResponses
import urllib.request  # 导入urllib.request库

sqlites.Base.metadata.create_all(bind=engine)


# 获取所有资讯的分类
@router.post("/class_news", response_model=[])
def get_news_class(body: schemas.NewsClass, db: Session = Depends(get_db)):
    if body.className is None:
        return JSONResponses.error("className为必填字段")

    item = crud.get_news_class(db, className=body.className)
    if item is None:
        raise HTTPException(status_code=404, detail="newsClassItem not found")
    return JSONResponses(item, "获取分类成功!", 200, 0)


# 获取频道页下各子栏目资讯最新10条记录
@router.post("/channel_news", response_model=[])
def get_news_class(body: schemas.Channel_news, db: Session = Depends(get_db)):
    if body.className is None:
        return JSONResponses.error("className为必填字段")
    item = crud.get_channel_news(db, className=body.className)
    if item is None:
        raise JSONResponses.error("获取数据失败!")
    return JSONResponses(item, "获取频道新闻列表成功!", 200, 0)


# 获取公共头部顶级大分类数据
@router.post("/header_top_nav", response_model=[])
def get_news_class(body: schemas.HeaderTopNav, db: Session = Depends(get_db)):
    item = crud.get_header_top_nav(db)
    if item is None:
        raise JSONResponses.error("获取公共头部顶级大分类数据失败")
    return JSONResponses(item, "获取公共头部顶级大分类数据成功!", 200, 0)


# 获取新浪指数 上证指数,创业板 深圳综指等数据
@router.post("/stock_index", response_model=[])
def get_sina_index():
    a = urllib.request.urlopen(
        "https://hq.sinajs.cn/rn=1594265279711&list=s_sh000001,s_sz399001,s_sh000300,s_sz399415,s_sz399006")
    html = a.read()
    html = html.decode("gbk")
    return JSONResponses(html, "获取股票指数成功!", 200, 0)


# 根据条件获取新闻内容 列表
@router.post("/news", response_model=List)
async def get_news_class(body: schemas.QueryNews, db: Session = Depends(get_db)):
    await token_is_true(body)
    if body.bigClass is None and body.smallClass is None: return Response.error("输入参数不能为空")
    item = crud.get_news(db, body)
    if item is None:
        raise HTTPException(status_code=404, detail="newsClassItem not found")
    return JSONResponses.success(item, "获取新闻成功!")


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


# 获取某条资讯详细信息
@router.post("/news/detail", response_model=List)
async def get_news_class(body: schemas.NewsDtail, db: Session = Depends(get_db)):
    await token_is_true(body)
    item = crud.get_news_detail(db, body)
    if item is None: return JSONResponses.error("查询失败!")
    return JSONResponses.success(item, "获取资讯成功!")


# 获取前台某条资讯详细信息
@router.post("/news_front_detail", response_model=List)
async def get_news_class(body: schemas.FrontNewsDtail, db: Session = Depends(get_db)):
    item = crud.get_news_front_detail(db, body)
    if item is None: return JSONResponses.error("查询失败!")
    return JSONResponses.success(item, "获取资讯成功!")
