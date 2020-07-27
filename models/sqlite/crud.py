from sqlalchemy.orm import Session
from sql_alchemys import sqlites as models
from apis import List


def get_news_class(db: Session, className: str, limit: int = 100):
    if className is '':
        return db.query(models.Cms_news_class).all()
    else:
        big_class = db.query(models.Cms_news_class).filter(models.Cms_news_class.directoryName == className).limit(
            limit).all()
        if big_class:
            small_class = db.query(models.Cms_news_class).filter(
                models.Cms_news_class.firstId == big_class[0].id).limit(limit).all()
            return big_class + small_class
        return None


def get_channel_news(db: Session, className: str, limit: int = 10):
    if className is '':
        return {"data": db.query(models.Cms_news_class).all()}
    else:
        channel_id = db.query(models.Cms_news_class).filter(models.Cms_news_class.directoryName == className).one().id
        if channel_id is None: return None
        all_data: dict = {}
        channels = db.query(models.Cms_news_class).filter(models.Cms_news_class.id == channel_id).first()
        # 频道首页推荐 最新11条数据
        all_data[channels.directoryName] = {"name": channels.title,
                                            "url": channels.directoryName + '/',
                                            "data": db.query(models.Cms_news.title,
                                                             models.Cms_news.newsUrl).filter(
                                                models.Cms_news.classFirstId == channel_id).order_by(
                                                models.Cms_news.time.desc()).limit(10).all()}

        # 循环各子栏目资讯数据,装入 all_data
        channel_class_ids = db.query(models.Cms_news_class).filter(models.Cms_news_class.firstId == channel_id).all()
        for item in channel_class_ids:
            all_data[item.directoryName] = {"name": item.title,
                                            "url": channels.directoryName + '/' + item.directoryName + '/',
                                            "data": db.query(models.Cms_news.title,
                                                             models.Cms_news.newsUrl).filter(
                                                models.Cms_news.classChildId == item.id).order_by(
                                                models.Cms_news.time.desc()).limit(10).all()
                                            }
        return {"data": all_data}


# 获取频道数据
def get_header_top_nav(db: Session, limit: int = 10):
    data = db.query(models.Cms_news_class.subTitle, models.Cms_news_class.directoryName).filter(
        models.Cms_news_class.firstId == '0').all()
    return {"data": data}


# 根据条件获取新闻
def get_news(db: Session, body: dict):
    if body.bigClass == '' and body.smallClass == '' or None:
        return db.query(models.Cms_news).limit(body.pageSize).offset(body.pageNumber * body.pageSize).all()
    if body.smallClass == '':
        return db.query(models.Cms_news).filter_by(classFirstId=body.bigClass).limit(body.pageSize).offset(
            body.pageNumber * body.pageSize).all()
    db_objs = db.query(models.Cms_news).order_by(models.Cms_news.time.desc()).limit(body.pageSize).offset(
        (int(body.pageNumber) - 1) * body.pageSize).all()
    total = db.query(models.Cms_news).count()
    data = [{
        "id": obj.id,
        "title": obj.title,
        "url": obj.newsUrl,
        "pv": obj.pv,
        "keywords": obj.keywords,
        "description": obj.description,
        "time": obj.time,
        "author": obj.author
    } for obj in db_objs]
    return {"data": data,"jumpPage": {"pageNumber": body.pageNumber, "pageSize": body.pageSize, "total": total}}


# 根据条件新增新闻
def add_news(db: Session, body: dict):
    firstDirectorys = db.query(models.Cms_news_class).filter_by(id=body.classFirstId).first()
    childDirectorys = db.query(models.Cms_news_class).filter_by(id=body.classChildId).first()
    add = models.Cms_news(classFirstId=body.classFirstId, classChildId=body.classChildId,
                          first_directory=firstDirectorys.directoryName,
                          child_directory=childDirectorys.directoryName, title=body.title,
                          description=body.description, keywords=body.keywords, subTitle=body.subTitle,
                          subKeywords=body.subKeywords, newsUrl=body.newsUrl, source=body.source,
                          author=body.author, time=body.time, nContent=body.nContent, pv=body.pv or 100,
                          coverImg=body.coverImg or '')
    db.add(add)
    db.commit()
    db.close()
    return {"data": add}


