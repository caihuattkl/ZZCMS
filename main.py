# coding:utf-8
from fastapi import FastAPI
from apis.v1 import routers1
from apis.v2 import routers2
from config.conf import API_V1_STR, API_V2_STR
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware
import uvicorn as u

app = FastAPI()

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost"])
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://admin.ocns.com.cn", "http://www.ocns.com.cn", "http://localhost", "http://localhost:81",
                   "http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routers1, prefix=API_V1_STR)
app.include_router(routers2, prefix=API_V2_STR)
# # 启动服务器
if __name__ == '__main__':
    u.run(app, host="127.0.0.1", port=5000, debug=True)
