"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const users_2 = __importDefault(require("./db/users"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express_1.default.json());
app.use('/users', users_1.default);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(PORT, () => {
    (0, users_2.default)();
    console.log(`Server is running on port http://localhost:${PORT}`);
});
