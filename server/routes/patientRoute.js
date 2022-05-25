const { Router } = require('express');
const patientRouter = Router();
const { Patient, Brief, Condition, Drug, Visit } = require('../models');

patientRouter.get('/', async (req, res) => {
    try {
        const {
            length,
            page,
            order_column,
            order_desc,
            gender,
            race,
            ethnicity,
            age_min,
            age_max,
            death
        } = req.query;

        let obj = {
            [gender !== undefined && 'gender']: gender,
            [race !== undefined && 'race']: race,
            [ethnicity !== undefined && 'ethnicity']: ethnicity,
            [age_min !== undefined && 'age_min']: age_min,
            [age_max !== undefined && 'age_max']: age_max,
            [death !== undefined && 'death']: death
        }

        const patients = await Patient.find(obj)
            .sort({ [order_column]: order_desc })
            .skip(length * page)
            .limit(length);
        const totalLength = await Patient.find(obj).countDocuments();

        return res.send({ patients, page: parseInt(page) + 1, totalLength });
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