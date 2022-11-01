import React from 'react';
import css from './Project.module.css';
import ProjectImage from '../ProjectImage';
import BaseLayout from '../BaseLayout';
import ProjectText from '../ProjectText';

export default function Project( {
  slug,
  title,
  headline,
  images,
  text,
  roles,
  links,
} ) {
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

        <ProjectText text={ text } />

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