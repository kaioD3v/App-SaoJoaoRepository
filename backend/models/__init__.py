from .base import Base, BaseModel
from .atracaoexibicao import AtracaoExibicao
from .atracao import Atracao
from .atracaotags import AtracaoTags
from .equipe import Equipe
from .evento import Evento
from .exibicao import Exibicao
from .locais import Locais
from .locaistags import LocaisTags
from .pessoa import Pessoa
from .polo import Polo
from .tag import Tag
from .usuario import Usuario 

def create_tables():
    from config.database import engine
    Base.metadata.create_all(bind=engine)

__all__ = [
    'Base', 'BaseModel', 'AtracaoExibicao', 'Atracao', 'AtracaoTags', 'Equipe', 'Evento', 'Exibicao', 'Locais', 'LocaisTags', 'Pessoa', 'Polo', 'Tag', 'Usuario'
]