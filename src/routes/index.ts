import express, { NextFunction, Request, Response } from "express";
import { middlewareLogin } from "../controllers/auth";
const router = express.Router();
import OpenWeatherMap from 'openweathermap-ts';
const openWeather = new OpenWeatherMap({
    apiKey: 'Your API Key'
  });
const x = (resolve: (value:  number) => void, reject: () => void) => {
    // console.log('Hello Promise');
    // Math.random() > 0.5 ? resolve(2) : reject();
    setTimeout(() =>{
        resolve(2); // È andato tutto perfettamente!
    }, 2000);
}

router.get('/', async (req, res) => {

    const weather = await openWeather.getThreeHourForecastByCityName({
        cityName: 'Cedar Park',
        state: 'Texas',
        countryCode: 'US'
      });

    try {
        const p = new Promise<number>(x);
        console.log(p);
        const resPromise = await p;
        res.json({message: 'Hello World' + resPromise,});
    } catch (err) {
        res.json({message: 'Hello World with err:', err})
    }
    
    // const p = new Promise(x);
    // p
    //     .then((resPromise) => {
    //         console.log('p:', p);
    //         console.log('res:', resPromise)
    //         res.json({message: 'Hello World'});
    //     })
    //     .catch(err => {
    //         console.log('err:', err)
    //         res.json({message: 'Hello World with err:', err})
    //     })
    //  console.log('p:', p);


});



export default router;