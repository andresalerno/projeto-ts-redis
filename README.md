
<p>
  <img src="https://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge" alt="Badge em Desenvolvimento" />
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/static/v1?label=TYPESCRIPT&message=version: 4.4.4&color=GREEN&style=for-the-badge" alt="Typescript" />
  </a>
    <a href="https://redis.io/">
    <img src="https://img.shields.io/static/v1?label=REDIS&message=version: 7.4.1&color=GREEN&style=for-the-badge" alt="Typescript" />
  </a>
</p>




# Índice 

* [Objetivo](#objetivo)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Redis](#redis)


```ts
PROJETO-TS-REDIS-2/
├── dist/
│   ├── hashController.js
│   ├── index.js
│   ├── routes.js
├── node_modules/
├── src/
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
├── redis.conf
├── tsconfig.json

```

## Objetivo

Para a branch desse projeto chamada `main`, a ideia e usar os recursos do `redis` para conhecer as funcionalidades e seus usos para o objeto `string`.

## Tecnologias Utilizadas

- `Typescript`
- `Docker`
- `Javascript`
- `Redis` e `Redis Insight`
- `React`

## Redis

O `redis` não é suportado oficialmente pelo `windows`, logo você primeiro precisará o `wsl2`. Acesse esse [link](https://learn.microsoft.com/en-us/windows/wsl/install) para maiores informações em como proceder com essa instalação.

## Instruções para rodar esse projeto

- 1. Clonar o repositório (usar a branch main):

```powershell

git clone https://github.com/andresalerno/projeto-ts-redis.git .

```

- 2. Mudar para a branch redis-hash

```powershell

git checkout redis-hash


- 3. Instalar as dependências necessárias

```powershell

npm install

```

- 4. Transpilar para typescript

```powershell

tsc

```

- 5. Rodar o docker-compose

```powershell

docker-compose up --build

```

## Postman

Para a realização do teste com o `postman` você deve seguir os seguintes passos:

a) Método POST

<img src="./img/post.png" alt="Logo do Projeto" width="800" />

b) Método GET

<img src="./img/get.png" alt="Logo do Projeto" width="800" />

c) Método GEST (specific)

<img src="./img/get-specific.png" alt="Logo do Projeto" width="800" />

d) Método PATCH

<img src="./img/patch.png" alt="Logo do Projeto" width="800" />

e) Método DELETE

<img src="./img/delete.png" alt="Logo do Projeto" width="800" />