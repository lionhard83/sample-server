"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const films_1 = __importDefault(require("./routes/films"));
const index_1 = __importDefault(require("./routes/index"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/', index_1.default);
app.use('/films', films_1.default);
app.listen(3001, () => console.log('Server is running'));
