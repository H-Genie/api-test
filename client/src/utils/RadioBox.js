import React from 'react';

const RadioBox = ({ category, list, handleFilters }) => {
    const renderRadioboxLists = () => list && list.map(item => (
        <div key={item.key}>
            <input
                type="radio"
                value={item.value}
                id={item.value}
                name={category}
            />
            <label htmlFor={item.value}>
                {item.value}
            </label>
        </div>
    ));

    const handleChange = e => handleFilters(e.target.value, category);

    return (
        <form onChange={handleChange}>
            {renderRadioboxLists()}
        </form>
    )
}

export default RadioBox;