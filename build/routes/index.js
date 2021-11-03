"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const x = (resolve, reject) => {
    // console.log('Hello Promise');
    // Math.random() > 0.5 ? resolve(2) : reject();
    setTimeout(() => {
        resolve("Success!"); // È andato tutto perfettamente!
    }, 2000);
};
router.get('/', async (req, res) => {
    // try {
    //     const p = new Promise(x);
    //     console.log(p);
    //     const resPromise = await p;
    //     res.json({message: 'Hello World' + resPromise,});
    // } catch (err) {
    //     res.json({message: 'Hello World with err:', err})
    // }
    const p = new Promise(x);
    p
        .then((resPromise) => {
        console.log('p:', p);
        console.log('res:', resPromise);
        res.json({ message: 'Hello World' });
    })
        .catch(err => {
        console.log('err:', err);
        res.json({ message: 'Hello World with err:', err });
    });
    console.log('p:', p);
});
exports.default = router;
