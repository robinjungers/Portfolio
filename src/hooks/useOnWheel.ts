import { useEffect } from "react";

export default function useOnWheel( cb : ( dx : number, dy : number ) => void, deps : any[] ) {
  useEffect( () => {
    const onWheel = ( e : WheelEvent ) => {
      e.preventDefault();
      
      cb(
        e.deltaX,
        e.deltaY,
      );
    };

    window.addEventListener( 'wheel', onWheel, { passive : false } );
    return () => {
      window.removeEventListener( 'wheel', onWheel );
    };
  }, deps );
}