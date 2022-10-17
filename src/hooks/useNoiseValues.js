import { createNoise2D } from 'simplex-noise';
import { times } from '@/lib/utils';
import React from 'react';

export default function useNoiseValues( count, factor = 0.2 ) {
  return React.useMemo( () => {
		const noiseGen = createNoise2D();

		return times( count, i => noiseGen( 1.0, factor * i ) );
	}, [] );
}