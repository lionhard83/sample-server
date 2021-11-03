"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareLogin = void 0;
exports.middlewareLogin = (req, res, next) => {
    if (Math.random() > 0.5) {
        res.locals.message = 'Ti sta arrivando un messaggio dal primo middleware';
        return next();
    }
    else
        res.status(400).json({ message: 'Riprova sei stato sfortunato' });
};
