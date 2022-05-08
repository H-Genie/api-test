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

    const [length, setLength] = useState(10);
    const [order_column, setOrder_column] = useState(null);

    const callGetPatientListAPI = async (length, page, order_column) => {
        const response = await getPatientList(length, page, order_column);
        Promise.all([
            setPatientList(response.patients),
            setTotalLength(response.totalLength),
            setPage(response.page)
        ])
    }

    const order = param => {
        callGetPatientListAPI(length, 1, param);
        setOrder_column(param);
    }

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th onClick={() => order('personID')}>ID</th>
                        <th onClick={() => order('age')}>Age</th>
                        <th onClick={() => order('birthDatetime')}>Birthday</th>
                        <th onClick={() => order('gender')}>Gender</th>
                        <th onClick={() => order('ethnicity')}>Ethnicity</th>
                        <th onClick={() => order('race')}>Race</th>
                        <th onClick={() => order('isDeath')}>isDeath</th>
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
                length={length}
                setLength={setLength}
                order_column={order_column}
            />
        </div>
    )
}

export default App;