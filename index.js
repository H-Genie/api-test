// express
const express = require('express');
const app = express();
require('dotenv').config();


// mongoose
const mongoose = require('mongoose');
const { MONGO_URI, PORT } = process.env;

const { patientRouter, statRouter, listRouter } = require('./server/routes');

const server = async () => {
    try {

        await mongoose.connect(MONGO_URI);
        await mongoose.set("debug", true);
        console.log('MongoDB connected');

        // middleware
        app.all('/*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            next();
        });
        app.use(express.json());
        app.use('/patient', patientRouter);
        app.use('/stat', statRouter);
        app.use('/list', listRouter);

        // port
        app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

    } catch (err) {
        console.log(err);
    }
}

server();