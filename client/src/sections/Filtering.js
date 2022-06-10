import React, { useContext, useEffect, useState } from 'react';
import { getGenderList, getRaceList, getEthnicityList } from '../API/API';
import RadioBox from './RadioBox';
import CheckBox from './CheckBox';
import { PaginationContext } from '../context/PaginationContext';

const Filtering = () => {
    const {
        filters,
        setFilters
    } = useContext(PaginationContext);

    const [genders, setGenders] = useState(null);
    const [races, setRaces] = useState(null);
    const [ethnicities, setEthnicities] = useState(null);

    useEffect(() => {
        callListAPI();
    }, []);

    const callListAPI = async () => {
        const makeFilterArray = arr => {
            let resultArr = [];
            arr.map((item, index) => (
                resultArr.push({
                    "key": index + 1,
                    "value": item
                })
            ));
            return resultArr;
        }

        await Promise.all([
            getGenderList()
                .then(res => makeFilterArray(res))
                .then(res => setGenders(res)),
            getRaceList()
                .then(res => makeFilterArray(res))
                .then(res => setRaces(res)),
            getEthnicityList()
                .then(res => makeFilterArray(res))
                .then(res => setEthnicities(res))
        ]);
    }

    const handleFilters = (paramFilters, category) => {
        setFilters({
            ...filters,
            [category]: paramFilters
        });
    }

    return (
        <>
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