import React from 'react';
import { useLocalStorage } from './useLocalStorage';

function useNotas(){
    const {
        item: notas,
        saveItem: saveNotas,
        sincronizeItem: sincronizeNotas,
        loading,
        error,
      } = useLocalStorage('Notas.V1', []);
      const [searchValue, setSearchValue] = React.useState('');
      const [openModal, setOpenModal] = React.useState(false);

      const completedNotas = notas.filter(notas => !!notas.completed).length;
    const totalNotas = notas.length;
    
    let searchedNotas = [];
    
    if (!searchValue.length >= 1) {
      searchedNotas = notas;
    } else{
      searchedNotas = notas.filter(nota => {
        const notatext = nota.text.toLowerCase();
        const searchtext = searchValue.toLowerCase();
        return notatext.includes(searchtext);
      })
    }
    
    const addNotas = (text) => {
      const newNotas = [...notas]
      newNotas.push({
        completed: false,
        text,
      })
      saveNotas(newNotas);
     };
    
    const completeNota = (text) => {
     const NotaIndex = notas.findIndex(nota => nota.text === text);
     const newNotas = [...notas]
     newNotas [NotaIndex].completed = true;
     saveNotas(newNotas);
    };
    
    const deleteNota = (text) => {
      const NotaIndex = notas.findIndex(nota => nota.text === text);
      const newNotas = [...notas]
      newNotas.splice(NotaIndex, 1);
      saveNotas(newNotas);
     };

    return {
        error,
        loading,
        totalNotas,
        completedNotas,
        searchValue,
        setSearchValue,
        searchedNotas,
        addNotas,
        completeNota,
        deleteNota,
        openModal,
        setOpenModal,
        sincronizeNotas,
     };
}

export { useNotas };