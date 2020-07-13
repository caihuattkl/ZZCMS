from apis import router, Depends, Session, log
from typing import Optional
import types
from models.users import crud
from sql_alchemys import users
from libs.response_code import Response
from config.sqlite_engine import engine, get_db
from libs.token import create_access_token, token_is_true
from models.users import schemas

users.Base.metadata.create_all(bind=engine)


# 将类转换为字典
def to_dict(dumyself):
    result = {}
    for a in dir(dumyself):
        # filter inner field by fieldname
        if a.startswith('_') or a == 'metadata':
            continue
        v = getattr(dumyself, a)
        # filter inner field by value type
        if callable(v):
            continue
        result[a] = getattr(dumyself, a)
    return result


# 用户登录
@router.post("/login", response_model=[])
async def login(form_data: schemas.User, db: Session = Depends(get_db)):
    # 校验不能为空
    if form_data.name is '': return Response.error("用户名不能为空!")
    if form_data.password is '': return Response.error("登录密码不能为空!")
    # 连接数据库查询用户信息
    item = crud.get_user(db, form_data.name, form_data.password)
    if item is None: return Response.error("账号或密码不正确!")
    userInfo = to_dict(item)
    # 成功后,返回token信息
    access_token = await create_access_token(userInfo)
    userInfo["token"] = access_token
    del userInfo["password"]
    return Response(userInfo, "登陆成功!", 200, 0)


# 查询用户信息
@router.post("/query_user", response_model=[])
async def get_user(body: schemas.LoginUser = Depends(token_is_true)):
    return Response(body, "获取用户信息成功!", 200, 0)
