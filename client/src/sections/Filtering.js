import React, { useContext } from 'react';
import RadioBox from '../utils/RadioBox';
import CheckBox from '../utils/CheckBox';
import FilteringAge from './FilteringAge';
import { PaginationContext } from '../context/PaginationContext';

const Filtering = () => {
    const {
        filters,
        setFilters,
        genders,
        races,
        ethnicities
    } = useContext(PaginationContext);

    const handleFilters = (paramFilters, category) => {
        setFilters({
            ...filters,
            [category]: paramFilters
        });
    }

    return (
        <>
            <th>
                <FilteringAge />
            </th>
            <th></th>
            <th>
                <RadioBox
                    category="gender"
                    list={genders}
                    handleFilters={handleFilters}
                />
            </th>
            <th>
                <RadioBox
                    category="ethnicity"
                    list={ethnicities}
                    handleFilters={handleFilters}
                />
            </th>
            <th>
                <CheckBox
                    category="race"
                    list={races}
                    handleFilters={handleFilters}
                />
            </th>
            <th>
                <RadioBox
                    category="death"
                    list={[
                        {
                            "key": 1,
                            "value": "Y"
                        },
                        {
                            "key": 2,
                            "value": "N"
                        }
                    ]}
                    handleFilters={handleFilters}
                />
            </th>
        </>
    )
}

export default Filtering;