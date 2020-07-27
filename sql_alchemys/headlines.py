from config.sqlite_engine import Base
from datetime import datetime
from sqlalchemy import Table, MetaData, Column, Integer, String, Text, DateTime, Boolean

metadata = MetaData()


# 新闻分类表
class CmsHeadlines(Base):
    __tablename__ = 'cms_headlines'
    _table_args__ = {"extend_existing=True": True}
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(1500))
    description = Column(String(150))
    time = Column(DateTime(datetime.now()), nullable=False, onupdate=datetime.now())