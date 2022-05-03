import axios from 'axios';

const host = "http://localhost:5000";

export const getPatientList = (length, page) => {
    return axios.get(`${host}/patient?length=${length}&page=${page}`)
        .then(res => res.data)
        .catch(e => console.log(e));
}

export const getPatientBrief = personID => {
    return axios.get(`${host}/brief/${personID}`)
        .then(res => res.data)
        .catch(e => console.log(e));
}

export const getPatientCondition = personID => {
    return axios.get(`${host}/brief/${personID}/condition`)
        .then(res => res.data)
        .catch(e => console.log(e));
}

export const getPatientDrug = personID => {
    return axios.get(`${host}/brief/${personID}/drug`)
        .then(res => res.data)
        .catch(e => console.log(e));
}

export const getPatientVisit = personID => {
    return axios.get(`${host}/brief/${personID}/visit`)
        .then(res => res.data)
        .catch(e => console.log(e));
}

export const getStat = () => {
    return axios.get(`${host}/stat`)
        .then(res => res.data)
        .catch(e => console.log(e));
}