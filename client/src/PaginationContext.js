import React, { createContext, useState } from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [length, setLength] = useState(10);
    const [order_column, setOrder_column] = useState(null);
    const [order_desc, setOrder_desc] = useState(true);

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
            setFilters
        }}
    >
        {children}
    </PaginationContext.Provider>
}