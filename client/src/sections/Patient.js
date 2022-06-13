import React, { useEffect, useState, useCallback } from 'react';
import { getPatientBrief } from '../API/API';

const Patient = ({ personID, toggle }) => {
    const [conditionList, setConditionList] = useState(null);
    const [visitCount, setVisitCount] = useState(null);
    const [isOpened, setIsOpened] = useState(false);

    const callPatientBriefAPI = useCallback(async () => {
        await getPatientBrief(personID)
            .then(res => {
                setConditionList(res.conditionList);
                setVisitCount(res.visitCount)
            });
    }, [personID]);

    useEffect(() => {
        if (toggle && !isOpened) setIsOpened(true)
        if (toggle && isOpened) callPatientBriefAPI();
    }, [callPatientBriefAPI, isOpened, toggle]);

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