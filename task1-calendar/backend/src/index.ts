import express from 'express';
import cors from 'cors';
import currencyData from "./routes/currency"
import bodyParser from 'body-parser';
import { client } from './database/database';

const app = express();

const connect= async()=>{
    try {
        await client.connect();
        console.log("Postgre connected")
    } catch (error) {
        throw error
    }
}

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,');
    console.log('api hit')
    next();
  })

app.get('/', (req, res) => {
    res.status(201).send({message: "masuk"});
})

app.use("/api/v1/currency", currencyData)

app.listen(8000,() => {
    connect();
    console.log(`listening on http://localhost:8000`);
})


