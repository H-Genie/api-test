import React, { useContext } from 'react';
import { PaginationContext } from '../context/PaginationContext';

const Sorting = ({ callGetPatientListAPI, columnArr }) => {
    const {
        setOrder_column,
        setOrder_desc,
        setShownPagination,
        filters,
        length,
        order_column,
        order_desc
    } = useContext(PaginationContext);

    const sortColumn = (column, desc) => {
        setOrder_column(column);
        setOrder_desc(desc);
        callGetPatientListAPI(length, 1, column, desc, filters);
        setShownPagination(0);
    }

    return (
        <>
            {
                columnArr.map(column => (
                    <th key={column}>
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
                    </th>
                ))
            }
        </>
    )
}

export default Sorting;