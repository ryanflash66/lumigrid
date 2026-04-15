/* eslint-disable react-hooks/immutability */
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const DOT_ROTATION = 0;
const DOT_GRID_SIZE = 70;
const DOTS = DOT_GRID_SIZE * DOT_GRID_SIZE;
const DOT_GRID_SIZE_BACK = 40;
const DOTS_BACK = DOT_GRID_SIZE_BACK * DOT_GRID_SIZE_BACK;

const DotMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    dotColorWarm: new THREE.Color("#FFFFFF"),
    dotColorCool: new THREE.Color("#FFFFFF"),
    bgColor: new THREE.Color("#121212"),
    dotState: null,
    dotStateBack: null,
    render: 0,
    rotation: 0,
    gridSize: 50,
    gridSizeBack: 40,
    dotOpacity: 0.05,
    cursorUv: new THREE.Vector2(-1, -1),
    cursorActive: 0,
    uFadeIn: 0,
  },
  /* glsl */ `
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl */ `
    uniform float time;
    uniform int render;
    uniform vec2 resolution;
    uniform vec3 dotColorWarm;
    uniform vec3 dotColorCool;
    uniform vec3 bgColor;
    uniform sampler2D dotState;
    uniform sampler2D dotStateBack;
    uniform float rotation;
    uniform float gridSize;
    uniform float gridSizeBack;
    uniform float dotOpacity;
    uniform vec2 cursorUv;
    uniform float cursorActive;
    uniform float uFadeIn;

    vec2 rotate(vec2 uv, float angle) {
      float s = sin(angle);
      float c = cos(angle);
      mat2 m = mat2(c, -s, s, c);
      return m * (uv - 0.5) + 0.5;
    }

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    // Spatial gradient: blend warm (bottom-left) to cool (top-right)
    vec3 spatialDotColor(vec2 uv) {
      float gradientT = clamp((uv.x + (1.0 - uv.y)) * 0.5, 0.0, 1.0);
      return mix(dotColorWarm, dotColorCool, gradientT);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);
      vec2 rUv = rotate(uv, rotation);

      float wave = sin(length(uv - 0.5) * 8.0 - time * 0.7);

      // Spatial base color for this fragment
      vec3 baseDotColor = spatialDotColor(uv);

      // --- Back layer (smaller, dimmer, slower) ---
      vec2 gCoordB = rUv * gridSizeBack;
      vec2 cellB = floor(gCoordB);
      float maskBack = 0.0;
      float glowMaskBack = 0.0;
      float topInfBack = 0.0;
      float dotRBack = 0.065 + wave * 0.003;

      for (int bx = -1; bx <= 1; bx++) {
        for (int by = -1; by <= 1; by++) {
          vec2 nbB = cellB + vec2(float(bx), float(by));
          vec2 centerB = nbB + 0.5;
          vec2 stUvB = (nbB + 0.5) / gridSizeBack;
          vec4 stB = texture2D(dotStateBack, stUvB);
          vec2 displacedB = centerB + stB.rg;
          float velSizeB = stB.a * 0.03;
          float localInfB = stB.b;
          // Bloom: expand radius when influenced
          float bloomRadiusB = dotRBack + velSizeB + localInfB * 0.06;
          float distB = length(gCoordB - displacedB);
          float sdB = distB - bloomRadiusB;
          maskBack = max(maskBack, smoothstep(0.018, 0.0, sdB));
          // Soft glow falloff around influenced dots
          float sdGlowB = distB - bloomRadiusB - localInfB * 0.15;
          float glowFallB = smoothstep(0.12, 0.0, sdGlowB) * localInfB;
          glowMaskBack = max(glowMaskBack, glowFallB);
          topInfBack = max(topInfBack, localInfB);
        }
      }

      // --- Front layer ---
      vec2 gCoord = rUv * gridSize;
      vec2 cell = floor(gCoord);
      float mask = 0.0;
      float glowMask = 0.0;
      float topInf = 0.0;
      float dotRBase = 0.10 + wave * 0.005;

      for (int dx = -1; dx <= 1; dx++) {
        for (int dy = -1; dy <= 1; dy++) {
          vec2 nb = cell + vec2(float(dx), float(dy));
          vec2 center = nb + 0.5;
          vec2 stUv = (nb + 0.5) / gridSize;
          vec4 st = texture2D(dotState, stUv);
          vec2 displaced = center + st.rg;
          float velSize = st.a * 0.04;
          float localInf = st.b;
          // Bloom: expand radius when influenced
          float bloomRadius = dotRBase + velSize + localInf * 0.08;
          float dist = length(gCoord - displaced);
          float sd = dist - bloomRadius;
          mask = max(mask, smoothstep(0.018, 0.0, sd));
          // Soft gaussian-like glow around activated dots
          float sdGlow = dist - bloomRadius - localInf * 0.2;
          float glowFall = smoothstep(0.15, 0.0, sdGlow) * localInf;
          glowMask = max(glowMask, glowFall);
          topInf = max(topInf, localInf);
        }
      }

      // --- Edge vignette ---
      vec2 ef = smoothstep(vec2(0.0), vec2(0.05), uv)
              * smoothstep(vec2(0.0), vec2(0.05), 1.0 - uv);
      float vignette = ef.x * ef.y;

      // --- Color temperature shift near cursor ---
      float hueShift = topInf * 0.45;
      vec3 cool = baseDotColor + vec3(-hueShift * 0.5, hueShift * 0.15, hueShift);
      vec3 tintedDot = mix(baseDotColor, cool, smoothstep(0.0, 0.6, topInf));

      // --- Cursor-proximity reveal ---
      vec2 cursorCover = coverUv(cursorUv);
      float cursorDist = length(uv - cursorCover);
      float reveal = smoothstep(0.38, 0.08, cursorDist) * cursorActive;

      // --- Composite: back layer first, then front on top ---
      float glowBackVal = topInfBack * 1.5;
      vec3 col = mix(bgColor, baseDotColor, maskBack * vignette * dotOpacity * 0.4 * (1.0 + glowBackVal) * reveal);
      // Add soft glow halo for back layer
      col += baseDotColor * glowMaskBack * vignette * dotOpacity * 0.2 * reveal;

      float glowVal = topInf * 2.5;
      float brighten = 1.0 + topInf * 8.0;
      col = mix(col, tintedDot * brighten, mask * vignette * dotOpacity * (1.0 + glowVal) * reveal);
      // Add soft glow halo for front layer
      col += tintedDot * glowMask * vignette * dotOpacity * 0.4 * reveal;

      // Apply fade-in entrance animation
      col = mix(bgColor, col, uFadeIn);

      gl_FragColor = vec4(col, 1.0);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
);

