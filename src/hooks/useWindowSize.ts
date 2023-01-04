import { useEffect, useState } from 'react';

type WindowSizeResult = [number, number];

export default function useWindowSize() : WindowSizeResult {
  const [size, setSize] = useState<WindowSizeResult>( [0, 0] );

  useEffect( () => {
    const onResize = () => {
      setSize( [
        window.innerWidth,
        window.innerHeight,
      ] );
    };

    onResize();

    window.addEventListener( 'resize', onResize );
    return () => {
      window.removeEventListener( 'resize', onResize );
    };
  }, [] );

  return size;
}