import React from 'react';
import css from './Project.module.css';
import ProjectImage from '../ProjectImage';
import useNoiseValues from '@/hooks/useNoiseValues';
import BaseLayout from '../BaseLayout';
import OffsetContainer from '../OffsetContainer';

export default function Project( {
  slug,
  title,
  headline,
  images,
  texts,
  roles,
} ) {
  const angles = useNoiseValues( texts.length, 0.1 );

  return (
    <BaseLayout isProject={ true }>
      <div className={ css['Intro'] }>
        <h4 className={ css['Title'] }>
          { title }
        </h4>

        <div className={ css['Texts'] }>
          { texts.map( ( text, i ) => (
            <p className={ css['Text'] } style={{
              transform : `rotate(${3.0 * angles[i]}deg)`,
            }}>
              { text }
            </p>
          ) ) }
        </div>
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