from typing import List, Optional
from pydantic import BaseModel



class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None


class LoginUser(dict):
    name: str
    password: str


# class Token(BaseModel):
#     token: str

# class Token(dict):
#     access_token: str
#     token_type: str


class User(BaseModel):
    # full_name: Optional[str] = None
    # disabled: Optional[bool] = None
    id: int = None
    name: str
    password: str
    mobile: str = None
    tel: str = None
    role_type: int = None
    login_time: Optional[str] = None
    register_time: Optional[str] = None


# class UserInDB(User):
#     hashed_password: str
