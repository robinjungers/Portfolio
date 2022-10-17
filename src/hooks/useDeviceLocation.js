// React
import { useState, useEffect, useCallback, useRef } from 'react';

export default function useDeviceLocation() {
	const [location, setLocation] = useState( {
		latitude : 0.0,
		longitude : 0.0,
	} );

	const id = useRef();
	const callbacks = useRef( {
		onPositionError : ( error ) => { throw error; },
		onPositionSuccess : ( position ) => {
			setLocation( {
				latitude  : position.coords.latitude,
				longitude : position.coords.longitude,
			} );
		},
	} );

	const start = useCallback( () => {
		const options = {
			enableHighAccuracy : true,
			timeout : 5000,
			maximumAge : 0
		};

		id.current = navigator.geolocation.watchPosition(
			callbacks.current.onPositionSuccess,
			callbacks.current.onPositionError,
			options );
	}, [] );

	useEffect( () => () => {
		navigator.geolocation.clearWatch( id.current );
	}, [] );

	return [location, start];
}