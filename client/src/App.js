import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getPatientList } from './API';
import './App.css';
import Pagination from './Pagination';

const App = () => {
    useEffect(() => {
        callGetPatientListAPI(10, 1, null, true);
        //eslint-disable-next-line
    }, []);

    const [patientList, setPatientList] = useState(null);
    const [totalLength, setTotalLength] = useState(null);
    const [page, setPage] = useState(1);

    const [length, setLength] = useState(10);
    const [order_column, setOrder_column] = useState(null);
    const [order_desc, setOrder_desc] = useState(true);

    const callGetPatientListAPI = async (length, page, order_column) => {
        const response = await getPatientList(length, page, order_column, order_desc);
        Promise.all([
            setPatientList(response.patients),
            setTotalLength(response.totalLength),
            setPage(response.page)
        ])
    }

    const sortColumn = column => {
        setOrder_column(column);
        column === order_column ? setOrder_desc(!order_desc) : setOrder_desc(true);

        // 두번쨰 클릭에서 !prev가 작동하지 않음
        console.log(column, order_desc)
        callGetPatientListAPI(length, 1, column, order_desc);
    }

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th onClick={() => sortColumn('personID')}>
                            ID
                        </th>
                        <th onClick={() => sortColumn('age')}>Age</th>
                        <th onClick={() => sortColumn('birthDatetime')}>Birthday</th>
                        <th onClick={() => sortColumn('gender')}>Gender</th>
                        <th onClick={() => sortColumn('ethnicity')}>Ethnicity</th>
                        <th onClick={() => sortColumn('race')}>Race</th>
                        <th onClick={() => sortColumn('isDeath')}>isDeath</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        patientList &&
                        patientList.map((patient, index) => (
                            <tr key={index} onClick={e => console.log(patient.personID)}>
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
                order_desc={order_desc}
            />
        </div>
    )
}

export default App;