from sqlalchemy import create_engine
from config.conf import MysqlServerConfig
from sqlalchemy.orm import sessionmaker

# 初始化数据库连接
engine = create_engine(MysqlServerConfig.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True, echo=True, max_overflow=5)
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()
