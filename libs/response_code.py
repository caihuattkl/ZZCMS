from libs.error import APIException


class Response(APIException):
    code = 201
    msg = 'ok'
    errorCode = 0
    data = {}

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
