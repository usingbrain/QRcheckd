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
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const application_1 = require("./graphql/application");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const apollo_server_core_1 = require("apollo-server-core");
const express_session_1 = __importDefault(require("express-session"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use((0, express_session_1.default)({
        name: 'qrcid',
        cookie: {
            maxAge: 1000 * 60 * 20,
            sameSite: 'lax',
            secure: process.env.NODE_ENV !== 'development',
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }));
    const schema = application_1.application.createSchemaForApollo();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: (req, res) => ({
            orm,
            req,
            res,
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app });
    httpServer.listen(4000, () => {
        console.log('server running');
    });
}))();
//# sourceMappingURL=index.js.map