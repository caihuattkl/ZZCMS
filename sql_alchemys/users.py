from config.sqlite_engine import Base
from datetime import datetime
from sqlalchemy import Table, MetaData, Column, Integer, String, Text, DateTime, Boolean

class Cms_users(Base):
    __tablename__ = 'cms_users'
    _table_args__ = {"extend_existing=True": True}
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(25), unique=True, index=True)
    password = Column(String(25), nullable=False)
    mobile = Column(String(25), unique=True, index=True)
    tel = Column(String(25), nullable=True)
    nick_name = Column(String(25), nullable=False)
    email = Column(String(25), unique=True, nullable=False, index=True)
    role_type = Column(String(25), nullable=False)
    login_time = Column(String(25), nullable=False, index=True)
    register_time = Column(String(25), nullable=False, onupdate=datetime.now())
    online = Column(Integer, nullable=False, default=0)
