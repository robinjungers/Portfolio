import css from './ProjectImage.module.css';
import React from 'react';
import classnames from 'classnames';
import useScrollPosition from '@/hooks/useScrollPosition';

export default function ProjectImage( {
  url,
  width,
  height,
  alt,
  color1,
  color2,
} ) {
  const image = React.useRef( null );

  const [isLoaded, setIsLoaded] = React.useState( false );
  const [isVisible, setIsVisible] = React.useState( false );

  React.useEffect( () => {
    setIsLoaded( image.current.complete );
  }, [] );

  useScrollPosition( () => {
    const rect = image.current.getBoundingClientRect();

    setIsVisible(
      rect.top < 0.75 * window.innerHeight &&
      rect.bottom > 0.1 * window.innerHeight
    );
  }, [] );

  return (
    <div className={ css['Container'] }>
      <div className={ css['Frame'] } style={{
        backgroundColor : color1,
      }}>
        <div className={ css['Inner'] } style={{
          backgroundColor : color2,
        }}>
          <img
            className={ classnames( {
              [css['Image']] : true,
              [css['Image-Active']] : isLoaded && isVisible,
            } ) }
            ref={ image }
            alt={ alt }
            src={ url }
            width={ width }
            height={ height }
            onLoad={ () => setIsLoaded( true ) }
          />
        </div>
      </div>
    </div>
  );
}