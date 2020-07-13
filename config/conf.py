TOKEN_EXPIRATION = 30 * 24 * 3600
API_V1_STR = "/v1"

# sqllite数据地址
SQLITEURI = 'sqlite:///./db/init_data.db'


# mysql数据库配置
class MysqlServerConfig:
    MYSQL_SERVER: str = 'localhost'
    MYSQL_USER: str = 'root'
    MYSQL_PASSWORD: str = ''
    MYSQL_DB: str = "zzcms"
    SQLALCHEMY_DATABASE_URI: str = "mysql+pymysql://root:@localhost:3306/zzcms?charset=utf8"


# jwtconf
class JwtConfig:
    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60
    SALT = '16fcf4a75-5180-4916-83c1-5ff794616eaa92'