function Scene() {
  const size = useThree((state) => state.size);
  const viewport = useThree((state) => state.viewport);
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme;

  const themeColors = useMemo(() => {
    switch (activeTheme) {
      case "dark":
        return {
          dotColorWarm: "#FFE8D6",  // warm accent (bottom-left)
          dotColorCool: "#D6E8FF",  // cool primary (top-right)
          bgColor: "#121212",
          dotOpacity: 0.025,
        };
      case "light":
        return {
          dotColorWarm: "#2A1A0F",  // warm dark accent (bottom-left)
          dotColorCool: "#0F1A2A",  // cool dark primary (top-right)
          bgColor: "#F7F7F8",
          dotOpacity: 0.35,
        };
      default:
        return {
          dotColorWarm: "#FFE8D6",
          dotColorCool: "#D6E8FF",
          bgColor: "#121212",
          dotOpacity: 0.05,
        };
    }
  }, [activeTheme]);

  const mousePosTarget = useRef(new THREE.Vector2(-1, -1));
  const mouseVelocity = useRef(new THREE.Vector2(0, 0));
  const mousePosSmooth = useRef(new THREE.Vector2(-1, -1));
  const mouseActiveTarget = useRef(0);
  const mouseActiveCurrent = useRef(0);

  const simVel = useRef(new Float32Array(DOTS * 2));
  const simTex = useRef(new Float32Array(DOTS * 4));
  const simVelBack = useRef(new Float32Array(DOTS_BACK * 2));
  const simTexBack = useRef(new Float32Array(DOTS_BACK * 4));

  const scrollDelta = useRef(0);
  const scrollSmooth = useRef(0);
  const fadeInStart = useRef(-1);

  const dotStateTex = useMemo(() => {
    const tex = new THREE.DataTexture(
      simTex.current,
      DOT_GRID_SIZE, DOT_GRID_SIZE,
      THREE.RGBAFormat, THREE.FloatType,
    );
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    return tex;
  }, []);

  const dotStateTexBack = useMemo(() => {
    const tex = new THREE.DataTexture(
      simTexBack.current,
      DOT_GRID_SIZE_BACK, DOT_GRID_SIZE_BACK,
      THREE.RGBAFormat, THREE.FloatType,
    );
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    return tex;
  }, []);

  const dotMaterial = useMemo(() => {
    const material = new DotMaterial();
    material.rotation = DOT_ROTATION;
    material.gridSize = DOT_GRID_SIZE;
    material.gridSizeBack = DOT_GRID_SIZE_BACK;
    return material;
  }, []);

  useEffect(() => {
    dotMaterial.uniforms.resolution.value.set(
      size.width * viewport.dpr,
      size.height * viewport.dpr,
    );
  }, [size.width, size.height, viewport.dpr, dotMaterial]);

  useEffect(() => {
    dotMaterial.uniforms.dotState.value = dotStateTex;
    dotMaterial.uniforms.dotStateBack.value = dotStateTexBack;
  }, [dotStateTex, dotStateTexBack, dotMaterial]);

  useEffect(() => {
    dotMaterial.uniforms.dotColorWarm.value.set(themeColors.dotColorWarm);
    dotMaterial.uniforms.dotColorCool.value.set(themeColors.dotColorCool);
    dotMaterial.uniforms.bgColor.value.set(themeColors.bgColor);
    dotMaterial.uniforms.dotOpacity.value = themeColors.dotOpacity;
  }, [themeColors, dotMaterial]);

  useEffect(() => {
    return () => {
      dotMaterial.dispose();
      dotStateTex.dispose();
      dotStateTexBack.dispose();
    };
  }, [dotMaterial, dotStateTex, dotStateTexBack]);

  useEffect(() => {
    let prevY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      scrollDelta.current += y - prevY;
      prevY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;

    // --- Fade-in entrance animation (0 -> 1 over 1.5s) ---
    if (fadeInStart.current < 0) fadeInStart.current = time;
    const fadeProg = Math.min((time - fadeInStart.current) / 1.5, 1.0);
    // Ease-out cubic for smooth materialization
    const easedFade = 1.0 - (1.0 - fadeProg) * (1.0 - fadeProg) * (1.0 - fadeProg);
    dotMaterial.uniforms.uFadeIn.value = easedFade;

    // --- Scroll velocity ---
    const rawScroll = scrollDelta.current;
    scrollDelta.current = 0;
    scrollSmooth.current = scrollSmooth.current * 0.78 + rawScroll * 0.22;
    scrollSmooth.current *= Math.exp(-3.5 * dt);
    const scrollFlow = scrollSmooth.current * 0.025;

    // --- Cursor spring ---
    const pos = mousePosSmooth.current;
    const target = mousePosTarget.current;
    const mVel = mouseVelocity.current;

    mVel.x += (target.x - pos.x) * 60 * dt;
    mVel.y += (target.y - pos.y) * 60 * dt;
    const springDecay = Math.exp(-12 * dt);
    mVel.x *= springDecay;
    mVel.y *= springDecay;
    pos.x += mVel.x * dt;
    pos.y += mVel.y * dt;

    // --- Cursor speed for velocity-scaled wake ---
    const cursorSpeed = Math.sqrt(mVel.x * mVel.x + mVel.y * mVel.y);
    const speedPushMul = 1.0 + Math.min(cursorSpeed * 0.6, 1.5);
    const speedRadiusMul = 1.0 + Math.min(cursorSpeed * 0.3, 0.8);

    const maCur = mouseActiveCurrent.current;
    const maTarget = mouseActiveTarget.current;
    const fadeSpeed = maTarget > maCur ? 3 : 4;
    mouseActiveCurrent.current =
      maCur + (maTarget - maCur) * (1 - Math.exp(-fadeSpeed * dt));

    const res = dotMaterial.uniforms.resolution.value as THREE.Vector2;
    const maxDim = Math.max(res.x, res.y);
    const sx = res.x / maxDim;
    const sy = res.y / maxDim;

    const currentActive = mouseActiveCurrent.current;

    // ===== FRONT LAYER SIMULATION =====
    const mGridX = ((pos.x - 0.5) * sx + 0.5) * DOT_GRID_SIZE;
    const mGridY = ((pos.y - 0.5) * sy + 0.5) * DOT_GRID_SIZE;
    const texD = simTex.current;
    const velD = simVel.current;

    const pushForce = 12 * speedPushMul;
    const flowFollow = 2.2;
    const hoverSwirlStrength = 1.05 * (1 + (speedPushMul - 1) * 0.5);
    const springK = 2.7;
    const dampFactor = Math.exp(-2.15 * dt);
    const gridRadius = 16 * speedRadiusMul;
    const gridRadiusSq = gridRadius * gridRadius;

    for (let i = 0; i < DOTS; i++) {
      const x = i % DOT_GRID_SIZE;
      const y = (i / DOT_GRID_SIZE) | 0;
      const gx = x + 0.5;
      const gy = y + 0.5;

      let dx = texD[i * 4];
      let dy = texD[i * 4 + 1];
      let vx = velD[i * 2];
      let vy = velD[i * 2 + 1];

      const px = gx + dx;
      const py = gy + dy;

      const f1 = px * 0.1 + py * 0.07 + time * 0.22;
      const f2 = px * 0.05 - py * 0.11 - time * 0.18;
      const dPsiDx = Math.cos(f1) * 0.1 * 0.9 + Math.cos(f2) * 0.05 * 0.7;
      const dPsiDy = Math.cos(f1) * 0.07 * 0.9 - Math.cos(f2) * 0.11 * 0.7;
      const flowX = dPsiDy * 0.95;
      const flowY = -dPsiDx * 0.95;

      const g1 = px * 0.035 + py * 0.09 - time * 0.16;
      const g2 = px * 0.07 - py * 0.03 + time * 0.11;
      const dGdx = Math.cos(g1) * 0.035 * 0.55 + Math.cos(g2) * 0.07 * 0.35;
      const dGdy = Math.cos(g1) * 0.09 * 0.55 - Math.cos(g2) * 0.03 * 0.35;
      const windX = dGdy * 0.9;
      const windY = -dGdx * 0.9;

      const ddx = gx - mGridX;
      const ddy = gy - mGridY;
      const distSq = ddx * ddx + ddy * ddy;
      let inf = 0;
      let hoverFlowX = 0;
      let hoverFlowY = 0;

      if (distSq < gridRadiusSq && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const t = 1 - dist / gridRadius;
        const eased = t * t * (3 - 2 * t);
        inf = eased * eased * currentActive;
        const nx = ddx / dist;
        const ny = ddy / dist;
        const tx = -ny;
        const ty = nx;
        vx += (nx + tx * 0.25) * inf * pushForce * dt;
        vy += (ny + ty * 0.25) * inf * pushForce * dt;

        const swirlPulse = 0.86 + 0.14 * Math.sin(time * 2.1 - dist * 0.45);
        const theta = time * 1.35 + dist * 0.32;
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        const swirlDirX = tx * c + nx * s;
        const swirlDirY = ty * c + ny * s;
        hoverFlowX = swirlDirX * inf * hoverSwirlStrength * swirlPulse;
        hoverFlowY = swirlDirY * inf * hoverSwirlStrength * swirlPulse;
      }

      const targetFlowX = flowX + windX + hoverFlowX;
      const targetFlowY = flowY + windY + hoverFlowY + scrollFlow;
      vx += (targetFlowX - vx) * flowFollow * dt;
      vy += (targetFlowY - vy) * flowFollow * dt;

      vx -= dx * springK * dt;
      vy -= dy * springK * dt;

      vx *= dampFactor;
      vy *= dampFactor;

      dx += vx * dt;
      dy += vy * dt;

      dx = Math.max(-0.85, Math.min(0.85, dx));
      dy = Math.max(-0.85, Math.min(0.85, dy));

      velD[i * 2] = vx;
      velD[i * 2 + 1] = vy;

      texD[i * 4] = dx;
      texD[i * 4 + 1] = dy;
      texD[i * 4 + 2] = inf;
      texD[i * 4 + 3] = Math.min(Math.sqrt(vx * vx + vy * vy) * 0.15, 0.3);
    }

    // ===== BACK LAYER SIMULATION =====
    const mGridXB = ((pos.x - 0.5) * sx + 0.5) * DOT_GRID_SIZE_BACK;
    const mGridYB = ((pos.y - 0.5) * sy + 0.5) * DOT_GRID_SIZE_BACK;
    const texB = simTexBack.current;
    const velB = simVelBack.current;

    const pushForceB = 12 * 0.4 * speedPushMul;
    const flowFollowB = 1.1;
    const hoverSwirlB = 0.42;
    const springKB = 2.7;
    const dampFactorB = Math.exp(-2.15 * dt);
    const gridRadiusB = 16 * 0.6 * speedRadiusMul;
    const gridRadiusSqB = gridRadiusB * gridRadiusB;

    for (let i = 0; i < DOTS_BACK; i++) {
      const x = i % DOT_GRID_SIZE_BACK;
      const y = (i / DOT_GRID_SIZE_BACK) | 0;
      const gx = x + 0.5;
      const gy = y + 0.5;

      let dx = texB[i * 4];
      let dy = texB[i * 4 + 1];
      let vx = velB[i * 2];
      let vy = velB[i * 2 + 1];

      const px = gx + dx;
      const py = gy + dy;

      const f1 = px * 0.08 + py * 0.055 + time * 0.11;
      const f2 = px * 0.04 - py * 0.085 - time * 0.09;
      const dPsiDx = Math.cos(f1) * 0.08 * 0.9 + Math.cos(f2) * 0.04 * 0.7;
      const dPsiDy = Math.cos(f1) * 0.055 * 0.9 - Math.cos(f2) * 0.085 * 0.7;
      const flowXB = dPsiDy * 0.5;
      const flowYB = -dPsiDx * 0.5;

      const g1 = px * 0.03 + py * 0.07 - time * 0.08;
      const g2 = px * 0.055 - py * 0.025 + time * 0.055;
      const dGdxB = Math.cos(g1) * 0.03 * 0.55 + Math.cos(g2) * 0.055 * 0.35;
      const dGdyB = Math.cos(g1) * 0.07 * 0.55 - Math.cos(g2) * 0.025 * 0.35;
      const windXB = dGdyB * 0.5;
      const windYB = -dGdxB * 0.5;

      const ddx = gx - mGridXB;
      const ddy = gy - mGridYB;
      const distSq = ddx * ddx + ddy * ddy;
      let inf = 0;
      let hfxB = 0;
      let hfyB = 0;

      if (distSq < gridRadiusSqB && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const t = 1 - dist / gridRadiusB;
        const eased = t * t * (3 - 2 * t);
        inf = eased * eased * currentActive;
        const nx = ddx / dist;
        const ny = ddy / dist;
        const tx = -ny;
        const ty = nx;
        vx += (nx + tx * 0.25) * inf * pushForceB * dt;
        vy += (ny + ty * 0.25) * inf * pushForceB * dt;

        const theta = time * 0.9 + dist * 0.25;
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        hfxB = (tx * c + nx * s) * inf * hoverSwirlB;
        hfyB = (ty * c + ny * s) * inf * hoverSwirlB;
      }

      const tFxB = flowXB + windXB + hfxB;
      const tFyB = flowYB + windYB + hfyB + scrollFlow * 0.5;
      vx += (tFxB - vx) * flowFollowB * dt;
      vy += (tFyB - vy) * flowFollowB * dt;

      vx -= dx * springKB * dt;
      vy -= dy * springKB * dt;

      vx *= dampFactorB;
      vy *= dampFactorB;

      dx += vx * dt;
      dy += vy * dt;

      dx = Math.max(-0.85, Math.min(0.85, dx));
      dy = Math.max(-0.85, Math.min(0.85, dy));

      velB[i * 2] = vx;
      velB[i * 2 + 1] = vy;

      texB[i * 4] = dx;
      texB[i * 4 + 1] = dy;
      texB[i * 4 + 2] = inf;
      texB[i * 4 + 3] = Math.min(Math.sqrt(vx * vx + vy * vy) * 0.15, 0.3);
    }

    dotStateTex.needsUpdate = true;
    dotStateTexBack.needsUpdate = true;
    dotMaterial.uniforms.time.value = time;
    dotMaterial.uniforms.cursorUv.value.set(pos.x, pos.y);
    dotMaterial.uniforms.cursorActive.value = currentActive;
  });

  // Track mouse at window level so the shader responds even when
  // behind pointer-events-none content (layout-level singleton).
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Convert screen coords → 0-1 UV (bottom-left origin like GL)
      mousePosTarget.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      );
      mouseActiveTarget.current = 1;
    };

    const onMouseLeave = () => {
      mouseActiveTarget.current = 0;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={dotMaterial} render={0} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Ready Signal — fires callback on the very first rendered frame    */
/* ------------------------------------------------------------------ */
function ReadySignal({ onReady }: { onReady?: () => void }) {
  const hasSignaled = useRef(false);
  useFrame(() => {
    if (!hasSignaled.current) {
      hasSignaled.current = true;
      onReady?.();
    }
  });
  return null;
}

/* ------------------------------------------------------------------ */
/*  Visibility-aware frameloop pauser                                 */
/*  Stops the render loop when the tab is hidden to conserve GPU.     */
/* ------------------------------------------------------------------ */
function VisibilityPauser() {
  const { invalidate } = useThree();
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        // Kick the loop back to life
        invalidate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [gl, invalidate]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  DotScreenShader — Canvas wrapper with context-loss recovery       */
/* ------------------------------------------------------------------ */
export const DotScreenShader = ({
  onReady,
  onContextLost,
  onContextRestored,
}: {
  onReady?: () => void;
  onContextLost?: () => void;
  onContextRestored?: () => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [contextLost, setContextLost] = useState(false);

  // Attach context-loss / restore listeners directly to the <canvas>
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleLost = (e: Event) => {
      // preventDefault allows the browser to attempt a restore
      e.preventDefault();
      setContextLost(true);
      onContextLost?.();
    };

    const handleRestored = () => {
      setContextLost(false);
      onContextRestored?.();
    };

    canvas.addEventListener("webglcontextlost", handleLost);
    canvas.addEventListener("webglcontextrestored", handleRestored);
    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
    };
  }, [onContextLost, onContextRestored]);

  return (
    <Canvas
      ref={canvasRef}
      className="w-full h-full"
      // Use "demand" frameloop — Scene calls invalidate() via useFrame,
      // but when tab is hidden VisibilityPauser stops requesting frames.
      frameloop="always"
      gl={{
        antialias: false,          // fullscreen quad doesn't need AA
        powerPreference: "default", // "high-performance" hogs dedicated GPU & eats context slots
        depth: false,               // 2D shader — no depth buffer needed
        stencil: false,             // no stencil operations
        alpha: false,               // we render our own bg color
        failIfMajorPerformanceCaveat: false,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.NoToneMapping,
      }}
      // Force renderer disposal on unmount to free the WebGL context
      onCreated={({ gl: renderer }) => {
        renderer.domElement.dataset.shaderCanvas = "dot-shader";
      }}
    >
      {!contextLost && <Scene />}
      <ReadySignal onReady={onReady} />
      <VisibilityPauser />
    </Canvas>
  );
};

