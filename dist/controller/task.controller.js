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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultiPatch = exports.deletePatch = exports.editPatch = exports.create = exports.changeMultiPatch = exports.changeStatusPatch = exports.detail = exports.tasks = void 0;
var task_model_1 = __importDefault(require("../model/task.model"));
//[GET] api/v1/tasks
var tasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var find, sort, pagination, skip, regex, tasks_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                find = {
                    deleted: false
                };
                if (req.query.status) {
                    find["status"] = "".concat(req.query.status);
                }
                sort = {};
                if (req.query.sortKey && req.query.sortValue) {
                    sort["".concat(req.query.sortKey)] = req.query.sortValue;
                }
                pagination = {
                    limit: 2,
                    currentPage: 1
                };
                if (req.query.page) {
                    pagination.currentPage = parseInt("".concat(req.query.page));
                }
                if (req.query.limit) {
                    pagination.limit = parseInt("".concat(req.query.limit));
                }
                skip = (pagination.currentPage - 1) * (pagination.limit);
                //keyword
                if (req.query.keyword) {
                    regex = new RegExp("".concat(req.query.keyword), "i");
                    find["title"] = regex;
                }
                return [4 /*yield*/, task_model_1.default.find(find).sort(sort).skip(skip).limit(pagination.limit)];
            case 1:
                tasks_1 = _a.sent();
                res.json(tasks_1);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.tasks = tasks;
//[GET] api/v1/tasks/detail/:id
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, task_model_1.default.findOne({
                        deleted: false,
                        _id: id
                    })];
            case 1:
                task = _a.sent();
                res.json(task);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
//[PATCH] api/v1/tasks/change-status/:id
var changeStatusPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                status_1 = req.body.status;
                return [4 /*yield*/, task_model_1.default.updateOne({
                        _id: id
                    }, {
                        status: status_1
                    })];
            case 1:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công!"
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.json({
                    code: 400,
                    message: "Không tồn tại bản ghi!"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.changeStatusPatch = changeStatusPatch;
//[PATCH] api/v1/tasks/change-multi/:id
var changeMultiPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var listStatus, _a, ids, status_2, tasks_2, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                listStatus = ["initial", "doing", "notFinish", "pending", "finish"];
                _a = req.body, ids = _a.ids, status_2 = _a.status;
                if (!listStatus.includes(status_2)) return [3 /*break*/, 2];
                return [4 /*yield*/, task_model_1.default.updateMany({
                        _id: { $in: ids }
                    }, {
                        status: status_2
                    })];
            case 1:
                tasks_2 = _b.sent();
                res.json({
                    code: 200,
                    massgae: "Đổi trạng thái thành công!"
                });
                return [3 /*break*/, 3];
            case 2:
                res.json({
                    code: 400,
                    message: "Trạng thái không hợp lệ!"
                });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                res.json({
                    code: 400,
                    massage: "Đổi trạng thái thất bại!"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.changeMultiPatch = changeMultiPatch;
//[POST] api/v1/tasks/create
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idParent, task, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.body.taskParentId) return [3 /*break*/, 2];
                return [4 /*yield*/, task_model_1.default.findOne({
                        _id: req.body.taskParentId
                    })];
            case 1:
                idParent = _a.sent();
                if (!idParent) {
                    res.json({
                        code: 400,
                        message: "Id parent không tồn tại!"
                    });
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                task = new task_model_1.default(req.body);
                return [4 /*yield*/, task.save()];
            case 3:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Thêm công việc thành công"
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                res.json(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
// [PATCH] api/v1/tasks/edit/:id
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, listStatus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                listStatus = ["initial", "doing", "notFinish", "pending", "finish"];
                if (!listStatus.includes(req.body.status)) {
                    res.json({
                        code: 400,
                        message: "Trạng thái công việc không tồn tại!"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, task_model_1.default.updateOne({
                        _id: id
                    }, req.body)];
            case 1:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Chỉnh sửa công việc thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
// [DELETE] api/v1/tasks/delete/:id
var deletePatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, task_model_1.default.updateOne({
                        _id: id
                    }, {
                        deleted: true,
                        deletedAt: new Date()
                    })];
            case 1:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Xóa công việc thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deletePatch = deletePatch;
// [DELETE] api/v1/tasks/delete-multi
var deleteMultiPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ids;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ids = req.body.ids;
                return [4 /*yield*/, task_model_1.default.updateMany({
                        _id: { $in: ids }
                    }, {
                        deleted: true
                    })];
            case 1:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Xóa các công việc thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteMultiPatch = deleteMultiPatch;
