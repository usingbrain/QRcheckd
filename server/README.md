# QRchecked Server

## Installation

- Run yarn install
- Set up .env file to match your postgres set up. (for variables names
  check out enviroment.d.ts)
- Dreate qrcheckd postgres db with command:

```
  yarn createDB
```

- Migrations:

```
  yarn init-migration     // initial migration (if you recompiled dist folder)
  yarn migrate            // any consecutive change to db structure
```

- Populate database:

```
  yarn populateDB
```