/* ------------------------------------------------------------------ */
/*  Public wrapper: skeleton → shader crossfade + context recovery     */
/* ------------------------------------------------------------------ */
type DotShaderBackgroundProps = {
  className?: string;
  style?: CSSProperties;
};

function ShaderSkeleton() {
  return (
    <div
      className="absolute inset-0 animate-pulse"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-primary) 0.6px, transparent 0.6px)",
        backgroundSize: "20px 20px",
        opacity: 0.06,
      }}
    />
  );
}

export function DotShaderBackground({
  className,
  style,
}: DotShaderBackgroundProps) {
  const [ready, setReady] = useState(false);
  const [contextAlive, setContextAlive] = useState(true);

  const handleContextLost = useCallback(() => {
    setContextAlive(false);
    setReady(false); // fall back to skeleton
  }, []);

  const handleContextRestored = useCallback(() => {
    setContextAlive(true);
  }, []);

  return (
    <div
      className={cn("absolute inset-0 z-0 h-full w-full", className)}
      style={{ minHeight: "100vh", ...style }}
    >
      {/* Lightweight CSS dot grid shown until WebGL canvas is ready */}
      {!ready && <ShaderSkeleton />}
      <div
        className={cn(
          "h-full w-full transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      >
        <DotScreenShader
          onReady={() => setReady(true)}
          onContextLost={handleContextLost}
          onContextRestored={handleContextRestored}
        />
      </div>

      {/* If context was lost and never restored, show permanent fallback */}
      {!contextAlive && !ready && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/10 dark:via-background dark:to-accent/10" />
      )}
    </div>
  );
}
