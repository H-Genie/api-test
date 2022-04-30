// express
const express = require('express');
const app = express();


// mongoose
const mongoose = require('mongoose');
const { MONGO_URI, PORT } = process.env;

const { patientRouter } = require('./server/routes');

const server = async () => {
    try {

        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');

        // middleware
        app.use(express.json());
        app.all('/*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        app.use('/patient', patientRouter);

        // port
        app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

    } catch (err) {
        console.log(err);
    }
}

server();