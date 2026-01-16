from sqlalchemy import Column, Integer, ForeignKey
from .base import BaseModel

class AtracaoTags(BaseModel):
    __tablename__ = 'atracaotags'
    
    fkatracao = Column(Integer, ForeignKey('atracao.code'), primary_key=True)
    fktag = Column(Integer, ForeignKey('tag.code'), primary_key=True)