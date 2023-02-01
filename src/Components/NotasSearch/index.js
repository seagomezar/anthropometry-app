import React from 'react';
import './NotasSearch.css';

function NotasSearch({searchValue, setSearchValue, loading}) {
    const onSearchValueChange = (event) =>{
        console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    return (
     <input 
        className="NotasSearch" 
        placeholder="tareas" 
        value={searchValue}
        onChange={onSearchValueChange}
        disabled={loading}
      />
    );
}

export {NotasSearch};