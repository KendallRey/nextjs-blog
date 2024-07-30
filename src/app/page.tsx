"use client";

import CustomCanvas from "@/three/components/canvas/Canvas";
import Model from "@/three/components/model/Model";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CustomCanvas>
        <Model path={"models/mod1-rigged-animated.glb"} props={{ scale: 1, shadows: false, castShadow: false }} />
      </CustomCanvas>
    </main>
  );
}
