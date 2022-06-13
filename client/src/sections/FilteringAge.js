import React, { useContext } from 'react';
import { PaginationContext } from '../context/PaginationContext';

const FilteringAge = () => {
    const { filters, setFilters } = useContext(PaginationContext);

    const submitHandler = e => {
        e.preventDefault();
        const age_min = parseInt(e.target[0].value);
        const age_max = parseInt(e.target[1].value);

        setFilters({
            ...filters,
            age_min,
            age_max
        });
    }

    return (
        <form onSubmit={submitHandler} className='age-filter'>
            <div>
                <label htmlFor='min-age'>min</label>
                <input type="text" id='min-age' />
            </div>
            <div>
                <label htmlFor='max-age'>max</label>
                <input type="text" id='max-age' />
            </div>
            <button>검색</button>
        </form >
    )
}

export default FilteringAge;
