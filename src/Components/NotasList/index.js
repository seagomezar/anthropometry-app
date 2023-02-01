import React from 'react';
import './NotasList.css'

function Notaslist(props) {
    const renderFunc = props.children || props.render;

    return (
        <section className="NotasList-container">
        {props.error && props.onError()}
        {props.loading && props.onLoading()}
  
        {(!props.loading && !props.totalNotas) && props.onEmptyNotas()}

        {(!!props.totalNotas && !props.searchedNotas.length) && props.onEmptySearchResults(props.searchText)}

        {(!props.loading && !props.error) && props.searchedNotas.map(renderFunc)}
        </section>
    );
}

export {Notaslist}