from sqlalchemy.orm import Session
from sql_alchemys import reports as models
from apis import List

'''
    获取报告列表
'''


def get_report_list(db: Session, body: dict):
    total = db.query(models.CmsReport).count()
    db_objs = db.query(models.CmsReport).order_by(
        models.CmsReport.post_time.desc()).limit(body.pageSize).offset(
        (int(body.pageNumber) - 1) * body.pageSize).all()
    print(db_objs)
    data = [{
        "id": obj.id,
        "title": obj.title,
        "firstClassText": obj.first_class_text,
        "childClassText": obj.child_class_text,
        "firstClassTextZh": obj.first_class_text_zh,
        "childClassTextZh": obj.child_class_text_zh,
        "url": obj.report_url,
        "keywords": obj.keywords,
        "description": obj.description,
        "nContent": obj.report_catalog,
        "time": obj.post_time,
    } for obj in db_objs]

    return {"data": data, "jumpPage": {"pageNumber": body.pageNumber, "pageSize": body.pageSize, "total": total}}


'''
    获取报告分类
'''


def get_report_class(db: Session, body: dict):
    data = db.query(models.CmsReportClass).all()
    if data is None: return None
    return {"data": data}
