"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const Authroutes_1 = __importDefault(require("./Authroutes"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const Bookroutes_1 = __importDefault(require("./Bookroutes"));
function registerRoutes(app) {
    app.get('/health', (req, res) => {
        res.status(200).json({ message: "Server is running properly" });
    });
    app.use("/auth", Authroutes_1.default);
    app.use("/users", UserRoutes_1.default);
    app.use("/book", Bookroutes_1.default);
}
