# TS-EXPRESS-SQL

This is my personal template/boilerplate to quickly get a REST API up and running with NodeJS and not having to integrate functionalities like logging or basic JWT authentication from scratch every time.

## Integrated packages and libraries

The following things are currently integrated in this project. I will only list the most relevant things here.

- Express (v5, although technically still in "beta")
- Typescript
- Pino (logging)
- Passport (authentication)
- Zod (validation)
- Vitest + Supertest (unit and integration tests)
- Prisma (database handling)
- Eslint + Prettier (for staying sane)

I purposely did not integrate any libraries that need 3rd party services like advanced error reporting with Sentry or sending transactional mails with a specific service.
This is to keep the template usable in every scenario and stick to the basic functionalities.

I will also try to keep this up-to-date as the used libraries will be updated.

## Getting started

I abstained from using a different package manager like yarn or pnpm and stayed with npm for simplicity.

Install the project's dependencies with `npm install`.

Create a `.env` file in the root folder of the project and add the following content:

```
JWT_SECRET=<insert arbitrary secret here>

NODE_ENV=development

DATABASE_URL="postgresql://postgres:password@localhost:5432/databaseName?schema=public"
```

Run the database migrations with `npx prisma migrate dev`.

You can then start the project with `npm run dev`.
