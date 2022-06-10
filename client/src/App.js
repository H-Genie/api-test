import React, { useEffect, useState, useContext, useCallback } from 'react';
import dayjs from 'dayjs';
import { getPatientList } from './API/API';
import './App.css';
import Pagination from './sections/Pagination';

import Sorting from './sections/Sorting';
import Filtering from './sections/Filtering';
import Patient from './sections/Patient';
import { PaginationContext } from './context/PaginationContext';

const App = () => {
    const {
        setPage,
        length,
        order_column,
        order_desc,
        setTotalLength,
        setShownPagination,
        filters
    } = useContext(PaginationContext);
    const [isOpenedSorting, setIsOpenedSorting] = useState(false);
    const [isOpenedFiltering, setIsOpenedFiltering] = useState(false)

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

    const toggleSorting = () => setIsOpenedSorting(!isOpenedSorting);
    const toggleFiltering = () => setIsOpenedFiltering(!isOpenedFiltering);
    const toggleDisplay = personID => {
        const isOpened = document.getElementById(personID).style.display;
        if (isOpened === 'none') document.getElementById(personID).style.display = "table-row";
        else document.getElementById(personID).style.display = "none";
    }

    const columnArr = [
        'personID',
        'age',
        'birthDatetime',
        'gender',
        'ethnicity',
        'race',
        'isDeath'
    ]

    return (
        !patientList ? 'Loading...' :
            <div className='table-container'>
                <div className='button-container'>
                    <button onClick={toggleSorting}>정렬</button>
                    <button onClick={toggleFiltering}>필터</button>
                    <button onClick={resetAPI}>초기화</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            {columnArr.map(column => <th key={column} className={column}>{column}</th>)}
                        </tr>

                        {
                            isOpenedSorting &&
                            <tr style={{ backgroundColor: '#eee' }}>
                                <th></th>
                                <Sorting
                                    callGetPatientListAPI={callGetPatientListAPI}
                                    columnArr={columnArr}
                                />
                            </tr>
                        }

                        {
                            isOpenedFiltering &&
                            <tr style={{ backgroundColor: '#eee' }}>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <Filtering />
                            </tr>
                        }
                    </thead>

                    <tbody>
                        {
                            patientList &&
                            patientList.map((patient, index) => (
                                <React.Fragment key={patient.personID}>
                                    <tr onClick={() => toggleDisplay(patient.personID)}>
                                        <td>{index + 1}</td>
                                        <td>{patient.personID}</td>
                                        <td>{patient.age}</td>
                                        <td>{dayjs(patient.birthDatetime).format("YYYY-MM-DD")}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.ethnicity}</td>
                                        <td>{patient.race}</td>
                                        <td>{patient.isDeath ? "Y" : "N"}</td>
                                    </tr>
                                    <Patient personID={patient.personID} />
                                </React.Fragment>
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