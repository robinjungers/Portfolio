import React from 'react';

export default function useElementSize( ref ) {
  const [size, setSize] = React.useState( [0.0, 0.0] );

  React.useEffect( () => {
    const observer = new ResizeObserver( () => {
      const rect = ref.current.getBoundingClientRect();

      setSize( [
        rect.width,
        rect.height,
      ] );
    } );

    observer.observe( ref.current );
    return () => {
      observer.disconnect();
    };
  }, [] );

  return size;
}