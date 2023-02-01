import React from 'react';
import './NotasCounter.css';

function NotasCounter({totalNotas, completedNotas, loading}) {

    return (
        <h2
      className={`NotasCounter ${!!loading && "NotasCounter--loading"}`}
    >
      Has completado {completedNotas} de {totalNotas} Notas
    </h2>
    );
}

export {NotasCounter};