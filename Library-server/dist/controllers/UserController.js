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
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const UserService_1 = require("../services/UserService");
const libraryErrors_1 = require("../utils/libraryErrors");
const userDaos_1 = __importDefault(require("../daos/userDaos"));
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let users = yield (0, UserService_1.findAllUsers)();
            res.status(200).json({ users });
            console.log(users);
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            let user = yield (0, UserService_1.findUserById)(id);
            res.status(200).json({ message: "User retrived successfully", user });
        }
        catch (error) {
            if (error instanceof libraryErrors_1.UserDoesNotExist) {
                res.status(404).json({ message: "User requested does not exist" });
            }
            else {
                res.status(500).json({ message: "Could not find User", error: error.message });
            }
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.body;
        try {
            let updatedUser = yield (0, UserService_1.modifyUser)(user);
            res.status(200).json({ message: "User updated successfully", updatedUser });
        }
        catch (error) {
            if (error instanceof libraryErrors_1.UserDoesNotExist) {
                res.status(404).json({ message: "User requested does not exist" });
            }
            else {
                res.status(500).json({ message: "Unable to update user currently", error: error.message });
            }
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            yield (0, UserService_1.removeUser)(id);
            res.status(200).json({ message: "User deleted successfully" });
        }
        catch (error) {
            if (error instanceof userDaos_1.default) {
                res.status(404).json({ message: "user requested does not exist" });
            }
            else {
                res.status(500).json({ message: "Unable to delete user currently", error: error.message });
            }
        }
    });
}
