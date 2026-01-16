from sqlalchemy import Column, Integer, ForeignKey
from .base import BaseModel

class AtracaoExibicao(BaseModel):
    __tablename__ = 'atracaoexibicao'
    
    fkatracao = Column(Integer, ForeignKey('atracao.code'), primary_key=True)
    fkexibicao = Column(Integer, ForeignKey('exibicao.code'), primary_key=True)