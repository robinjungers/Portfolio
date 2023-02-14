import css from './ProjectImage.module.css';
import { ReactElement, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { ProjectImageInfo } from '@/interfaces';

export type ProjectImgProps = {
  info : ProjectImageInfo;
}

export default function ProjectImage( props : ProjectImgProps ) : ReactElement {
  const image = useRef<HTMLImageElement>( null );

  const [isLoaded, setIsLoaded] = useState<boolean>( false );

  useEffect( () => {
    setIsLoaded( image.current.complete );
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
              [css['Image-Active']] : isLoaded,
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