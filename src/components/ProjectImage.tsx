import css from './ProjectImage.module.css';
import { ReactElement, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import useScrollPosition from '@/hooks/useScrollPosition';
import { ProjectImageInfo } from '@/interfaces';

export type ProjectImgProps = {
  info : ProjectImageInfo;
}

export default function ProjectImage( props : ProjectImgProps ) : ReactElement {
  const image = useRef<HTMLImageElement>( null );

  const [isLoaded, setIsLoaded] = useState<boolean>( false );
  const [isVisible, setIsVisible] = useState<boolean>( false );

  useEffect( () => {
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
        backgroundColor : props.info.color1,
      }}>
        <div className={ css['Inner'] } style={{
          backgroundColor : props.info.color2,
        }}>
          <img
            className={ classnames( {
              [css['Image']] : true,
              [css['Image-Active']] : isLoaded && isVisible,
            } ) }
            ref={ image }
            alt={ props.info.alt }
            src={ props.info.largeUrl }
            width={ props.info.largeWidth }
            height={ props.info.largeHeight }
            onLoad={ () => setIsLoaded( true ) }
          />
        </div>
      </div>
    </div>
  );
}