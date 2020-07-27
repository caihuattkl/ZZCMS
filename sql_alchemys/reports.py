from config.sqlite_engine import Base
from datetime import datetime
from sqlalchemy import Table, MetaData, Column, Integer, String, Text, DateTime, Boolean

metadata = MetaData()


# # 报告分类表
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
