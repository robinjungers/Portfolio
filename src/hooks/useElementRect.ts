import { RefObject, useEffect, useState } from "react";


export default function useElementRect( ref : RefObject<HTMLElement> ) {
  const [rect, setRect] = useState( new DOMRect() );

  useEffect( () => {
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