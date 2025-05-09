"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = __importDefault(require("./src/middlewares/error.middleware"));
const db_1 = __importDefault(require("./src/config/db"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const user_route_1 = __importDefault(require("./src/routes/user.route"));
const class_route_1 = __importDefault(require("./src/routes/class.route"));
const auth_route_1 = __importDefault(require("./src/routes/auth.route"));
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(error_middleware_1.default);
(0, db_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', auth_route_1.default);
app.use('/api/users', user_route_1.default);
app.use('/api/classes', class_route_1.default);
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log(`SM-Technology server at running port: http://localhost:${port}`);
});
