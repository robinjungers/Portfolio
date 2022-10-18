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
  const offsets = useNoiseValues( texts.length + 2, 1.0 );
  const angles = useNoiseValues( texts.length, 1.0 );

  return (
    <BaseLayout
      isProject={ true }
      titleNoiseValue={ offsets[0] }
    >
      <div className={ css['Intro'] }>
        <OffsetContainer
          className={ css['Title'] }
          randomValue={ offsets[1] }
          leftAlignOnMedium={ false }
          leftAlignOnSmall={ true }
        >
          <h4>
            { title }
          </h4>
        </OffsetContainer>

        <div className={ css['Texts'] }>
          { texts.map( ( text, i ) => (
            <OffsetContainer
              className={ css['Text'] }
              randomValue={ offsets[i + 2] }
              key={ i }
            >
              <p style={{
                transform : `rotate(${3.0 * angles[i]}deg)`,
              }}>
                { text }
              </p>
            </OffsetContainer>
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