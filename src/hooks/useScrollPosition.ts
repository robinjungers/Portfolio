import React from 'react';

type ScrollPositionCallback = ( x : number, y : number ) => void;

export default function useScrollPosition( onScroll : ScrollPositionCallback, deps : any[] ) {
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