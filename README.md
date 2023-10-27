# Hackerman

Este é um projeto que simula um ataque de SQL Injection

## Instalação

1. Clone o repository: `git clone https://github.com/LouisFaker/hackerman.git`
2. Navegue para o diretório do projeto: `cd hackerman`
3. Instale as dependências: `npm install`
4. Crie o arquivo `.env` e insira a variável de ambiente `SECRET=quaquer_coisa`
5. Recomendado: Iniciar um banco de dados MySQL pelo Laragon
6. Rode a SQL do banco de dados que está localizada no diretório `./src/database/db.sql` dentro do MySQL Workbench
7. inicie o servidor: `npm run dev`

## Como usar

1. <http://localhost:3000> - Esta é a rota do formulário de login. É onde os usuários podem inserir suas credenciais para acessar a área restrita do site.

2. <http://localhost:3000/user> - Esta é a rota da API. Ela contém os endpoints que os usuários podem acessar para interagir com o banco de dados ou realizar outras ações.

3. <http://localhost:3000/home> - Esta é a rota restrita que contém o dashboard. Somente usuários autenticados podem acessá-la.

![Alt text](https://img.ibxk.com.br/2017/01/05/05165308261866.jpg?ims=328x "SQL Injection")

## Aviso importante

Este projeto é apenas para fins educacionais e não deve ser usado para fins maliciosos. O SQL Injection é uma técnica de ataque comum que pode ser usada para comprometer a segurança de um site ou aplicativo. É importante que os desenvolvedores estejam cientes dessa vulnerabilidade e tomem medidas para proteger seus sistemas contra ela. Isso inclui a validação adequada de entradas do usuário e o uso de consultas parametrizadas em vez de consultas concatenadas. A segurança é uma preocupação crítica em qualquer aplicativo da web e deve ser levada a sério desde o início do processo de desenvolvimento.
