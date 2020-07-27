from sqlalchemy import create_engine, Column, Integer, String, DateTime,insert
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from sqlalchemy.sql import func

# engine = create_engine('mysql+pymysql://root:@localhost:3306/zzcms')
engine = create_engine('sqlite:///./init_data.db')
DBsession = sessionmaker(bind=engine)
db_session = DBsession()

Base = declarative_base()


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
    newsUrl = Column(String(1000), nullable=False, unique=True)
    source = Column(String(150))
    author = Column(String(150))
    nContent = Column(String(150), nullable=False)
    pv = Column(String(150), default='100')
    coverImg = Column(String(150))
    time = Column(DateTime(datetime.now()), nullable=False, onupdate=datetime.now())


# 报告内容
class CmsReport(Base):
    __tablename__ = 'cms_reports'
    _table_args__ = {"extend_existing=True": True}
    id = Column(Integer, primary_key=True, index=True)
    first_class = Column(String(120), nullable=False)
    child_class = Column(String(150), nullable=False)
    first_class_text = Column(String(120), nullable=False)
    child_class_text = Column(String(150), nullable=False)
    first_class_text_zh = Column(String(120), nullable=False)
    child_class_text_zh = Column(String(150), nullable=False)
    report_type = Column(String(150), nullable=False)
    research_field = Column(String(150), nullable=False)
    latest_revision = Column(DateTime(datetime.now()), nullable=False, onupdate=datetime.now())
    report_format = Column(String(500))
    delivery_mode = Column(String(150))
    pdf_price = Column(String(150))
    entity_price = Column(String(150))
    double_version = Column(String(120))
    related_report = Column(String(150))
    core_keywords = Column(String(150))
    cover_img = Column(String(150), nullable=False)
    title = Column(String(150), default='100')
    description = Column(String(150))
    keywords = Column(String(150))
    subTitle = Column(String(150))
    subKeywords = Column(String(150))
    report_url = Column(String(150))
    report_author = Column(String(150))
    post_time = Column(DateTime(datetime.now()), nullable=False, onupdate=datetime.now())
    report_summary = Column(String(2000))
    report_catalog = Column(String(1500))
# 新闻分类表
class CmsHeadlines(Base):
    __tablename__ = 'cms_headlines'
    _table_args__ = {"extend_existing=True": True}
    id = Column(Integer, primary_key=True, index=True,autoincrement = True)
    content = Column(String(1500))
    description = Column(String(150))
    time = Column(DateTime(datetime.now()), nullable=False, onupdate=datetime.now())


class CmsReportClass(Base):
    __tablename__ = 'cms_report_class'
    _table_args__ = {"extend_existing=True": True}
    id = Column(Integer, primary_key=True, index=True)
    first_class = Column(String(120))
    sub_title = Column(String(150))
    reports_directory = Column(String(150))
    title = Column(String(150))
    keywords = Column(String(150))
    description = Column(String(150))
    post_time = Column(DateTime(datetime.now()), nullable=False, onupdate=datetime.now())


data = db_session.query(CmsHeadlines).filter_by(id=1).first()

print(data,'----------------------------')
