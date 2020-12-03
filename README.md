# Spira - server

Repositório para a aplicação do [Spira](https://spira.ime.usp.br/), um novo método de triagem baseado em áudio e inteligência artificial.

## Setup

O servidor utiliza [Node.js](https://nodejs.org/en/), um runtime de JavaScript. Já o banco de dados, utiliza [MongoDB](https://www.mongodb.com/what-is-mongodb).

Como também, o projeto utiliza Docker e Docker Compose. Caso nunca tenha utilizado Docker, acesse: [get-docker](https://docs.docker.com/get-docker/).

## Executando

Recomendamos que utilize Docker para desenvolver o projeto.

### Com Docker

Para executar o servidor:

1. Clone o repositório.

```sh
$ git clone https://github.com/spirabr/backend
```

2. Execute:

```sh
$ docker-compose build
```

3. Execute:

```sh
$ docker-compose up
```

Com isso, estão inicializados tanto o banco de dados quanto o servidor (em localhost na porta 3000).

### Sem Docker

Para subir o servidor sem utilizar Docker:

1. Clone o repositório.

```sh
$ git clone https://github.com/spirabr/backend
```

2. É necessário setar as variáveis de ambiente do MongoDB e do Node.Js

   - MONGO_INITDB_DATABASE (MongoDB)
   - MONGO_URL (Node.js)
   - MONGO_DATABASE_NAME (Node.js)

3. Inicie uma instância do MongoDB na porta 27017.

4. Suba o servidor com o comando:

```sh
$ npm run dev
```

O servidor está escutando conexões pela porta 3000 e o MongoDB está escutando conexões pela porta 27017.

## API

| Método | Rota          | Descrição                                                               |
| ------ | ------------- | ----------------------------------------------------------------------- |
| GET    | `/`           | Retorna todas as coletas de todos os pacientes.                         |
| POST   | `/`           | Cria uma nova coleta.                                                   |
| GET    | `/:patientId` | Retorna uma coleta do paciente com ID igual a `patientId`.              |
| PATCH  | `/:patientId` | Atualiza dados sobre uma coleta do paciente com ID igual a `patientId`. |
| DELETE | `/:patientId` | Deleta uma coleta do paciente com ID igual a `patientId`.               |

### Exemplos

1. Atualizando informações de uma coleta do paciente com ID 9124192448

```sh
$ curl -X PATCH -H "Content-Type: application/json" -d '{"collector":{ "hospital":"Hospital das Clínicas"}}' http://localhost:3000/9124192448
```

2. Criar uma nova coleta para o paciente com ID 12334

```sh
$ curl -X POST -H "Content-Type: application/json" -d '{"patientId":"12334","collector":{"name":"SPIRA test","hospital":"Test"}}' http://localhost:3000/
```

### Estrutura exemplo de uma Coleta no banco (em JSON)

```json
{
  "patientId": "123456789",
  "collector": {
    "name": "Vinicius Pereira",
    "hospital": "Albert Einstein"
  },
  "audioUrl1": "http://banco-de-audios.com/audios/1",
  "audioUrl2": "http://banco-de-audios.com/audios/2",
  "audioUrl3": "http://banco-de-audios.com/audios/3",
  "audioUrl4": "http://banco-de-audios.com/audios/4"
}
```

## Executando testes

Tenha certeza que o MongoDB está rodando em sua máquina, e execute o comando:

```sh
$ npm run test
```
