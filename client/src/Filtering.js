import React, { useState } from 'react';
import RadioBox from './RadioBox';
import CheckBox from './CheckBox';
import { genders, races, ethnicities, deaths } from './Data';

const Filtering = () => {
    const [filters, setFilters] = useState({
        gender: "",
        race: [],
        ethnicity: "",
        age_min: "",
        age_max: "",
        death: ""
    });

    const handleFilters = (paramFilters, category) => {
        setFilters({
            ...filters,
            [category]: paramFilters
        })
    }
    console.log(filters)

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