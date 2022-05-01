import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getPatientList } from './API';
import './App.css';

const App = () => {
    useEffect(() => {
        callGetPatientListAPI();
    }, []);

    const [patientList, setPatientList] = useState(null);
    const callGetPatientListAPI = async () => {
        const response = await getPatientList()
        setPatientList(response)
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
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
                        patientList.patients.map((patient, index) => (
                            <tr key={index}>
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
        </>
    )
}

export default App;