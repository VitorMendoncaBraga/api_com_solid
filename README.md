# App

    GymPass style app

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter um perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível obter o usuário obter seu histórico de check-ins;
- [X] Deve ser possível obter o usuário buscar academias próximas (até 10km);
- [X] Deve ser possível obter o usuário buscar academias pelo nome;
- [X] Deve ser possível obter o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;



## RNs (Regras de negócios)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não deve poder fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X ] O check-in só pode ser validade até 20 minutos após criado;
- [ ] O check-in só pode ser validade por administradores;
- [ ] A academia só pode ser cadastradas por administradores;


## RNFs (Requisitos não funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisar estar persistidos em um banco PostgreSQL;
- [X] Todas lista de dados precisar estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT;


# Docker 

 - É uma plataforma de containers que permite empacotar, distribuir e executar aplicações de forma isolada, leve e consistente, independente do ambiente


 ## Comando para criar e rodar uma imagem do postgresql vinda do DockerHub

  ```
  ` docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432     bitnami/postgresql
  ```

  ## Comando para listar os containers rodando 
   
  ```
  ` docker ps
  ```

  ## Comando para listar os containers que estão em cache
   
  ```
  ` docker ps -a
  ```

   ## Comando para rodar uma imagem
   
  ```
  ` docker start (name or ID)
  ```

  ## Comando para parar de rodar uma imagem
   
  ```
  ` docker stop (name or ID)
  ```

  ## Comando para deletar um container
   
  ```
  ` docker rm (name or ID)
  ```

  obs: apaga tabelas e

  ## docker-compose.yml
  - É um arquivo para criar uma imagem
  - Com essa imagem, podemos usar o comando:

  ```
  ` docker compose up -d
  ```

  para rodar o container

  - deletar um container com docker compose
  ```
  ` docker compose down
  ```

  - parar de rodar um container com docker compose
  ```
  ` docker compose stop  
  ```

# Prisma

- Prisma é um ORM para realizar queries no DB de forma mais rápida, incluindo a criação e atualização de tabelas!

- Usamos o schema.prisma para criar as tabelas
- npx prisma migrate dev cria as migrates
- 
  