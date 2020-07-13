from werkzeug.exceptions import HTTPException

from libs.error import APIException

__author__ = '七月'


class Success(APIException):
    code = 201
    msg = 'ok'
    errorCode = 0


class Error(Success):
    code = 202
    errorCode = 0


class ServerError(APIException):
    code = 500
    msg = 'sorry, we made a mistake (*￣︶￣)!'
    errorCode = 999


class ClientTypeError(APIException):
    # 400 401 403 404
    # 500
    # 200 201 204
    # 301 302
    code = 400
    msg = 'client is invalid'
    errorCode = 1006


class ParameterException(APIException):
    code = 400
    msg = 'invalid parameter'
    errorCode = 1000


class NotFound(APIException):
    code = 404
    msg = 'the resource are not found O__O...'
    errorCode = 1001


class AuthFailed(APIException):
    code = 401
    errorCode = 1005
    msg = 'authorization failed'


class Forbidden(APIException):
    code = 403
    errorCode = 1004
    msg = 'forbidden, not in scope'


class DuplicateGift(APIException):
    code = 400
    errorCode = 2001
    msg = 'the current book has already in gift'
