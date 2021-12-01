"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Client } = require('pg');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.query(`
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
   `);
    yield client.end();
}))();
//# sourceMappingURL=createDB.js.map