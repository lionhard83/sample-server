import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import { v4 } from "uuid";
import { getFilms } from "fake-films-sample";
import { middlewareLogin } from "../controllers/auth";

const films = getFilms().map(film => ({
    ...film,
    id: v4()
}));



const middleware2 = (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware2');
    next();
}
const middleware3 = (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware3', res.locals.message);
    next();
}
const middleFinal = ({query: { actor, year: filterYear}}: Request, res: Response) => {
    let startFilms = [...films]; 
    if (actor) {
        startFilms = startFilms.filter(({actors}) => actors.includes(actor as string))
    }
    if (filterYear) {
        startFilms = startFilms.filter(({year}) => year === Number(filterYear));
    }
    res.json(startFilms);
}

router.get('/', 
middlewareLogin, 
middleware2, 
middleware3, 
middleFinal);

router.get('/:id', middlewareLogin, (req, res) => {
    const film = films.find(film => film.id === req.params.id);
    if (film) {
        res.json(film);
    } else res.status(404).json({message: 'Film not found'})
})


router.post('/', (req, res) => {
    const {name, genres, director, actors, year} = req.body;
    if (!name || !genres || !director || !actors || !year) {
        return res.status(400).json({message: 'Missing fields in body'})
    }
    const film = {
        name,
        genres,
        director,
        actors,
        year,
        id: v4() 
    };
    films.push(film);
    res.status(201).json(film);
})

router.delete('/:id', (req, res) => {
    const index = films.findIndex(film => film.id === req.params.id);
    if (index >= 0) {
        films.splice(index, 1);
        res.json({message: 'Film deleted'});
    } else res.status(404).json({message: 'Film not found'})
})

export default router;
