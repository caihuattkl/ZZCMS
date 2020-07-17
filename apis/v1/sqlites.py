from apis import router, Depends, Session, HTTPException, token_is_true, List, JSONResponse, jsonable_encoder
from models.sqlite import schemas
from models.sqlite import crud
from sql_alchemys import sqlites
from config.sqlite_engine import engine, get_db
from libs.response_code import JSONResponses
import urllib.request  # 导入urllib.request库

sqlites.Base.metadata.create_all(bind=engine)


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


# 获取前台某条资讯详细信息
@router.post("/news_front_detail", response_model=List)
async def get_news_class(body: schemas.FrontNewsDtail, db: Session = Depends(get_db)):
    item = crud.get_news_front_detail(db, body)
    if item is None: return JSONResponses.error(msg="查询失败!")
    return JSONResponses.success(item, msg="获取资讯成功!")


'''
    获取栏目资讯列表
'''


@router.post("/class_news_list", response_model=[])
def get_news_class(body: schemas.Class_news_list, db: Session = Depends(get_db)):
    if body.childClassName is '': return JSONResponses.error(msg="childClassName为必填字段!")
    if body.firstClassName is '': return JSONResponses.error(msg="firstClassName为必填字段!")
    item = crud.get_class_news_list(db, body)
    if item is None:
        raise JSONResponses.error(msg="获取数据失败!")
    return JSONResponses.success(item["data"], item, msg="获取栏目新闻列表成功!")