# 根据条件更新资讯
def edit_news(db: Session, body: dict):
    firstDirectorys = db.query(models.Cms_news_class).filter_by(id=body.classFirstId).first()
    childDirectorys = db.query(models.Cms_news_class).filter_by(id=body.classChildId).first()
    edit = db.query(models.Cms_news).filter(models.Cms_news.id == body.id).update({
        "classFirstId": body.classFirstId,
        "classChildId": body.classChildId,
        "first_directory": firstDirectorys.directoryName,
        "child_directory": childDirectorys.directoryName,
        "title": body.title,
        "description": body.description,
        "keywords": body.keywords,
        "subTitle": body.subTitle,
        "subKeywords": body.subKeywords,
        "newsUrl": body.newsUrl, "source": body.source,
        "author": body.author,
        "time": body.time,
        "nContent": body.nContent,
        "pv": body.pv,
        "coverImg": body.coverImg or ''
    })
    db.commit()
    db.close()
    return edit


# 根据条件新增新闻
def get_news_detail(db: Session, body: dict):
    return db.query(models.Cms_news).filter(body.id == models.Cms_news.id).first()


# 获取前台某条资讯详细信息
def get_news_front_detail(db: Session, body: dict):
    db_objs = db.query(models.Cms_news).filter(body.url == models.Cms_news.newsUrl).first()
    if db_objs is None: return None
    data: dict = {
        "nContent": db_objs.nContent,
        "time": db_objs.time,
        "subTitle": db_objs.subTitle,
        "source": db_objs.source,
        "first_directory": db_objs.first_directory,
        "child_directory": db_objs.child_directory,
        "keywords": db_objs.keywords,
        "description": db_objs.description,
        "id": db_objs.id,
        "classFirstId": db_objs.classFirstId,
        "classChildId": db_objs.classChildId
    }
    data["firstClassName"] = db.query(models.Cms_news_class).filter(
        data["classFirstId"] == models.Cms_news_class.id).first().subTitle

    data["childClassName"] = db.query(models.Cms_news_class).filter(
        data["classChildId"] == models.Cms_news_class.id).first().subTitle

    return {"data": data}


'''
    获取栏目资讯列表
'''


def get_class_news_list(db: Session, body: dict):
    if body.childClassName is '': return None
    if body.firstClassName is '': return None
    total = db.query(models.Cms_news).filter(body.childClassName == models.Cms_news.child_directory).count()
    db_objs = db.query(models.Cms_news).filter(body.childClassName == models.Cms_news.child_directory).order_by(
        models.Cms_news.time.desc()).limit(body.pageSize).offset(
        (int(body.pageNumber) - 1) * body.pageSize).all()

    data = [{
        "id": obj.id,
        "title": obj.title,
        "url": obj.newsUrl,
        "pv": obj.pv,
        "keywords": obj.keywords,
        "description": obj.description,
        "nContent": obj.nContent,
        "time": obj.time,
    } for obj in db_objs]

    return {"data": data, "jumpPage": {"pageNumber": body.pageNumber, "pageSize": body.pageSize, "total": total}}


'''
    获取首页所有渲染数据
'''

def get_home_list(db: Session, body: dict):
    total = db.query(models.Cms_news).filter(body.childClassName == models.Cms_news.child_directory).count()
    db_objs = db.query(models.Cms_news).filter(body.childClassName == models.Cms_news.child_directory).order_by(
        models.Cms_news.time.desc()).limit(body.pageSize).offset(
        (int(body.pageNumber) - 1) * body.pageSize).all()

    data = [{
        "id": obj.id,
        "title": obj.title,
        "url": obj.newsUrl,
        "pv": obj.pv,
        "keywords": obj.keywords,
        "description": obj.description,
        "nContent": obj.nContent,
        "time": obj.time,
    } for obj in db_objs]

    return {"data": data, "jumpPage": {"pageNumber": body.pageNumber, "pageSize": body.pageSize, "total": total}}
