const { Client } = require('pg');
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

(async () => {
  await client.connect();

  // create qrcheckd db if one does not exist credits: Ortwin Angermeier
  // https://stackoverflow.com/questions/18389124/simulate-create-database-if-not-exists-for-postgresql
  await client.query(
    `
    DO
    $do$
    DECLARE
    _db TEXT := 'qrcheckd';
    _user TEXT := '${process.env.DB_USER}';
    _password TEXT := '${process.env.DB_PASSWORD}';
    BEGIN
    CREATE EXTENSION IF NOT EXISTS dblink; -- enable extension
    IF EXISTS (SELECT 1 FROM pg_database WHERE datname = _db) THEN
        RAISE NOTICE 'Database already exists';
    ELSE
        PERFORM dblink_connect('host=localhost user=' || _user || ' password=' || _password || ' dbname=' || current_database());
        PERFORM dblink_exec('CREATE DATABASE ' || _db);
    END IF;
    END
    $do$
   `
  );

  await client.end();
})();
