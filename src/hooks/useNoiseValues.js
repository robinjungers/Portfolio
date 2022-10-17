import { createNoise2D } from 'simplex-noise';
import { times } from '@/lib/utils';
import React from 'react';

export default function useNoiseValues( count, factor = 0.2 ) {
	const [values, setValues] = React.useState( times( count, () => 0.0 ) );

  React.useEffect( () => {
		const noise = createNoise2D();
		const values = times( count, i => noise( 1.0, factor * i ) );

		setValues( values );
	}, [] );

	return values;
}