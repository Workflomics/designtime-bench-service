"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const express = __importStar(require("express"));
const bodyParser = __importStar(require("body-parser"));
const typedi_1 = __importDefault(require("typedi"));
const config_1 = require("../app/config");
const logger_1 = require("../libs/logs/logger");
const routing_controllers_1 = require("routing-controllers");
const http = __importStar(require("http"));
const baseDir = __dirname;
const expressApp = express();
// Handling the DependencyInjection across the entire application
(0, routing_controllers_1.useContainer)(typedi_1.default);
// Loads all the Controllers from the directories and provides the routing facility
(0, routing_controllers_1.useExpressServer)(expressApp, {
    routePrefix: config_1.ENV_CONFIG.app.apiRoot,
    defaultErrorHandler: false,
    controllers: [baseDir + `/**/controllers/*{.js,.ts}`]
});
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
const server = http.createServer(expressApp);
server.listen(config_1.ENV_CONFIG.app.port, () => {
    logger_1.Logger.info('Server', 'Application running on', `${config_1.ENV_CONFIG.app.hostname}:${config_1.ENV_CONFIG.app.port}`);
});
// Handling the unHandledRejection errors
process.on('unhandledRejection', (error, promise) => {
    logger_1.Logger.error('Server', 'unhandledRejectionError :', `${error}`);
});
