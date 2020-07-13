from sqlalchemy.orm import Session
from sql_alchemys import sqlites as models


def get_news_class(db: Session, className: str, limit: int = 100):
    if className is '':
        return db.query(models.Cms_news_class).all()
    else:
        big_class = db.query(models.Cms_news_class).filter(models.Cms_news_class.directoryName == className).limit(limit).all()
        if big_class:
            small_class = db.query(models.Cms_news_class).filter(models.Cms_news_class.firstId == big_class[0].id).limit(limit).all()
            return big_class + small_class
        return None


def get_channel_news(db: Session, className: str, limit: int = 10):
    if className is '':
        return None
    else:
        data_id = db.query(models.Cms_news_class).filter(models.Cms_news_class.title == className).one().id
        if data_id:
            channel_news_data = db.query(models.Cms_news).filter(models.Cms_news.classFirstId == data_id).limit(limit).all()
            return channel_news_data
        return None

def get_channel(db: Session,limit: int = 100):
        return db.query(models.Cms_news_class).filter(models.Cms_news_class.firstId == '0').all()


'''
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item'''
