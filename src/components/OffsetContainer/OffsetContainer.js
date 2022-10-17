import css from './OffsetContainer.module.css';
import classnames from 'classnames';
import useElementSize from '@/hooks/useElementSize';
import { lerp } from '@/lib/utils';
import React from 'react';

export default function OffsetContainer( {
  children,
  className,
  innerClassName,
  randomValue,
  randomMin = -1.0,
  randomMax = 1.0,
} ) {
  const container = React.useRef( null );
  const containerWidth = useElementSize( container )[0];

  const content = React.useRef( null );
  const contentWidth = useElementSize( content )[0];

  const offsetRange = 0.5 * ( containerWidth - contentWidth );
  const offset = lerp( randomValue, randomMin, randomMax, -offsetRange, offsetRange );

  return (
    <div className={ classnames( css['Container'], className ) } ref={ container }>
      <div className={ classnames( css['Inner'], innerClassName ) } ref={ content } style={{
        left : `${ offset }px`,
      }}>
        { children }
      </div>
    </div>
  );
}