'use client';
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { courses } from '@/lib/data';

export default function Progress3D() {
  const ref = useRef<HTMLCanvasElement>(null);
  const progress = useAppStore(s => s.progress);

  useEffect(() => {
    let engine: import('@babylonjs/core').Engine;
    (async () => {
      const BABYLON = await import('@babylonjs/core');
      engine = new BABYLON.Engine(ref.current!, true);
      const scene = new BABYLON.Scene(engine);
      scene.createDefaultCameraOrLight(true, true, true);
      (scene.activeCamera as BABYLON.ArcRotateCamera).useAutoRotationBehavior = true;
      const entries = courses.filter(c => progress[c.id] !== undefined);
      entries.forEach((c, i) => {
        const h = Math.max(0.05, (progress[c.id] ?? 0) / 100 * 4);
        const box = BABYLON.MeshBuilder.CreateBox(c.id, { width: 0.8, height: h, depth: 0.8 }, scene);
        box.position.set(i * 1.2 - (entries.length - 1) * 0.6, h / 2, 0);
        const mat = new BABYLON.StandardMaterial(`m${c.id}`, scene);
        mat.diffuseColor = new BABYLON.Color3(0.42, 0.16, 0.85);
        box.material = mat;
      });
      engine.runRenderLoop(() => scene.render());
    })();
    return () => engine?.dispose();
  }, [progress]);

  return <canvas ref={ref} className="h-80 w-full rounded-lg" style={{ touchAction: 'none' }} />;
}