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

    const callGetPatientListAPI = async (length, page, order_column, order_desc) => {
        const response = await getPatientList(length, page, order_column, order_desc);
        response && Promise.all([
            setPatientList(response.patients),
            setTotalLength(response.totalLength),
            setPage(response.page)
        ])
    }

    const sortColumn = (column, desc) => {
        setOrder_column(column);
        setOrder_desc(desc);
        callGetPatientListAPI(length, 1, column, desc);
    }

    const columnArr = [
        'personID',
        'age',
        'birthDatetime',
        'gender',
        'ethnicity',
        'race',
        'isDeatth'
    ]

    return (
        !patientList ? 'Loading...' :
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            {columnArr.map(column => <th key={column}>{column}</th>)}
                        </tr>

                        <tr>
                            <td></td>
                            {
                                columnArr.map(column => (
                                    <td key={column}>
                                        <span onClick={() => sortColumn(column, true)}>
                                            {
                                                order_column === column && order_desc === true ?
                                                    '▼' : '▽'
                                            }
                                        </span>
                                        <span onClick={() => sortColumn(column, false)}>
                                            {
                                                order_column === column && order_desc === false ?
                                                    '▲' : '△'
                                            }
                                        </span>
                                    </td>
                                ))
                            }
                        </tr>


                    </thead>

                    <tbody>
                        {
                            patientList &&
                            patientList.map((patient, index) => (
                                <tr key={patient.personID} onClick={e => console.log(patient.personID)}>
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