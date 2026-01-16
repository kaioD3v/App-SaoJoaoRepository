from models import create_tables, Atracao, AtracaoExibicao, AtracaoTags, Equipe, Evento, Exibicao, Locais, LocaisTags, Pessoa, Polo, Tag, Usuario
from flask import Flask, request, url_for, jsonify
from config.database import getdb 
from datetime import date, time, datetime


app = Flask(__name__)
app.secret_key = 'xavesecreta'

def serialize_datetime(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    elif isinstance(obj, time):
        return obj.strftime("%H:%M:%S")
    return obj

def serialize_item(item):
    """Converte dict ou objeto para JSON serializável"""
    if isinstance(item, (int, float, str, bool)) or item is None:
        return item

    if isinstance(item, dict):
        d = item.copy()
    elif hasattr(item, 'to_dict_with_rel'):
        d = item.to_dict_with_rel()
    elif hasattr(item, 'to_dict'):
        d = item.to_dict()
    else:
        return item  # fallback se não for serializável

    for key, val in d.items():
        if isinstance(val, list):
            d[key] = [serialize_item(v) for v in val]
        else:
            d[key] = serialize_datetime(val)
    return d

@app.route("/")
def index():
    return "API Connection Successful."


@app.route('/inicio')
def inicio():
    polos = Polo.getall_with_rel()
    eventos = Evento.getall_dict()


    data ={"polos": [serialize_item(p) for p in polos],
          "eventos": [serialize_item(e) for e in eventos]
    }

    return jsonify(data)

@app.route('/cronograma')
def cronograma():
    atracoes = Atracao.getall_with_rel()
    exibicoes = Exibicao.getall_with_rel()
    polos = Polo.getall_with_rel()

    data = {
        "atracoes": [serialize_item(a) for a in atracoes],
        "exibicoes": [serialize_item(e) for e in exibicoes],
        "polos": [serialize_item(p) for p in polos]
    }

    return jsonify(data)

@app.route('/atracao')
def atracao():
    atracoes = Atracao.getall_with_rel()
    return jsonify([serialize_item(a) for a in atracoes])

@app.route('/equipe')
def equipe():
    equipes = Equipe.getall_dict()
    return jsonify([serialize_item(e) for e in equipes])

@app.route('/eventos')
def evento():
    eventos = Evento.getall_dict()
    return jsonify([serialize_item(e) for e in eventos])

@app.route('/exibicao')
def exibicao():
    exibicoes = Exibicao.getall_with_rel()
    return jsonify([serialize_item(e) for e in exibicoes])

@app.route('/locais')
def locais():
    locais = Locais.getall_with_rel()
    return jsonify([serialize_item(l) for l in locais])

@app.route('/polo')
def polo():
    polos = Polo.getall_dict()
    return jsonify([serialize_item(p) for p in polos])

@app.route('/pessoa')
def pessoa():
    pessoas = Pessoa.getall()
    return jsonify([serialize_item(p) for p in pessoas])

@app.route('/tag')
def tag():
    tags = Tag.getall_dict()
    return jsonify([serialize_item(t) for t in tags])

@app.route('/usuario')
def usuario():
    usuarios = Usuario.getall()
    return jsonify([serialize_item(u) for u in usuarios])

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)