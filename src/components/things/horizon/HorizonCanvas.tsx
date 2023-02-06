import { Canvas } from "@react-three/fiber";
import { ReactElement } from "react";
import HorizonScene from "./HorizonScene";

type HorizonCanvasProps = {
  dpi : number;
}

export default function HorizonCanvas( props : HorizonCanvasProps ) : ReactElement {
  return (
    <Canvas
      dpr={ props.dpi }
      orthographic
      camera={{
        near : 0.1,
        far : 10.0,
      }}
      style={{
        imageRendering : 'pixelated',
      }}
    >
      <HorizonScene />
    </Canvas>
  );
}