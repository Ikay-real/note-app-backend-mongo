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
exports.deleteAllUsersDB = exports.deleteUserDB = exports.updateUserDB = exports.getUserByIdDB = exports.getUsersDB = exports.createUserDB = exports.initDB = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
let db;
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    db = yield (0, sqlite_1.open)({
        filename: './database/users.db',
        driver: sqlite3_1.default.Database,
    });
    yield db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT,
      password TEXT
    )
  `);
});
exports.initDB = initDB;
const createUserDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = user;
    console.log("data ", user);
    const result = yield db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', username, email, password);
    if (result && typeof result.lastID === 'number') {
        const lastInsertedId = result.lastID;
        const createdUser = yield (0, exports.getUserByIdDB)(lastInsertedId);
        // Check if createdUser is defined before returning
        if (createdUser) {
            return createdUser;
        }
        else {
            throw new Error('Error creating user. User not found after insertion.');
        }
    }
    else {
        throw new Error('Error creating user. Unable to get last inserted ID.');
    }
});
exports.createUserDB = createUserDB;
const getUsersDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return db.all('SELECT * FROM users');
});
exports.getUsersDB = getUsersDB;
const getUserByIdDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db.get('SELECT * FROM users WHERE id = ?', id);
});
exports.getUserByIdDB = getUserByIdDB;
const updateUserDB = (id, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = updatedUser;
    yield db.run('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', username, email, password, id);
    return (0, exports.getUserByIdDB)(id);
});
exports.updateUserDB = updateUserDB;
const deleteUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userToDelete = yield (0, exports.getUserByIdDB)(id);
    if (!userToDelete)
        return undefined;
    yield db.run('DELETE FROM users WHERE id = ?', id);
    return userToDelete;
});
exports.deleteUserDB = deleteUserDB;
// ... (existing code)
// Function to delete all users from the database
const deleteAllUsersDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.run('DELETE FROM users');
});
exports.deleteAllUsersDB = deleteAllUsersDB;
exports.default = exports.initDB;
