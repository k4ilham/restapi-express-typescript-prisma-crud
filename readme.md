Tutorial Membuat REST API dengan Express, Typescript, dan PostgreSQL

https://www.petanikode.com/express-rest-api-ts/

mkdir microblog

cd microblog

npm init -y

npm install express @prisma/client @types/http-errors

npm install --save-dev typescript ts-node @types/node @types/express prisma nodemon

npm run dev

npx prisma init

npx prisma migrate dev --name init