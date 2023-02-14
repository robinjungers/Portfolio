import { randomChoice, randomCircularGen, randomInt, randomTrue } from '@/lib/utils';
import css from './HorizonPage.module.css';
import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
import useDynamicInterval from '@/hooks/useDynamicInterval';
import useToggle from '@/hooks/useToggle';
import classNames from 'classnames';
import HorizonInfo from './HorizonInfo';
import BaseHead from '@/components/BaseHead';

const HorizonCanvasNoSSR = dynamic( () => import( './HorizonCanvas' ), {
  ssr : false,
} );

const subtitles = require( 'val-loader!./subtitles/all.eval.cjs' ) as string[];
const subtitleGen = randomCircularGen( subtitles );

export default function HorizonPage() : ReactElement {
  const [highQuality, setHighQuality] = useState<boolean>( false );
  const [openInfo, setOpenInfo] = useState<boolean>( false );
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>( null );

  useDynamicInterval( () => {
    const nextSubtitle = randomTrue( 0.5 ) ? subtitleGen.next().value : null;
    const nextDuration = randomInt( 2e3, 10e3 );
          
    setCurrentSubtitle( nextSubtitle );

    return nextDuration;
  }, [] );

  return (
    <div className={ css['Container'] }>
      <BaseHead
        pageTitle="Horizon"
        pageDescription="A procedural black hole designed to reproduce moments of beauty in sci-fi movies"
        disableZoom
      />

      <HorizonCanvasNoSSR
        highQuality={ highQuality }
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
        info
      </button>

      { openInfo && (
        <HorizonInfo
          onClose={ () => setOpenInfo( false ) }
        />
      ) }
    </div>
  )
}