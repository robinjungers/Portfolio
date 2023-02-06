import { wait } from "@/lib/utils";
import { useEffect } from "react";

type DynamicIntervalCb = ( iter : number ) => number;

export default function useDynamicInterval( cb : DynamicIntervalCb, deps : any[] ) {
  useEffect( () => {
    let isActive = true;
    let iter = 0;

    ( async () => {
      while ( isActive ) {
        const nextDuration = cb( iter );

        if ( nextDuration > 0 ) {
          await wait( nextDuration );
        } else {
          isActive = false;
        }
      }
    } )();

    return () => {
      isActive = false;
    };
  }, deps )
}