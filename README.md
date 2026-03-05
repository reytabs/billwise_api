# billwise_api

This is a repository for BillWise API.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

### Environment variables

The application expects the following variables in a `.env` file at the project root:

- `DB_URI` – MongoDB connection string
- `JWT_SECRET` *(preferred)* or `JWT_TOKEN` – secret used for signing JWTs
- `JWT_EXPIRES_IN` – token time-to-live (e.g. `3d`, `12h`)

Make sure at least one of the JWT secrets is provided or the server will fail to start with a clear error message.


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
