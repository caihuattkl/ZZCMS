from sqlalchemy.orm import Session
from sql_alchemys import headlines as models

'''
    设置首页头条数据
'''


def creat_home_headline(db: Session, body: dict):
    data = models.CmsHeadlines(content=body.content, description=body.description, time=body.time)
    db.add(data)
    db.commit()
    db.close()
    return {"data": data}
