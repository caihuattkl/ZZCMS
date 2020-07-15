from fastapi import APIRouter, Depends, FastAPI, HTTPException, status, Request, Response, Security, Form, Body,Header
from libs.token import create_access_token, token_is_true
from fastapi.logger import logger
from fastapi.routing import APIRoute
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import List
import time
from typing import Callable


class TimedRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            before = time.time()
            response: Response = await original_route_handler(request)
            duration = time.time() - before
            response.headers["X-Response-Time"] = str(duration)
            print(f"route duration: {duration}")
            print(f"route response: {response}")
            print(f"route response headers: {response.headers}")
            return response
        return custom_route_handler


# route_class=TimedRoute
router = APIRouter(route_class=TimedRoute)
