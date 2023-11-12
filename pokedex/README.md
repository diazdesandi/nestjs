<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="50" alt="Nest Logo" /></a>
</p>

## Running
1. Clone repository
2. Run `yarn install`
3. Install Nest CLI
```
npm i -g @nestjs/cli
```
4. Run database
```
docker-compose up -d
```
5. Clone `.env.template` and rename as `.env`

6. Run app
```
yarn start:dev
```
7. Rebuild database
```
http://localhost:3000/api/v2/seed
```
## Stack
* Mongo DB
* NestJS

# Production build
1. Create `.env.prod`
2. Create image
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build

```