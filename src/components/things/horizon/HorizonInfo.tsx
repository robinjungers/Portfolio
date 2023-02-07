import css from './HorizonInfo.module.css';
import { MouseEvent, ReactElement } from "react";

type HorizonInfoProps = {
  onClose : () => void;
}

const stopPropagation = ( e : MouseEvent ) => e.stopPropagation();

export default function HorizonInfo( props : HorizonInfoProps ) : ReactElement {
  return (
    <div
      className={ css['Container'] }
      onClick={ props.onClose }
    >
      <div
        className={ css['Modal'] }
        onClick={ stopPropagation }
      >
        <p className={ css['Text'] }>
          <em>Horizon</em> is a procedural black hole designed to replicate moments of beauty in sci-fi movies.
          It displays excerpts from the subtitle tracks of famous movies - <em>Interstellar</em>, <em>Solaris</em>, etc.
          Try scrolling to force the rotation.
        </p>

        <button
          className={ css['Close']}
          onClick={ props.onClose }
        >
          Close
        </button>
      </div>
    </div>
  )
}