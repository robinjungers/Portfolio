import { ScreenQuad, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { meanBy } from "lodash";
import { ReactElement, useEffect, useRef } from "react";
import { LinearFilter, RawShaderMaterial, RepeatWrapping, ShaderMaterialParameters, Texture } from "three";

const shaderOptions : ShaderMaterialParameters = {
  vertexShader : require( './horizon_vert.glsl' ),
  fragmentShader : require( './horizon_frag.glsl' ),
  uniforms : {
    uAspect : { value : 1.0 },
    uTime : { value : 0.0 },
    uNoiseTex : { value : null },
    uRotation : { value : 0.0 },
  }
}

export default function HorizonScene() : ReactElement {
  const mat = useRef<RawShaderMaterial>( null );
  const noiseTex = useTexture( '/noise256.png', ( texture : Texture ) => {
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  } );

  useFrame( three => {
    if ( mat.current ) {
      mat.current.uniforms.uAspect.value = three.viewport.aspect;
      mat.current.uniforms.uTime.value = three.clock.elapsedTime;
    }
  } );

  const canvas = useThree( three => three.gl.domElement );

  useEffect( () => {
    let hasStartedDragging = false;
    let lastX : number | null = null;
    let lastY : number | null = null;

    const onTouchStart = ( e : TouchEvent ) => {
      if ( e.touches.length == 2 ) {
        hasStartedDragging = true;
      }
    };

    const onTouchMove = ( e : TouchEvent ) => {
      if ( hasStartedDragging ) {
        e.preventDefault();

        const x = meanBy( e.touches, 'clientX' );
        const y = meanBy( e.touches, 'clientY' );
        const dx = ( x - ( lastX ?? x ) );
        const dy = ( y - ( lastY ?? y ) );

        mat.current.uniforms.uRotation.value -= 2e-4 * dy;

        lastX = x;
        lastY = y;
      }
    };
    const onTouchEnd = ( e : TouchEvent ) => {
      if ( e.touches.length === 0 ) {
        hasStartedDragging = false;
        lastX = null;
        lastY = null;
      }
    };

    const onWheel = ( e : WheelEvent ) => {
      e.preventDefault();

      mat.current.uniforms.uRotation.value -= 1e-4 * e.deltaY;
    };

    canvas.addEventListener( 'wheel', onWheel, { passive : false } );
    canvas.addEventListener( 'touchstart', onTouchStart );
    canvas.addEventListener( 'touchmove', onTouchMove, { passive : false } );
    canvas.addEventListener( 'touchcancel', onTouchEnd );
    canvas.addEventListener( 'touchend', onTouchEnd );

    return () => {
      canvas.removeEventListener( 'wheel', onWheel );
      canvas.removeEventListener( 'touchmove', onTouchMove );
      canvas.removeEventListener( 'touchcancel', onTouchEnd );
      canvas.removeEventListener( 'touchend', onTouchEnd );
    };
  }, [
    canvas,
  ] );

  return (
    <ScreenQuad>
      <rawShaderMaterial
        ref={ mat }
        attach="material"
        args={ [shaderOptions] }
        uniforms-uNoiseTex-value={ noiseTex }
      />
    </ScreenQuad>
  );
}