from config.sqlite_engine import Base
from datetime import datetime
from sqlalchemy import Table, MetaData, Column, Integer, String, Text, DateTime, Boolean

metadata = MetaData()


# 新闻分类表
class Cms_news_class(Base):
    __tablename__ = 'cms_news_class'
    _table_args__ = {"extend_existing=True": True}
    id = Column(Integer, primary_key=True, index=True)
    firstId = Column(String(120))
    url = Column(String(150))
    directoryName = Column(String(150))
    subTitle = Column(String(150))
    title = Column(String(150))
    keywords = Column(String(150))
    description = Column(String(150))
    time = Column(DateTime(datetime.now()), nullable=False, onupdate=datetime.now())


# 新闻内容表
class Cms_news(Base):
    __tablename__ = 'cms_news'
    _table_args__ = {"extend_existing=True": True}
    id = Column(Integer, primary_key=True, index=True)
    classFirstId = Column(String(120), nullable=False)
    classChildId = Column(String(150), nullable=False)
    first_directory = Column(String(150), nullable=False)
    child_directory = Column(String(150), nullable=False)
    title = Column(String(150), nullable=False)
    description = Column(String(500))
    keywords = Column(String(150))
    subTitle = Column(String(150))
    subKeywords = Column(String(150))
    newsUrl = Column(String(1000), primary_key=True, nullable=False, unique=True)
    source = Column(String(150))
    author = Column(String(150))
    nContent = Column(String(150), nullable=False)
    pv = Column(String(150), default='100')
    coverImg = Column(String(150))
    time = Column(DateTime(datetime.now()), nullable=False, onupdate=datetime.now())
