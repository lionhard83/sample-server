"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const uuid_1 = require("uuid");
const fake_films_sample_1 = require("fake-films-sample");
const auth_1 = require("../controllers/auth");
const films = fake_films_sample_1.getFilms().map(film => (Object.assign(Object.assign({}, film), { id: uuid_1.v4() })));
const middleware2 = (req, res, next) => {
    console.log('middleware2');
    next();
};
const middleware3 = (req, res, next) => {
    console.log('middleware3', res.locals.message);
    next();
};
const middleFinal = ({ query: { actor, year: filterYear } }, res) => {
    let startFilms = [...films];
    if (actor) {
        startFilms = startFilms.filter(({ actors }) => actors.includes(actor));
    }
    if (filterYear) {
        startFilms = startFilms.filter(({ year }) => year === Number(filterYear));
    }
    res.json(startFilms);
};
router.get('/', auth_1.middlewareLogin, middleware2, middleware3, middleFinal);
router.get('/:id', auth_1.middlewareLogin, (req, res) => {
    const film = films.find(film => film.id === req.params.id);
    if (film) {
        res.json(film);
    }
    else
        res.status(404).json({ message: 'Film not found' });
});
router.post('/', (req, res) => {
    const { name, genres, director, actors, year } = req.body;
    if (!name || !genres || !director || !actors || !year) {
        return res.status(400).json({ message: 'Missing fields in body' });
    }
    const film = {
        name,
        genres,
        director,
        actors,
        year,
        id: uuid_1.v4()
    };
    films.push(film);
    res.status(201).json(film);
});
router.delete('/:id', (req, res) => {
    const index = films.findIndex(film => film.id === req.params.id);
    if (index >= 0) {
        films.splice(index, 1);
        res.json({ message: 'Film deleted' });
    }
    else
        res.status(404).json({ message: 'Film not found' });
});
exports.default = router;
