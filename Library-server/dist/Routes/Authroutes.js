"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/register', (0, validation_1.validateSchema)(validation_1.Schemas.user.create, 'body'), AuthController_1.handleRegister);
router.post('/login', (0, validation_1.validateSchema)(validation_1.Schemas.user.login, 'body'), AuthController_1.handleLogin);
module.exports = router;
