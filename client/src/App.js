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
    const [length, setLength] = useState(10);
    const [totalPage, setTotalPage] = useState(totalLength / length);
    const [page, setPage] = useState(1);
    const [shownPaging, setShownPaging] = useState(Math.floor((page - 1) / 10) * 10);

    const callGetPatientListAPI = async (length, page) => {
        const response = await getPatientList(length, page);
        Promise.all([
            setPatientList(response.patients),
            setTotalLength(response.totalLength),
            setPage(response.page),
            // setTotalPage(response.totalLength / length)
        ])
    }
    console.log(totalPage)

    const pagination = () => {
        let arr = [];
        shownPaging !== 0 && arr.push(
            <span
                onClick={() => setShownPaging(shownPaging - 10)}
                style={{ marginRight: '10px', cursor: 'pointer' }}
            >
                ←
            </span>
        )
        for (let i = shownPaging; i < shownPaging + 10; i++) {
            arr.push(
                <span
                    key={i}
                    onClick={() => callGetPatientListAPI(length, i + 1)}
                    style={{ marginRight: '10px', cursor: 'pointer' }}
                >
                    {i + 1}
                </span>
            );
        }
        shownPaging + 10 < totalLength / length && arr.push(
            <span
                onClick={() => setShownPaging(shownPaging + 10)}
                style={{ cursor: 'pointer' }}
            >
                →
            </span>
        )
        return arr;
    };

    const changeLength = e => {
        e.preventDefault();
        setLength(e.target[0].value);
        callGetPatientListAPI(e.target[0].value, 1);
        // pagination();
    }

    const validatNumber = e => {
        let onlyNumber = e.target.value.replace(/[^0-9]/g, '');
        setLength(onlyNumber && parseInt(onlyNumber));
    }

    return (
        <div>
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

            <div>{pagination()}</div>
            <form onSubmit={changeLength}>
                <input type="text" onChange={validatNumber} value={length} />
                <button type='submit'>변경</button>
            </form>
        </div>
    )
}

export default App;