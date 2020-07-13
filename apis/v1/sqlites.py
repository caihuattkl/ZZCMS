from apis import router, Depends, Session, HTTPException
from models.sqlite import schemas
from models.sqlite import crud
from sql_alchemys import sqlites
from config.sqlite_engine import engine, get_db
from libs.response_code import Response
import urllib.request  # 导入urllib.request库

sqlites.Base.metadata.create_all(bind=engine)


# 获取所有分类数据
@router.post("/news_class/item", response_model=[])
def get_news_class(body: schemas.NewsClass, db: Session = Depends(get_db)):
    if body.className is None:
        return Response.error("className为必填字段")

    item = crud.get_news_class(db, className=body.className)
    if item is None:
        # raise Response.error("获取数据失败!")
        raise HTTPException(status_code=404, detail="newsClassItem not found")
    return Response(item, "获取分类成功!", 200, 0)


# 获取频道页下子分类最新10条记录
@router.post("/channel_news/item", response_model=[])
def get_news_class(body: schemas.Channel_news, db: Session = Depends(get_db)):
    if body.className is None:
        return Response.error("className为必填字段")

    item = crud.get_channel_news(db, className=body.className)
    if item is None:
        raise Response.error("获取数据失败!")
    return Response(item, "获取频道新闻列表成功!", 200, 0)


# 获取公共头部顶级频道分类数据
@router.post("/channels", response_model=[])
def get_news_class(body: schemas.Channel, db: Session = Depends(get_db)):
    item = crud.get_channel(db)
    if item is None:
        raise Response.error("获取频道新闻列表失败!")
    return Response(item, "获取频道新闻列表成功!", 200, 0)


# 获取新浪指数 上证指数,创业板 深圳综指等数据
@router.post("/stock_index", response_model=[])
def get_sina_index():
    a = urllib.request.urlopen(
        "https://hq.sinajs.cn/rn=1594265279711&list=s_sh000001,s_sz399001,s_sh000300,s_sz399415,s_sz399006")
    html = a.read()
    html = html.decode("gbk")
    return Response(html, "获取股票指数成功!", 200, 0)
