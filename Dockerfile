#基于的基础镜像
FROM python:3.7.2

#代码添加到code文件夹
ADD ./zzcms-python /code

# 设置code文件夹是工作目录
WORKDIR /code

# 安装项目所需依赖
RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app --host 0.0.0.0 --port 80"]