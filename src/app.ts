import express from "express";
const app = express();
import films from './routes/films';
import index from './routes/index';

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/', index);
app.use('/films', films);

app.listen(3001, () => console.log('Server is running'))