import React from 'react';

function NotasHeader({ children, loading }) {
  return (
    <header>
       {
        React.Children
          .toArray(children)
          .map(child => React.cloneElement(child, { loading }))
      }
    </header>
  );
}

export { NotasHeader };