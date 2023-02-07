import { randomChoice, randomInt, randomTrue } from '@/lib/utils';
import css from './HorizonPage.module.css';
import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
import useDynamicInterval from '@/hooks/useDynamicInterval';
import useToggle from '@/hooks/useToggle';
import classNames from 'classnames';
import HorizonInfo from './HorizonInfo';

const HorizonCanvasNoSSR = dynamic( () => import( './HorizonCanvas' ), {
  ssr : false,
} );

const subtitles = require( 'val-loader!./subtitles/all.eval.cjs' ) as string[];

export default function HorizonPage() : ReactElement {
  const [highQuality, setHighQuality] = useState<boolean>( false );
  const [openInfo, setOpenInfo] = useState<boolean>( false );
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>( null );

  useDynamicInterval( () => {
    const nextSubtitle = randomTrue( 0.5 ) ? randomChoice( subtitles ) : null;
    const nextPauseDuration = randomInt( 5e3, 30e3 );
          
    setCurrentSubtitle( nextSubtitle );

    return nextPauseDuration;
  }, [] );

  return (
    <div className={ css['Container'] }>
      <HorizonCanvasNoSSR
        dpi={ highQuality ? 0.5 : 0.2 }
      />

      { currentSubtitle && (
        <div className={ css['Subtitle'] }>
          <span>
            { currentSubtitle }
          </span>
        </div>
      ) }

      <button
        className={ classNames( {
          [css['Button']] : true,
          [css['Button-Quality']] : true,
          [css['Button-Active']] : highQuality,
        } ) }
        onClick={ () => setHighQuality( !highQuality ) }
      >
        { highQuality
          ? 'High'
          : 'Low' }
      </button>

      <button
        className={ classNames( {
          [css['Button']] : true,
          [css['Button-Info']] : true,
          [css['Button-Active']] : openInfo,
        } ) }
        onClick={ () => setOpenInfo( !openInfo ) }
      >
        { openInfo
          ? 'Close'
          : 'Info' }
      </button>

      { openInfo && (
        <HorizonInfo
          onClose={ () => setOpenInfo( false ) }
        />
      ) }
    </div>
  )
}