"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = require("./config/database");
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./v1/routes/index"));
//config env
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT;
//parse application/json
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, database_1.connect)();
(0, index_1.default)(app);
app.listen(3000, function () {
    console.log("Application started on port ".concat(PORT, "!"));
});
