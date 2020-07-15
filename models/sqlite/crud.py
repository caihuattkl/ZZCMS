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
        return None
    else:
        data_id = db.query(models.Cms_news_class).filter(models.Cms_news_class.title == className).one().id
        if data_id:
            channel_news_data = db.query(models.Cms_news).filter(models.Cms_news.classFirstId == data_id).limit(
                limit).all()
            return channel_news_data
        return None


# 获取频道数据
def get_channel(db: Session, limit: int = 100):
    return db.query(models.Cms_news_class).filter(models.Cms_news_class.firstId == '0').all()


# 根据条件获取新闻
def get_news(db: Session, body: dict):
    if body.bigClass == '' and body.smallClass == '' or None:
        return db.query(models.Cms_news).limit(body.pageSize).offset(body.pageNumber * body.pageSize).all()
    if body.smallClass == '':
        return db.query(models.Cms_news).filter_by(classFirstId=body.bigClass).limit(body.pageSize).offset(
            body.pageNumber * body.pageSize).all()
    total = db.query(models.Cms_news).count()
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
    return {"data": data, "pageNumber": body.pageNumber, "pageSize": body.pageSize, "total": total}


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
    return add


# first_directory
# child_directory
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
