import dynamic from "next/dynamic";
import style from "./Canvas.module.scss";

const Canvas = dynamic(() => import("@react-three/fiber").then((module) => ({ default: module.Canvas })), {
  ssr: false,
});

const CustomCanvas: React.FC<ILayout> = (props) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        fov: 45,
      }}
      className={style.canvas}
    >
      {props.children}
    </Canvas>
  );
};

export default CustomCanvas;
