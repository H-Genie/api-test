import React, { useEffect, useState, useContext, useCallback } from 'react';
import dayjs from 'dayjs';
import { getPatientList } from './API/API';
import './App.css';
import Pagination from './Pagination';

import Filtering from './sections/Filtering';
import { PaginationContext } from './context/PaginationContext';

const App = () => {
    const {
        setPage,
        length,
        order_column,
        setOrder_column,
        order_desc,
        setOrder_desc,
        setTotalLength,
        setShownPagination,
        filters
    } = useContext(PaginationContext);

    const [patientList, setPatientList] = useState(null);
    const callGetPatientListAPI = useCallback(
        async (length, page, order_column, order_desc, filters) => {
            const response = await getPatientList(length, page, order_column, order_desc, filters);
            response && Promise.all([
                setPatientList(response.patients),
                setTotalLength(response.totalLength),
                setPage(response.page)
            ]);
        }, [setPage, setTotalLength]
    );

    useEffect(() => {
        callGetPatientListAPI(length, 1, order_column, order_desc, filters);
        setShownPagination(0);
    }, [
        callGetPatientListAPI,
        filters,
        length,
        order_column,
        order_desc,
        setShownPagination
    ]);

    const sortColumn = (column, desc) => {
        setOrder_column(column);
        setOrder_desc(desc);
        callGetPatientListAPI(length, 1, column, desc, filters);
        setShownPagination(0);
    }

    const resetAPI = () => {
        const resetFilters = {
            gender: "",
            race: [],
            ethnicity: "",
            age_min: "",
            age_max: "",
            death: ""
        }
        callGetPatientListAPI(10, 1, null, true, resetFilters);
        setShownPagination(0);
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
                <Filtering />
                <button onClick={resetAPI}>초기화</button>
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
                />
            </div>
    )
}

export default App;