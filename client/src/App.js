import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getPatientList } from './API';
import './App.css';

const App = () => {
    useEffect(() => {
        callGetPatientListAPI(10, 1);
    }, []);

    const [patientList, setPatientList] = useState(null);
    const [totalLength, setTotalLength] = useState(null);
    const [page, setPage] = useState(1);

    const [length, setLength] = useState(10);
    const [shownPaging, setShownPaging] = useState(Math.floor((page - 1) / 10) * 10);
    const totalPage = totalLength && totalLength / length;
    const [onlyNumber, setOnlyNumber] = useState(length);

    const callGetPatientListAPI = async (length, page) => {
        const response = await getPatientList(length, page);
        Promise.all([
            setPatientList(response.patients),
            setTotalLength(response.totalLength),
            setPage(response.page)
        ])
    }

    const pagination = () => {
        let arr = [];

        shownPaging !== 0 && arr.push(
            <li
                key='prev'
                onClick={() => setShownPaging(shownPaging - 10)}
            >
                ←
            </li>
        )

        for (let i = shownPaging; i < Math.min(shownPaging + 10, totalPage); i++) {
            arr.push(
                <li
                    key={i}
                    onClick={() => callGetPatientListAPI(length, i + 1)}
                >
                    {i + 1}
                </li>
            );
        }

        shownPaging + 10 < totalLength / length && arr.push(
            <li
                key='next'
                onClick={() => setShownPaging(shownPaging + 10)}
            >
                →
            </li>
        )

        return arr;
    };

    const changeLength = e => {
        e.preventDefault();

        let newLenth;
        if (!e.target[0].value || e.target[0].value === '0') newLenth = length;
        else newLenth = parseInt(e.target[0].value);

        setLength(newLenth);
        callGetPatientListAPI(newLenth, 1);
    }

    const validatNumber = e => setOnlyNumber(Math.min(e.target.value.replace(/[^0-9]/g, ''), totalLength));

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>ID</th>
                        <th>Age</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Ethnicity</th>
                        <th>Race</th>
                        <th>isDeath</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        patientList &&
                        patientList.map((patient, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{patient.personID}</td>
                                <td>{patient.age}</td>
                                <td>{dayjs(patient.birthDatetime).format("YYYY-MM-DD")}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.ethnicity}</td>
                                <td>{patient.race}</td>
                                <td>{patient.isDeath ? "Y" : "N"}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

            <div className='pagination'>
                <form onSubmit={changeLength}>
                    <input type="text" onChange={validatNumber} value={onlyNumber} />
                    <button type='submit'>변경</button>
                </form>
                <ul>
                    {pagination()}
                </ul>
            </div>
        </div>
    )
}

export default App;