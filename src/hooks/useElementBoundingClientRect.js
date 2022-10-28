import React from 'react';

export default function useElementSize( ref ) {
  const [rect, setRect] = React.useState( new DOMRect() );

  React.useEffect( () => {
    const observer = new ResizeObserver( () => {
      const rect = ref.current.getBoundingClientRect();

      setRect( rect );
    } );

    observer.observe( ref.current );
    return () => {
      observer.disconnect();
    };
  }, [] );

  return rect;
}