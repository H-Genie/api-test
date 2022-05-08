import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getPatientList } from './API';
import './App.css';
import Pagination from './Pagination';

const App = () => {
    useEffect(() => {
        callGetPatientListAPI(10, 1);
    }, []);

    const [patientList, setPatientList] = useState(null);
    const [totalLength, setTotalLength] = useState(null);
    const [page, setPage] = useState(1);

    const callGetPatientListAPI = async (length, page) => {
        const response = await getPatientList(length, page);
        Promise.all([
            setPatientList(response.patients),
            setTotalLength(response.totalLength),
            setPage(response.page)
        ])
    }

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

            <Pagination
                callGetPatientListAPI={callGetPatientListAPI}
                totalLength={totalLength}
                page={page}
            />
        </div>
    )
}

export default App;