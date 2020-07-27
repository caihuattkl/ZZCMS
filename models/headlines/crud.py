from sqlalchemy.orm import Session
from sql_alchemys import headlines as models
from sqlalchemy import insert

'''
    设置首页头条数据
'''


def creat_home_headline(db: Session, body: dict):
    is_id = db.query(models.CmsHeadlines).filter_by(id=body.id).first()
    if not is_id:
        print("添加-------------------------")
        data1 = models.CmsHeadlines(content=body.content, description=body.description, time=body.time)
        db.add(data1)
        db.commit()
        db.close()
        return {"data": data1}
    else:
        print("更新-------------------------")
        data = db.query(models.CmsHeadlines).filter_by(id=body.id).update({
            "content": body.content,
            "description": body.description,
            "time": body.time
        })
        db.commit()
        db.close()
        return {"data": data}


def get_home_headline(db: Session, body: dict):
    data = db.query(models.CmsHeadlines).all()
    return {"data": data}
