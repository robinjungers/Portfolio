import css from './ProjectImage.module.css';
import React from 'react';
import chroma from 'chroma-js';
import { randomInt } from '@/lib/utils';

export default function ProjectImage( {
  url,
  width,
  height,
  alt,
  colors,
} ) {
  const style = React.useMemo( () => {
    const topColors = [...colors].sort( ( a, b ) => b.ratio - a.ratio );
    const topColor = chroma( topColors[0].primary );
    const diffColors = [...colors].sort( ( a, b ) => (
        chroma.contrast( b.primary, topColor ) -
        chroma.contrast( a.primary, topColor ) ) );
    const diffColor1Raw = chroma( diffColors[0].primary );
    const diffColor1 = diffColor1Raw
      .set( 'hsl.s', Math.min( diffColor1Raw.get( 'hsl.s' ), 0.05 ) )
      .set( 'hsl.l', Math.max( diffColor1Raw.get( 'hsl.l' ), 0.75 ) );
    const diffColor2Raw = chroma( diffColors[1].primary );
    const diffColor2 = diffColor2Raw
      .set( 'hsl.s', Math.min( diffColor2Raw.get( 'hsl.s' ), 0.10 ) )
      .set( 'hsl.l', Math.min( diffColor2Raw.get( 'hsl.l' ), 0.25 ) );

    let imageWidth;
    let imageHeight;
    
    if ( width / height > 1.0 ) {
      imageWidth = `${ randomInt( 40, 60 ) }vw`;
      imageHeight = `auto`;
    } else {
      imageWidth = 'auto';
      imageHeight = `${ randomInt( 60, 80 ) }vh`;
    }
    
    return {
      backgroundColor1 : diffColor1.css(),
      backgroundColor2 : diffColor2.css(),
      imageWidth,
      imageHeight,
    };
  }, [
    width,
    height,
    colors,
  ] );

  return (
    <div className={ css['Container'] } style={{
      backgroundColor : style.backgroundColor1,
    }}>
      <div className={ css['Frame'] }>
        <div className={ css['Toolbar'] } style={{
          backgroundColor : style.backgroundColor2,
        }}>
          <div className={ css['Action'] } />
          <div className={ css['Action'] } />
          <div className={ css['Action'] } />
        </div>

        <img
          className={ css['Image'] }
          alt={ alt }
          src={ url }
          width={ width }
          height={ height }
          style={{
            width : style.imageWidth,
            height : style.imageHeight,
          }}
        />
      </div>
    </div>
  );
}