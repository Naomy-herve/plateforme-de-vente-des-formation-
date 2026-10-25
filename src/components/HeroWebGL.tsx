'use client';
import { useEffect, useRef } from 'react';

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
const FRAG = `precision mediump float; uniform float t; uniform vec2 r;
void main(){ vec2 uv = gl_FragCoord.xy / r;
  float w = sin(uv.x*8. + t) * cos(uv.y*6. - t*.8) * .5 + .5;
  vec3 col = mix(vec3(.04,.03,.10), vec3(.43,.18,.85), w);
  gl_FragColor = vec4(col, .9); }`;

export default function HeroWebGL() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const gl = cv.getContext('webgl')!;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(prog, 't'), uR = gl.getUniformLocation(prog, 'r');
    let raf = 0, start = performance.now();
    const draw = () => {
      cv.width = cv.clientWidth; cv.height = cv.clientHeight;
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.uniform2f(uR, cv.width, cv.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}