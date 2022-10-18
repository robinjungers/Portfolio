import css from './ProjectImage.module.css';
import React from 'react';
import chroma from 'chroma-js';

export default function ProjectImage( {
  url,
  width,
  height,
  alt,
  color1,
  color2,
} ) {
  let imageWidth;
  let imageHeight;

  if ( width / height > 1.0 ) {
    imageWidth = null;
    imageHeight = 'auto';
  } else {
    imageWidth = 'auto';
    imageHeight = null;
  }

  return (
    <div className={ css['Container'] }>
      <div className={ css['Frame'] } style={{
        backgroundColor : color1,
      }}>
        <div className={ css['Toolbar'] } style={{
          backgroundColor : color2,
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
            width : imageWidth,
            height : imageHeight,
          }}
        />
      </div>
    </div>
  );
}