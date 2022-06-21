import React, { useState } from 'react';

const CheckBox = ({ category, list, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const renderCheckboxLists = () => list && list.map(item => (
        <div key={item.key}>
            <input
                type="checkbox"
                value={item.value}
                id={item.value}
                onChange={() => handleToggle(item.value)}
            />
            <label htmlFor={item.value}>
                {item.value}
            </label>
        </div>
    ));

    const handleToggle = value => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        handleFilters(newChecked, category);
    }

    return (
        <form>
            {renderCheckboxLists()}
        </form>
    )
}

export default CheckBox;