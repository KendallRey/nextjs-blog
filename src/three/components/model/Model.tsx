"use client";

import { useGLTF, PresentationControls, Stage } from "@react-three/drei";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AnimationAction, AnimationMixer } from "three";

type ModelType = {
  path: string;
  props: Omit<PrimitiveProps, "object">;
};

const Model = ({ path, props }: ModelType) => {
  const { scene, animations } = useGLTF(path);

  const mixer = useRef<AnimationMixer>();
  const actions = useRef<AnimationAction[]>([]);

  useEffect(() => {
    mixer.current = new AnimationMixer(scene);
    const this_mixer = mixer.current;
    actions.current = animations.map((clip) => this_mixer.clipAction(clip));

    actions.current.forEach((action) => action.play());

    return () => {
      actions.current.forEach((action) => {
        action.stop();
        action.reset();
      });
    };
  }, [scene, animations]);

  useFrame((state, delta) => {
    if (!mixer.current) return;
    mixer.current.update(delta);
  });

  return (
    <PresentationControls global zoom={1} polar={[-1, Math.PI / 4]} speed={1.5}>
      <Stage shadows={false} environment={"city"}>
        <primitive object={scene} {...props} />
      </Stage>
    </PresentationControls>
  );
};

export default Model;
