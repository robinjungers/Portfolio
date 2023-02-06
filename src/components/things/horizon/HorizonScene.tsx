import useOnWheel from "@/hooks/useOnWheel";
import { ScreenQuad, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ReactElement, useEffect, useRef, useState } from "react";
import { LinearFilter, RawShaderMaterial, RepeatWrapping, ShaderMaterialParameters, Texture, Vector2, Vector3 } from "three";

const initialCamPos = new Vector3( 0.0, 0.0, -8.0 );
const initialCamZoom = 1.0;

const shaderOptions : ShaderMaterialParameters = {
  vertexShader : require( './horizon_vert.glsl' ),
  fragmentShader : require( './horizon_frag.glsl' ),
  uniforms : {
    uAspect : { value : 1.0 },
    uTime : { value : 0.0 },
    uNoiseTex : { value : null },
    uRotation : { value : 0.0 },
    uCamPos : { value : initialCamPos },
    uCamZoom : { value : initialCamZoom },
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

  const [camPos, setCamPos] = useState<Vector3>( initialCamPos );
  const [camZoom, setCamZoom] = useState<number>( initialCamZoom );

  useOnWheel( ( dx : number, dy : number ) => {
    if ( mat.current ) {
      mat.current.uniforms.uRotation.value -= 1e-4 * dy;
    }
  }, [] );

  useFrame( three => {
    if ( mat.current ) {
      mat.current.uniforms.uAspect.value = three.viewport.aspect;
      mat.current.uniforms.uTime.value = three.clock.elapsedTime;
    }
  } );

  return (
    <ScreenQuad>
      <rawShaderMaterial
        ref={ mat }
        attach="material"
        args={ [shaderOptions] }
        uniforms-uNoiseTex-value={ noiseTex }
        uniforms-uCamPos-value={ camPos }
        uniforms-uCamZoom-value={ camZoom }
      />
    </ScreenQuad>
  );
}