import React from 'react';
import './NotasLoading.css';

function NotasLoading() {
  return (
    <div className="LoadingNotas-container">
      <span className="LoadingNotas-completeIcon"></span>
      <p className="LoadingNotas-text">Cargando NOTAS...</p>
      <span className="LoadingNotas-deleteIcon"></span>
    </div>
  );
}

export { NotasLoading };