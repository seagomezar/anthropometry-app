import React from 'react';

function useStorageListener(sincronize) {
    const [storageChange, setStorageChange] = React.useState(false);
    
    window.addEventListener('storage', (change) => {
        if (change.key === 'Notas.V1') {
          console.log('Hubo cambios en Notas.V1');
          setStorageChange(true);
        }
      });
  
      const toggleShow = () => {
        sincronize();
        setStorageChange(false);
      };
  
      return {
        show: storageChange,
        toggleShow,
      };
    }

export { useStorageListener };