
# gochurrasco

Esta é uma API de autenticação construída com **Node.js**, **TypeScript**, **Express** e **SQLite**. A API é usada para autenticar usuários, criar rotas, tabelas e manipular dados.
## Dependências

Aqui estão as principais dependências do projeto:

- `express`: Framework minimalista para Node.js.
- `bcrypt`: Biblioteca para hashing de senhas.
- `jsonwebtoken`: Biblioteca para criação e verificação de tokens JWT.
- `nodemon`: Utilitário que monitora mudanças no código e reinicia o servidor automaticamente.
- `sqlite3`: Driver para conectar-se ao banco de dados SQLite.
- `prisma`: ORM para gerenciar o banco de dados de forma fácil.
- `typescript`: Superconjunto de JavaScript que adiciona tipos estáticos ao código.

## Instalação

# Como baixar e rodar a API

1. Clone o repositório:
   ```bash
   git clone https://github.com/Miguelluisdev/gochurrascos.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd gochurrascos
   ```

3. Instale as dependências e baixe o banco de dados:
   ```bash
   npm install # ou yarn install
   npx prisma migrate dev
   ```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env o arquivo` na raiz do projeto e adicione suas variáveis de ambiente conforme necessário. Veja o arquivo `.env.local` para referência.
      CONFIGURE O .ENV COM ESSAS VARIÁVEIS DE AMBIENTE` E O BANCO DE DADOS SIGA O SCHEMA.PRISMA:

        DATABASE_URL="file:./dev.db"  # caminho para o banco de dados SQLite
       JWT_SECRET="seu_token_secreto"  # chave secreta para geração de tokens JWT



6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O aplicativo estará disponível em `http://localhost:8080`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests. Para grandes mudanças, por favor, abra uma issue primeiro para discutir o que você gostaria de mudar.

## Licença

Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
