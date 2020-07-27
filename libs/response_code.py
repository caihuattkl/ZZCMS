from libs.error import APIException
from apis import JSONResponse, jsonable_encoder, List


class JSONResponses(APIException):
    code = 201
    msg = 'ok'
    error_code = 0
    data = {}
    pages: dict = {
        "pageSize": 10,
        "pageNumber": 1,
        "total": 0
    }

    def __init__(self, data=None, msg=None, code=None, error_code=None):
        self.error_code = error_code or 0
        if code:
            self.code = code
        if msg:
            self.msg = msg
        if data:
            self.data = data

    def error(msg: str = None, code=None, error_code=None):
        error_code = error_code or 0
        msg = msg or '参数不正确,请检查'
        code = code or 4000
        return {"error_code": error_code, "msg": msg, "code": code}

    def success(data: List[str], jump_page: dict = pages, msg: str = None,
                code=None, error_code=None):
        error_code = error_code or 0
        msg = msg or '成功!'
        code = code or 200
        return JSONResponse(
            content={"data": jsonable_encoder(data), "error_code": error_code, "msg": msg, "code": code, **jump_page},
            status_code=200)
