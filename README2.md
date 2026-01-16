    Passo a passo para execução do aplicativo
    Instalação dos pré-requisitos

Realize o download e a instalação dos seguintes softwares:

Python

Node.js

npm (instalado automaticamente junto ao Node.js)

MySQL

Após a instalação do Node.js, verifique se ele foi corretamente adicionado às variáveis de ambiente do sistema, especificamente em ambos os campos do PATH.

    Instalação das dependências do projeto
    Frontend e Backend

Baixe os requirements do Frontend e do Backend.

Observação: na maioria dos casos, todas as dependências do frontend já são instaladas automaticamente ao executar o npm install. Caso alguma biblioteca não seja instalada, instale-a manualmente.

Abra o Prompt de Comando (CMD) na pasta do projeto e execute:

npm install

    Importação do banco de dados no MySQL

Abra o MySQL Workbench

Conecte-se ao Local Instance

No canto inferior esquerdo, ao lado de Schemas, clique em Administration

Selecione Data Import

Marque a opção Import from Self-Contained File

Selecione o arquivo do banco de dados localizado na pasta do aplicativo

Execute a importação

Depois no seu VS Code crie um arquivo fora de todas as pastas (apenas dentro da pasta main) chamado .env e copie e adicione as informacoes...

DB_USER = "root" ---> PADRAO, NAO ALTERAR
DB_PASS = "senha" ---> ALTERAR PARA SUA SENHA NO MySQL
DB_HOST = "localhost" ---> PADRAO, NAO ALTERAR
DB_PORT = "3306" ---> PADRAO, NAO ALTERAR
DB_NAME = "tccnovo" ---> PADRAO, NAO ALTERAR

DEBUG=True

    Execução do Backend

Acesse a pasta backend

Execute o arquivo app.py

python app.py


Após iniciar o servidor:

Teste os endpoints diretamente no navegador

Exemplo:

http://121.398.5.0000/cronograma


Caso os dados sejam exibidos corretamente, o backend está funcionando conforme esperado

    Configuração dos endpoints no Frontend

No terminal onde o app.py foi executado, copie o segundo endereço IP exibido

Substitua esse IP em todos os fetchs localizados nos seguintes arquivos:

📁 src/app

comidas.tsx

cronograma.tsx

equipe.tsx

index.tsx

mapa.tsx

polos.tsx

📁 components

Buttons/PolosHomeBotao.tsx

locais/Turismo.tsx

    Execução do Frontend

Abra novamente o Prompt de Comando (CMD)

Execute o comando:

npx expo start

    Execução no dispositivo móvel

Instale o aplicativo Expo Go em seu celular

Utilize a câmera do aparelho para escanear o QR Code exibido no terminal

O aplicativo será aberto automaticamente no dispositivo

    Finalização

Após seguir todos os passos acima, o aplicativo estará pronto para uso.
Agora basta realizar os testes de navegação e funcionalidades.