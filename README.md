## Description

### [Hexagonal architecture](https://docs.nestjs.com/assets/logo-small.svg) approach for NestJS.

<div style="width: 100%; display: flex; align-items: center; justify-content: space-around; margin: 0 0 0 5%">
   <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
    <img width="50%" src="https://miro.medium.com/max/1400/1*mGLO5IfhJv4o0NYOAZI60A.png">
</div>

Construction inspired by:

- [DDD-Forum](https://github.com/stemmlerjs/ddd-forum)
- [Hexagonal Architecture practical guide](https://beyondxscratch.com/2017/08/19/hexagonal-architecture-the-practical-guide-for-a-clean-architecture/)

## Installation

```bash
$ pnpm install
$ docker-compose up --force-recreate --build # launch postgres
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
