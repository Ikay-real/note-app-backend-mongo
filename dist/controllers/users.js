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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const users_1 = require("../db/users");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        //console.log("new user", req);
        const createdUser = yield (0, users_1.createUserDB)(newUser);
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log("req-> ",_req);
        const users = yield (0, users_1.getUsersDB)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, users_1.getUserByIdDB)(Number(id));
        if (!user) {
            console.log("id", id);
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const user = yield (0, users_1.updateUserDB)(Number(id), updatedUser);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield (0, users_1.deleteUserDB)(Number(id));
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
const deleteAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_1.deleteAllUsersDB)();
        res.status(200).json({ message: 'All users deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteAllUsers = deleteAllUsers;
