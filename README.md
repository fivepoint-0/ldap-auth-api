# Awesome Project Build with TypeORM

## Running Application and Installation

Steps to run this project:

1. Create `ormconfig.json` (you can view the settings options at [TypeORM ORM Config](https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#using-ormconfigjson)):

```json
{
   "type": "DB_TYPE",
   "host": "DB_HOST_ADDRESS",
   "port": "DB_PORT",
   "username": "DB_USERNAME_HERE",
   "password": "DB_PASSWORD_HERE",
   "database": "DB_DATABASE_NAME_HERE",
   "synchronize": true,
   "logging": true,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```

If you don't want to use `ormconfig.json`, you can also [use environment variables](https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#using-environment-variables).

2. Create a `.env` file (you can rename `.env.example` for this):

```env
SERVER_PORT=3000
```

3. Run `npm install`.
4. Run `npm start`.

## Building

To build the project, run `npm build`.
