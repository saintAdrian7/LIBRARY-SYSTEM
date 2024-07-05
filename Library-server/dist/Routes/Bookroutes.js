"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = require("../controllers/BookController");
const router = express_1.default.Router();
router.get('/', BookController_1.getAllBooks);
router.post('/', BookController_1.createBook);
router.put('/', BookController_1.updateBook);
router.delete('/:barcode', BookController_1.deleteBook);
exports.default = router;
