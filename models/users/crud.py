from sqlalchemy.orm import Session
# from models.users.schemas import UserInDB
from sql_alchemys import users as models
from fastapi.logger import logger


# 用户登录
def login(db: Session, users: dict, limit: int = 100):
    pass


# 从数据库中读取用户名
def get_user(db, name: str, password: str):
    names = db.query(models.Cms_users).filter_by(name = name).first()
    if not names:
        logger.error("用户名不正确")
        return None
    if names.password != password:
        logger.error("密码不正确")
        return None
    return names
