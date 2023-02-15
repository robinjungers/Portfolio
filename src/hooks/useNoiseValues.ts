import { createNoise2D } from 'simplex-noise';
import { times } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function useNoiseValues( count : number, factor : number = 0.2 ) : number[] {
	const [values, setValues] = useState<number[]>( times( count, () => 0.0 ) );

  useEffect( () => {
		const noise = createNoise2D();
		const values = times( count, i => noise( 1.0, factor * i ) );

		setValues( values );
	}, [] );

	return values;
}