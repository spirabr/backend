# Spira - server

Repositório para a aplicação do [Spira](https://spira.ime.usp.br/), um novo método de triagem baseado em áudio e inteligência artificial.

## Setup 

O projeto utiliza Docker e Docker Compose. Caso nunca tenha utilizado Docker, acesse: [get-docker](https://docs.docker.com/get-docker/).

## Executando

Para executar o servidor:

1. Clone o repositório. 

```sh
$ git clone https://github.com/spirabr/backend
```

2. Execute:

```sh
docker-compose build
```

3. Execute:
```sh
docker-compose up
```

Com isso, estão inicializados tanto o banco de dados quanto o servidor (em localhost na porta 3000).