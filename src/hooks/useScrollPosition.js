import React from 'react';

export default function useScrollPosition( onScroll, deps ) {
  React.useEffect( () => {
    const onScroll_ = () => {
      const y = document.documentElement.scrollTop;
      const x = document.documentElement.scrollLeft;

      onScroll( y, x );
    };

    document.addEventListener( 'scroll', onScroll_ );
    return () => {
      document.removeEventListener( 'scroll', onScroll_ );
    };
  }, deps );
}