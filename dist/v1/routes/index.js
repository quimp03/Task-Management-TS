"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var tasks_1 = __importDefault(require("./tasks"));
var users_1 = __importDefault(require("./users"));
var auth_middleware_1 = require("../../middleware/auth.middleware");
module.exports = function (app) {
    var version = "/api/v1";
    app.use(version + "/tasks", auth_middleware_1.requireAuth, tasks_1.default);
    app.use(version + "/users", users_1.default);
};
