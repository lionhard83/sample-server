import express, { NextFunction, Request, Response } from "express";

export const middlewareLogin = (req: Request, res: Response, next: NextFunction) => {
    if (Math.random() > 0.5) {
        
        res.locals.message = 'Ti sta arrivando un messaggio dal primo middleware'
        return next();
    } else res.status(400).json({message: 'Riprova sei stato sfortunato'})
}