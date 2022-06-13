import React, { createContext, useState, useEffect } from 'react';
import { getGenderList, getRaceList, getEthnicityList } from '../API/API';

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
    useEffect(() => {
        callListAPI();
    }, []);

    // Pagination
    const [page, setPage] = useState(1);
    const [length, setLength] = useState(10);
    const [order_column, setOrder_column] = useState(null);
    const [order_desc, setOrder_desc] = useState(null);

    const [totalLength, setTotalLength] = useState(null);
    const [newLength, setNewLength] = useState(10);
    const [shownPagination, setShownPagination] = useState(0);
    const [filters, setFilters] = useState({
        gender: "",
        race: [],
        ethnicity: "",
        age_min: "",
        age_max: "",
        death: ""
    });

    // filtering
    const [genders, setGenders] = useState(null);
    const [races, setRaces] = useState(null);
    const [ethnicities, setEthnicities] = useState(null);

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

    // Toggle
    const [toggledPatient, setToggledPatient] = useState([]);

    return <PaginationContext.Provider
        value={{
            page,
            setPage,
            length,
            setLength,
            order_column,
            setOrder_column,
            order_desc,
            setOrder_desc,
            totalLength,
            setTotalLength,
            newLength,
            setNewLength,
            shownPagination,
            setShownPagination,
            filters,
            setFilters,
            genders,
            races,
            ethnicities,
            toggledPatient,
            setToggledPatient
        }}
    >
        {children}
    </PaginationContext.Provider>
}