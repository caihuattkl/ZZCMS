from fastapi import FastAPI
from apis.v1 import routers
from config.conf import API_V1_STR
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware
import uvicorn as u

app = FastAPI()


app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost"])
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routers, prefix=API_V1_STR)

# # 启动服务器
if __name__ == '__main__':
    u.run(app, host="127.0.0.1", port=5000, debug=True)
