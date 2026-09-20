# Backend

API REST para um gerenciador de arquivos web. Armazena os metadados dos arquivos em SQLite e os bytes dos arquivos em disco.

## Stacks

- Node 20, Express 5, TypeScript (ESM)

- SQLite via better-sqlite3 + Drizzle ORM

- multer para uploads (memory storage, limite de 10 MB)

- file-type para detecção de MIME no servidor

- zod para validação de requisições

# Deploy local

```bash
nvm use 20
npm install
npx drizzle-kit push
npm run seed
npm run dev
```


O servidor sobe em http://localhost:3000.

- drizzle-kit push cria o schema SQLite em data/filemanager.db.

- npm run seed limpa o banco e copia os arquivos de exemplo de seed-files/ para uploads/, então a aplicação já inicia com alguns arquivos para download.

- Arquivos enviados ficam em uploads/. Apenas os metadados ficam no SQLite.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | health check |
| GET | `/arquivos` | lista todos os arquivos |
| POST | `/arquivos` | envia um arquivo (multipart, campo `arquivo`; campos `nome` e `descricao` opcional) |
| GET | `/arquivos/:id` | busca um arquivo |
| PATCH | `/arquivos/:id` | atualiza `nome` e/ou `descricao` |
| DELETE | `/arquivos/:id` | remove um arquivo (remove também os comentários) |
| GET | `/arquivos/:id/download` | baixa os bytes do arquivo |
| GET | `/arquivos/:id/comentarios` | lista os comentários de um arquivo |
| POST | `/arquivos/:id/comentarios` | adiciona um comentário (`autor`, `texto`) |
| DELETE | `/comentarios/:id` | remove um comentário |


## Observações sobre deploy

Os planos gratuitos do Render usam um sistema de arquivos sem persistência real de dados. Tanto data/filemanager.db quanto uploads/ são perdidos em cada redeploy ou reinício. Na inicialização, o script seed restaura o estado inicial, portanto arquivos enviados não persistem entre sessões. Essa é uma limitação do plano gratuito, não da aplicação.