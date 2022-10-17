import React from 'react';
import css from './Project.module.css';
import ProjectImage from '../ProjectImage';
import useNoiseValues from '@/hooks/useNoiseValues';
import BaseLayout from '../BaseLayout';

export default function Project( {
  slug,
  title,
  headline,
  images,
} ) {
  const offsets = useNoiseValues( 4 );

  return (
    <BaseLayout
      isProject={ true }
      titleNoiseValue={ offsets[0] }
      roleNoiseValue1={ offsets[1] }
      roleNoiseValue2={ offsets[2] }
      pageTitle={ title }
      pageTitleNoiseValue={ offsets[3] }
    >
      <div className={ css['Container'] }>
        <ul className={ css['Images'] }>
          { images.map( ( image, i ) => (
            <li className={ css['Image'] } key={ i }>
              <ProjectImage
                url={ image.largeUrl }
                alt={ image.alt }
                width={ image.largeWidth }
                height={ image.largeHeight }
                colors={ image.colors }
              />
            </li>
          ) ) }
        </ul>
      </div>
    </BaseLayout>
  )
}