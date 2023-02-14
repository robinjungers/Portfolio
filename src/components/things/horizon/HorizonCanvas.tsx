import { Canvas } from "@react-three/fiber";
import { ReactElement } from "react";
import HorizonScene from "./HorizonScene";

type HorizonCanvasProps = {
  highQuality : boolean;
}

export default function HorizonCanvas( props : HorizonCanvasProps ) : ReactElement {
  return (
    <Canvas
      dpr={ props.highQuality ? 0.5 : 0.25 }
      orthographic
      camera={{
        near : 0.1,
        far : 10.0,
      }}
    >
      <HorizonScene />
    </Canvas>
  );
}