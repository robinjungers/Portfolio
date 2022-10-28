import React from 'react';
import css from './Project.module.css';
import ProjectImage from '../ProjectImage';
import useNoiseValues from '@/hooks/useNoiseValues';
import BaseLayout from '../BaseLayout';
import useWindowSize from '@/hooks/useWindowSize';

function cleanEndWrapping( text ) {
  const n = 3;
  const words = text.split( ' ' );
  const textStart = words.slice( 0, -n ).join( ' ' );
  const textEnd = words.slice( -n ).join( '\u00A0' );

  return `${ textStart } ${ textEnd }`;
}

function makeTransform( offset, angle ) {
	return `translateX(${ offset }px) rotateZ(${ angle }deg)`;
}

export default function Project( {
  slug,
  title,
  headline,
  images,
  text,
  roles,
  links,
} ) {
  const maxWidth = useWindowSize()[0];
  const maxSpan = maxWidth > 900 ? 0.05 * maxWidth : 0.0;

  const lines = React.useMemo( () => {
    const words = text.split( ' ' );
    const lineLength =
      maxWidth > 900 ? 9 :
      maxWidth > 600 ? 6 : 5;
    const lines = [];

    while ( words.length > 0 ) {
      const n = ( words.length - lineLength === 1 )
        ? lineLength + 1
        : lineLength;
      const newWords = words.splice( 0, n );
      const newLine = newWords.join( ' ' );

      lines.push( newLine );
    }

    return lines;
  }, [
    text,
    maxWidth,
  ] );

  const randomOffsets = useNoiseValues( lines.length, 0.1 );
  const randomAngles = useNoiseValues( lines.length, 0.1 );

  return (
    <BaseLayout
      isProject={ true }
      pageTitle={ title }
			pageDescription={ headline }
    >
      <div className={ css['Intro'] }>
        <h4 className={ css['Title'] }>
          { title }
        </h4>

        <p className={ css['Lines'] }>
          { lines.map( ( line, i ) => (
            <span
              key={ i }
              className={ css['Line'] } style={{
                transform : makeTransform(
									randomOffsets[i] * maxSpan,
									randomAngles[i] * 3.0,
								),
              }}
            >
              { cleanEndWrapping( line ) }
            </span>
          ) ) }
        </p>

        { links && (
          <div className={ css['Links'] }>
            { links.map( ( link, i ) => (
              <a
                className={ css['Link'] }
                key={ i }
                href={ link.url }
                target="_blank"
              >
                { link.title }
              </a>
            ) ) }
          </div>
        ) }
      </div>

      <div className={ css['Container'] }>
        <ul className={ css['Images'] }>
          { images.map( ( image, i ) => (
            <li className={ css['Image'] } key={ i }>
              <ProjectImage
                url={ image.largeUrl }
                alt={ image.alt }
                width={ image.largeWidth }
                height={ image.largeHeight }
                color1={ image.color1 }
                color2={ image.color2 }
              />
            </li>
          ) ) }
        </ul>
      </div>
    </BaseLayout>
  )
}