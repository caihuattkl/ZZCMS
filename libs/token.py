from apis import HTTPException, status, Body,log
from typing import Optional
from datetime import datetime, timedelta
import jwt
# from jwt import PyJWTError
from config.conf import JwtConfig
from pydantic import BaseModel


# 生成token配置参数
def create_access_token_params(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JwtConfig.SECRET_KEY, algorithm=JwtConfig.ALGORITHM)
    return {"access_token": encoded_jwt, "token_type": "bearer"}


# 生成token
async def create_access_token(data: dict):
    access_token_expires = timedelta(minutes=JwtConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
    return create_access_token_params(data, expires_delta=access_token_expires)


class Tokens(BaseModel):
    token: str


# 校验token
async def token_is_true(token: Tokens):
    _tokens = token
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="token验证失败,请检查",
        headers={"Authenticate": ""},
    )
    if _tokens.token is '':
        raise credentials_exception
    try:
        user_info = jwt.decode(_tokens.token, JwtConfig.SECRET_KEY, algorithms=[JwtConfig.ALGORITHM])
        return user_info
    except Exception:
        log.info('-------------------token验证失败----------------------')
        raise credentials_exception
