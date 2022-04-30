import React from 'react';
import axios from 'axios';

const App = () => {
    axios.get(`http://localhost:5000/patient`)
        .then(res => console.log(res.data))

    return (
        <>
        </>
    )
}

export default App;