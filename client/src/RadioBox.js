import React from 'react';

const RadioBox = ({ category, list, handleFilters }) => {
    const renderRadioboxLists = () => list && list.map(item => (
        <React.Fragment key={item.key}>
            <input
                type="radio"
                value={item.value}
                id={item.key}
            />
            <label htmlFor={item.value}>
                {item.value}
            </label>
        </React.Fragment>
    ));

    const handleChange = e => handleFilters(e.target.value, category);

    return (
        <form onChange={handleChange}>
            {renderRadioboxLists()}
        </form>
    )
}

export default RadioBox;