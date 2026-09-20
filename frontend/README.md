# FileManager — Frontend

Frontend em Angular 14 para um gerenciador de arquivos full-stack. Conversa com o backend em Express + SQLite em `http://localhost:3000`.

## Requisitos

- Node 16 (obrigatório para o Angular 14)
- Node Package Manager (npm)
- Backend rodando em `http://localhost:3000`

## Teste local

```bash
npm install
npm start
```

Após rodar os comandos, o servidor estará disponível em http://localhost:4200.

## Funcionalidades

- Listagem (/files) — lista com todos os arquivos enviados, com tipo, nome, descrição, data de upload e número de comentários. Filtro por tipo e ordenação por data de upload ou número de comentários, ambos rodando no cliente frontend.

- Upload (/upload) — novo arquivo com nome (obrigatório), descricao (opcional) e o próprio arquivo. O tipo é detectado no servidor.

- Detalhes (/files/:id) — metadados do arquivo, download e comentários. Os detalhes de um arquivo podem ser acessados ao clicar na respectiva linha na lista de arquivos.

- Na página de Detalhes, é possível realizar exclusão e adição de comentários ao arquivo, bem como editar ou excluir o próprio arquivo. A exclusão de um arquivo também deleta os comentários relacionados.