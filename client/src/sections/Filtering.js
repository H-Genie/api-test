import React, { useContext } from 'react';
import RadioBox from './RadioBox';
import CheckBox from './CheckBox';
import { PaginationContext } from '../context/PaginationContext';
import { genders, races, ethnicities, deaths } from './Data';

const Filtering = () => {
    const {
        filters,
        setFilters
    } = useContext(PaginationContext);

    const handleFilters = (paramFilters, category) => {
        setFilters({
            ...filters,
            [category]: paramFilters
        });
    }

    return (
        <div>
            <RadioBox
                category="gender"
                list={genders}
                handleFilters={handleFilters}
            />
            <CheckBox
                category="race"
                list={races}
                handleFilters={handleFilters}
            />
            <RadioBox
                category="ethnicity"
                list={ethnicities}
                handleFilters={handleFilters}
            />
            <RadioBox
                category="death"
                list={deaths}
                handleFilters={handleFilters}
            />
        </div>
    )
}

export default Filtering;