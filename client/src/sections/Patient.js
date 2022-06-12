import React, { useEffect, useState, useCallback, useContext } from 'react';
import { PaginationContext } from '../context/PaginationContext';
import { getPatientBrief } from '../API/API';

const Patient = ({ personID }) => {
    const [conditionList, setConditionList] = useState(null);
    const [visitCount, setVisitCount] = useState(null);
    const [isOpened, setIsOpened] = useState(false);
    const { toggledPatient } = useContext(PaginationContext)

    const callPatientBriefAPI = useCallback(async () => {
        await getPatientBrief(personID)
            .then(res => {
                setConditionList(res.conditionList);
                setVisitCount(res.visitCount)
            });
    }, [personID]);

    useEffect(() => {
        const checked = toggledPatient.includes(personID);
        if (checked) setIsOpened(true);
        if (checked && isOpened) callPatientBriefAPI();
    }, [callPatientBriefAPI, isOpened, personID, toggledPatient]);

    return (
        <tr id={personID} style={{ display: 'none' }}>
            <td colSpan={8} className="patient-brief">
                <p><b>visit count : {visitCount}</b></p>
                {
                    conditionList &&
                    conditionList.map((list, index) => (
                        <p key={index}>{list}</p>
                    ))
                }
            </td>
        </tr>
    )
}

export default Patient;