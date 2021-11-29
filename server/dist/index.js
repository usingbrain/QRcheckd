"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_session_1 = __importStar(require("express-session"));
const http_1 = __importDefault(require("http"));
const apollo_server_core_1 = require("apollo-server-core");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const app = (0, express_1.default)();
    const store = new express_session_1.MemoryStore();
    app.use((0, express_session_1.default)({
        store,
        name: 'qrcid',
        cookie: {
            path: '/',
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 5,
        },
        secret: 'dhslkfajsldkfjasld',
        resave: false,
        saveUninitialized: false,
    }));
    const httpServer = http_1.default.createServer(app);
    app.get('/', (req, res) => {
        req.session.userId = 12;
        res.send('banana');
    });
    const schema = application_1.application.createSchemaForApollo();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => {
            return {
                orm,
                req,
                res,
                store,
            };
        },
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
        ],
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: [
                'http://localhost:4000',
                'http://localhost:4000/graphql',
                'https://studio.apollographql.com',
                'https://studio.apollographql.com/sandbox/explorer',
            ],
            credentials: true,
        },
    });
    httpServer.listen(4000, () => {
        console.log('server running');
    });
}))();
//# sourceMappingURL=index.js.map