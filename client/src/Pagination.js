import React, { useState } from 'react';

const Pagination = (props) => {
    const {
        callGetPatientListAPI,
        totalLength,
        page,
        length,
        setLength,
        order_column
    } = props;

    const [newLength, setNewLength] = useState(length);
    const [shownPagination, setShownPagination] = useState(Math.floor((page - 1) / 10) * 10);

    const changeLength = e => {
        e.preventDefault();
        let value = e.target[0].value;

        if (!value || value === '0') value = length;
        else value = parseInt(value);

        setLength(value);
        callGetPatientListAPI(value, 1, order_column);
    }

    const validatNumber = e => setNewLength(Math.min(e.target.value.replace(/[^0-9]/g, ''), totalLength));

    const pagination = () => {
        let arr = [];
        const lastPage = Math.ceil(totalLength / length);

        shownPagination !== 0 && arr.push(
            <li
                key='prev'
                onClick={() => {
                    setShownPagination(shownPagination - 10);
                    callGetPatientListAPI(length, shownPagination - 9, order_column);
                }}
            >
                ←
            </li>
        )

        for (let i = shownPagination; i < Math.min(shownPagination + 10, lastPage); i++) {
            arr.push(
                <li
                    key={i}
                    onClick={() => callGetPatientListAPI(length, i + 1, order_column)}
                    style={{
                        color: i + 1 === page ? 'blue' : null,
                        textDecoration: i + 1 === page ? 'underline' : null
                    }}
                >
                    {i + 1}
                </li>
            );
        }

        shownPagination + 10 <= lastPage && arr.push(
            <li
                key='next'
                onClick={() => {
                    setShownPagination(shownPagination + 10);
                    callGetPatientListAPI(length, shownPagination + 11, order_column);
                }}
            >
                →
            </li>
        )

        return arr;
    };

    return (
        <div className='pagination'>
            <form onSubmit={changeLength}>
                <input
                    type="text"
                    onChange={validatNumber}
                    value={newLength}
                />
                <span style={{ margin: '0px 10px' }}> / {totalLength}</span>
                <button type='submit'>변경</button>
            </form>
            <ul>
                {pagination()}
            </ul>
        </div>
    )
}

export default Pagination;