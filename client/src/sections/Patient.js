import React, { useEffect, useState, useCallback } from 'react';
import { getPatientBrief } from '../API/API'

const Patient = ({ personID }) => {
    const [conditionList, setConditionList] = useState(null);
    const [visitCount, setVisitCount] = useState(null);

    const callPatientBriefAPI = useCallback(async () => {
        await getPatientBrief(personID)
            .then(res => {
                setConditionList(res.conditionList);
                setVisitCount(res.visitCount)
            });
    }, [personID]);

    useEffect(() => {
        callPatientBriefAPI();
    }, [callPatientBriefAPI]);

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