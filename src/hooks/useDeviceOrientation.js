// React
import { useState, useEffect, useCallback, useRef } from 'react';

export default function useDeviceOrientation() {
	const [heading, setHeading] = useState( 0.0 );

	const callbacks = useRef( {
		onOrientation : ( event ) => console.log( event ),
	} );

	const start = useCallback( async () => {
		const status = await DeviceMotionEvent.requestPermission();
		
		if ( status === 'granted' ) {
			window.addEventListener( 'deviceorientation', callbacks.current.onOrientation );
		} else {
			throw 'Orientation not granted';
		}
	}, [] );

	useEffect( () => () => {
		window.removeEventListener( 'deviceorientation', callbacks.current.onOrientation );
	}, [] );

	return [heading, start];
}