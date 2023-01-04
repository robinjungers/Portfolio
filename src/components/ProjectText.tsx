import useNoiseValues from '@/hooks/useNoiseValues';
import useWindowSize from '@/hooks/useWindowSize';
import { makeCSSTransform } from '@/lib/utils';
import React, { ReactElement } from 'react';
import css from './ProjectText.module.css';

function countWordsForChars( words : string[], n : number ) : number {
  let i = 0;
  let m = 0;

  for ( ; i < words.length; ++ i ) {
    m += words[i].length;

    if ( m >= n ) {
      return i;
    }
  }

  return i;
}

function divideTextIntoEvenLines( text : string, charsPerLine : number ) : string[] {
  const words = text.split( ' ' );
  const lines = [];

  while ( words.length > 0 ) {
    const lineEnd = countWordsForChars( words, charsPerLine );
    const lineRest = words.length - lineEnd;
    const lineEndCorrected = ( lineRest === 2 || lineRest === 1 )
        ? lineEnd - 2
        : lineEnd;
    const newWords = words.splice( 0, lineEndCorrected );
    const newLine = newWords.join( ' ' );

    lines.push( newLine );
  }

  return lines;
}

export type ProjectTextProps = {
  text : string;
}

export default function ProjectText( props : ProjectTextProps ) : ReactElement {
  const maxWidth = useWindowSize()[0];
  const maxSpan = maxWidth > 900 ? 0.05 * maxWidth : 0.0;

  const lines = React.useMemo( () => {
    const charsPerLine =
      maxWidth > 900 ? 60 :
      maxWidth > 600 ? 50 : 40;
    
    return divideTextIntoEvenLines( props.text, charsPerLine );
  }, [
    props.text,
    maxWidth,
  ] );

  const randomOffsets = useNoiseValues( lines.length, 0.1 );
  const randomAngles = useNoiseValues( lines.length, 0.1 );

  return (
    <p className={ css['Lines'] }>
      { lines.map( ( line, i ) => (
        <span
          key={ i }
          className={ css['Line'] } style={{
            transform : makeCSSTransform(
              randomOffsets[i] * maxSpan,
              randomAngles[i] * 3.0,
            ),
          }}
        >
          { line }
        </span>
      ) ) }
    </p>
  );
}