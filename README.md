# Projeto de Importação e Cálculo de Intenções de Voto

Este projeto tem como objetivo importar dados de pesquisas eleitorais, processá-los e calcular as intenções de voto dos candidatos, considerando fatores como porte dos municípios e estados. A aplicação é dividida em backend, desenvolvido com **NestJS**, e frontend, desenvolvido com **Next.js**. O projeto utiliza o **Prisma ORM** para interagir com o banco de dados **PostgreSQL**.

---

## 🛠 Tecnologias Utilizadas

### **Backend**

- [NestJS](https://nestjs.com/) - Framework para construção de servidores Node.js eficientes e escaláveis.
- [TypeScript](https://www.typescriptlang.org/) - Superconjunto tipado de JavaScript que compila para JavaScript puro.
- [Prisma ORM](https://www.prisma.io/) - ORM para gerenciamento do banco de dados.
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional.
- [Docker](https://www.docker.com/) - Contêineres para facilitar a configuração e execução do banco de dados.
- [CSV Parser](https://csv.js.org/parse/) - Biblioteca para análise de arquivos CSV.

### **Frontend**

- [Next.js](https://nextjs.org/) - Framework React para produção.
- [React](https://react.dev/) - Biblioteca JavaScript para construção de interfaces de usuário.
- [TypeScript](https://www.typescriptlang.org/)
- [ApexCharts](https://apexcharts.com/) - Biblioteca de gráficos.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário.
- [Axios](https://axios-http.com/) - Cliente HTTP para requisições.

---

## 📦 Estrutura do Projeto

### **Backend**



```

/backend
├── src
│   ├── main.ts
│   ├── app.module.ts
│   ├── modules
│   │   ├── import
│   │   │   ├── import.module.ts
│   │   │   ├── import.service.ts
│   │   │   └── import.controller.ts
│   │   ├── calculation
│   │   │   ├── calculation.module.ts
│   │   │   ├── calculation.service.ts
│   │   │   └── calculation.controller.ts
│   │   └── ...
│   ├── providers
│   │   └── prisma
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   └── ...
├── prisma
│   └── schema.prisma
├── package.json
└── tsconfig.json`

```
### **Frontend**

```

frontend
├── Dockerfile
├── README.md
├── app
│   ├── api
│   ├── dashboard
│   │   ├── main
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── theme-provider.tsx
├── components
│   ├── card
│   │   └── CardMenu.tsx
│   ├── charts
│   │   └── VotingIntentionChart
│   │       └── index.tsx
│   ├── dashboard
│   │   └── main
│   │       ├── cards
│   │       │   ├── MainChart.tsx
│   │       │   └── MainDashboardTable.tsx
│   │       └── index.tsx
│   ├── layout
│   │   ├── index.tsx
│   │   └── innerContent.tsx
│   ├── link
│   │   └── NavLink.tsx
│   ├── navbar
│   │   ├── NavbarAdmin.tsx
│   │   └── NavbarLinksAdmin.tsx
│   ├── routes.tsx
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dropdown-menu.tsx
│       └── table.tsx
├── lib
│   └── utils.ts
├── package.json
├── styles
│   ├── chrome-bug.css
│   ├── globals.css
│   └── output.css
├── tailwind.config.ts
├── tsconfig.json
├── utils
│   ├── cn.ts
│   └── navigation.tsx
└── variables
    └── charts.ts

```

## 🚀 Configuração e Execução do Projeto

### **Pré-requisitos**

- [Node.js](https://nodejs.org/) instalado.
- [Docker](https://www.docker.com/) instalado (para o banco de dados).

### **Passo a Passo**

### **1. Clonar o Repositório**

```

git clone https://github.com/ViktorHugodev/voting-intention
cd backend

```

### **2. Configurar o Banco de Dados com Docker**

Utilize o Docker para configurar o banco de dados PostgreSQL.

# No diretório raiz do projeto

```

docker-compose up -d`

```

O arquivo `docker-compose.yaml` está configurado para criar os serviços:

- **db**: Banco de dados PostgreSQL.
- **backend**: Servidor NestJS.
- **frontend**: Aplicação Next.js.


### **3. Configurar as Variáveis de Ambiente**

## Crie um arquivo `.env` no diretório `/backend` com o seguinte conteúdo:



# backend/.env
```

DATABASE_URL=postgresql://postgres:postgres@db:5432/suabase?schema=public`

```

Crie um arquivo `.env.local` no diretório `/frontend` com o seguinte conteúdo:




# frontend/.env.local
```

NEXT_PUBLIC_API_URL=http://localhost:3333`

```
### **4. Instalar as Dependências**

### **Backend**



```

cd backend
npm install

```
### **Frontend**
```

cd frontend
npm install

```
### **5. Executar as Migrações do Prisma**

No diretório `/backend`, execute:


```

npx prisma migrate dev --name init

```
Este comando criará as tabelas no banco de dados conforme definido no `schema.prisma`.

### **6. Iniciar os Servidores**

### **Backend**

No diretório `/backend`:

```

npm run start:dev

```
### **Frontend**

No diretório `/frontend`:

bash

Copiar

`npm run dev`

### **7. Acessar a Aplicação**

- **Frontend**: [http://localhost:3000](http://localhost:3000/)
- **Backend API**: [http://localhost:3333](http://localhost:3333/)

---

## 📋 Documentação do Backend


### Atualizar a Base de Estados e Municípios
POST 
Content-Type: application/json
- **URL**: `/sync/update-base`
- **Método**: `POST`
- **Descrição**: Atualiza a base de dados dos municípios e estados.

### **Importação de Arquivos CSV**

A aplicação permite a importação de arquivos CSV contendo dados de pesquisas eleitorais.

### **Endpoint de Importação** 

- **api.http**: `possui todos os endpoints`

- **URL**: `/import/csv`
- **Método**: `POST`
- **Descrição**: Importa um arquivo CSV e armazena os dados no banco de dados.


### **Serviço de Importação**

O serviço lê o arquivo CSV, processa os dados e armazena no banco de dados utilizando o Prisma.


### **Cálculo de Intenções de Voto**

Após a importação, a aplicação pode calcular as intenções de voto considerando o porte dos municípios e os estados.

### **Endpoint de Cálculo**

- **URL**: `/voting-intention/evolution`
- **Método**: `GET`
- **Descrição**: Calcula as intenções de voto para cada candidato.


## 📊 Documentação do Frontend

O frontend utiliza Next.js para renderizar páginas e componentes.

### **Visualização de Gráficos**

Os dados calculados são exibidos em gráficos interativos utilizando ApexCharts.


## 🗄 Configuração do Prisma

O Prisma é utilizado como ORM para interagir com o banco de dados PostgreSQL.

### **Schema do Prisma**

```


datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Survey {
  id           Int          @id @default(autoincrement())
  surveyId     String
  date         DateTime
  municipality Municipality @relation(fields: [municipalityId], references: [id])
  municipalityId Int
  votes        Vote[]
}

model Municipality {
  id       Int      @id @default(autoincrement())
  name     String
  state    State    @relation(fields: [stateId], references: [id])
  stateId  Int
  population Int
}

model State {
  id   Int    @id @default(autoincrement())
  name String
}

model Vote {
  id          Int      @id @default(autoincrement())
  candidateId Int
  surveyId    Int
  candidate   Candidate @relation(fields: [candidateId], references: [id])
  survey      Survey    @relation(fields: [surveyId], references: [id])
}

model Candidate {
  id   Int    @id @default(autoincrement())
  name String
}

```

### **Instalação do Prisma Client**

Após configurar o schema, execute:


```

npx prisma generate`

```

## 🐳 Docker Compose

O arquivo `docker-compose.yaml` configura os serviços necessários:

```

`version: '3.8'

services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: seu_banco
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/seu_banco
    ports:
      - '3333:3333'
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run start:dev

  frontend:
    build: ./frontend
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: 'http://localhost:3333'
    ports:
      - '3000:3000'
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev

volumes:
  postgres_data:`

```

## 📖 Passos para Importar os Dados e Calcular as Intenções de Voto

1. **Importar os Arquivos CSV**: Utilize o endpoint `/import/csv` para enviar os arquivos CSV de pesquisas eleitorais.
2. **Verificar os Dados no Banco**: Certifique-se de que os dados foram armazenados corretamente no banco de dados.
3. **Calcular as Intenções de Voto**: Acesse o endpoint `/voting-intention/evolution` para obter os cálculos atualizados.
4. **Visualizar no Frontend**: Acesse a aplicação frontend e visualize os gráficos gerados com base nos dados importados.


## 📄 Licença

Este projeto está sob a licença MIT.

---

## 📞 Contato

- **Nome:** Victor Hugo
- **Email:** [viktorhugo.dev@gmail.com](mailto:viktorhugo.dev@gmail.com)

---

## 📚 Recursos Adicionais

- **NestJS Documentation:** https://docs.nestjs.com/
- **Prisma Documentation:** https://www.prisma.io/docs/
- **Next.js Documentation:** https://nextjs.org/docs
- **ApexCharts Documentation:** https://apexcharts.com/docs/react-charts/
- **CSV Parser Documentation:** https://csv.js.org/parse/
