import { useEffect, useRef } from "react";

function mountCanvas( canvas ) {
  const ctx = canvas.getContext( '2d' );

  const draw = () => {
    const w = canvas.width = 0.10 * window.innerWidth;
    const h = canvas.height = 0.10 * window.innerHeight;

    ctx.clearRect( 0, 0, w, h );
    ctx.font = 'bold italic 30px serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'hsl(0,0%,10%)';
    ctx.fillText( 'Robin', 0.5 * w, 0.5 * h );
  };

  draw();

  window.addEventListener( 'resize', draw );
  return () => {
    window.removeEventListener( 'resize', draw );
  };
}

export default function Experiment1() {
  const canvas = useRef( null );

  useEffect( () => {
    return mountCanvas( canvas.current );
  }, [] );

  return (
    <div>
      <canvas
        ref={ canvas }
        style={{
          width : '100vw',
          height : '100vh',
          imageRendering : 'pixelated',
        }}
      />
    </div>
  )
}