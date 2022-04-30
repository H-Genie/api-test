const { Router } = require('express');
const patientRouter = Router();
const { Patient } = require('../models');

patientRouter.get('/', async (req, res) => {
    try {
        const length = req.query.length;
        const page = req.query.page - 1 || 0;

        let patients = await Patient.find({})
            // .sort()
            .skip(length * page)
            .limit(length);

        return res.send({ patients, page: page + 1, totalLength: patients.length });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: err.message })
    }
})

module.exports = { patientRouter }