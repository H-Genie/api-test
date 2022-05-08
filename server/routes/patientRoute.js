const { Router } = require('express');
const patientRouter = Router();
const { Patient, Brief, Condition, Drug, Visit } = require('../models');

patientRouter.get('/', async (req, res) => {
    try {
        const length = req.query.length;
        const page = req.query.page - 1 || 0;
        const order_column = req.query.order_column;

        let patients = await Patient.find({})
            .sort(order_column)
            .skip(length * page)
            .limit(length);
        const totalLength = await Patient.find({}).countDocuments();

        return res.send({ patients, page: page + 1, totalLength });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID', async (req, res) => {
    try {
        const { personID } = req.params;
        let briefs = await Brief.findOne({ personID: parseInt(personID) });

        return res.send(
            {
                conditionList: briefs.conditionList,
                visitCount: briefs.visitCount
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/condition', async (req, res) => {
    try {
        const { personID } = req.params;
        let conditions = await Condition.findOne({ personID: parseInt(personID) });

        return res.send({ conditionList: conditions.conditionList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/drug', async (req, res) => {
    try {
        const { personID } = req.params;
        let drugs = await Drug.findOne({ personID: parseInt(personID) });

        return res.send({ drugList: drugs.drugList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/visit', async (req, res) => {
    try {
        const { personID } = req.params;
        let visits = await Visit.findOne({ personID: parseInt(personID) });

        return res.send({ visitList: visits.visitList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

module.exports = { patientRouter }