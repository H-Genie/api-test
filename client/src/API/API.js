/* eslint no-restricted-globals: ["off"] */
import axios from 'axios';

const host = process.env.NODE_ENV === 'development' ?
    process.env.REACT_APP_HOST :
    location.origin;

export const getPatientList = (
    length,
    page,
    order_column,
    order_desc,
    filters
) => {
    const {
        gender,
        race,
        ethnicity,
        age_min,
        age_max,
        death
    } = filters;

    return axios.get(`${host}/patient?length=${length}&page=${page - 1}&order_column=${order_column}&order_desc=${order_desc ? -1 : 1}${gender ? '&gender=' + gender : ''}${race.length !== 0 ? '&race=' + race : ''}${ethnicity ? '&ethnicity=' + ethnicity : ''}${age_min ? '&age_min=' + age_min : ''}${age_max ? '&age_max=' + age_max : ''}${death ? '&death=' + death : ''}`)
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

export const getGenderList = () => {
    return axios.get(`${host}/list/gender`)
        .then(res => res.data)
        .catch(e => console.log(e));
}

export const getRaceList = () => {
    return axios.get(`${host}/list/race`)
        .then(res => res.data)
        .catch(e => console.log(e));
}

export const getEthnicityList = () => {
    return axios.get(`${host}/list/ethnicity`)
        .then(res => res.data)
        .catch(e => console.log(e));
}