"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { useReducedMotion } from "framer-motion";

export interface LottieAnimationHandle {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (frame: number) => void;
}

export interface LottieAnimationProps {
  /** Local path to .lottie or .json animation file in public/ */
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  direction?: 1 | -1;
  className?: string;
  onComplete?: () => void;
  onLoad?: () => void;
  fallback?: React.ReactNode;
}

export const LottieAnimation = forwardRef<LottieAnimationHandle, LottieAnimationProps>(
  function LottieAnimation(
    {
      src,
      autoplay = true,
      loop = true,
      speed = 1,
      direction = 1,
      className = "",
      onComplete,
      onLoad,
      fallback,
    },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dotLottieRef = useRef<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useImperativeHandle(ref, () => ({
      play: () => dotLottieRef.current?.play(),
      pause: () => dotLottieRef.current?.pause(),
      stop: () => dotLottieRef.current?.stop(),
      seek: (frame: number) => dotLottieRef.current?.setFrame(frame),
    }));

    useEffect(() => {
      let isMounted = true;

      // When reduced motion is preferred, we don't start the active loop
      const effectiveAutoplay = shouldReduceMotion ? false : autoplay;
      const effectiveLoop = shouldReduceMotion ? false : loop;

      async function initLottie() {
        if (!canvasRef.current) return;

        try {
          const { DotLottie } = await import("@lottiefiles/dotlottie-web");

          if (!isMounted || !canvasRef.current) return;

          // Clean up any existing instance
          if (dotLottieRef.current) {
            dotLottieRef.current.destroy();
          }

          const instance = new DotLottie({
            canvas: canvasRef.current,
            src,
            autoplay: effectiveAutoplay,
            loop: effectiveLoop,
            speed,
          });

          instance.addEventListener("load", () => {
            if (isMounted) {
              setIsLoaded(true);
              onLoad?.();
              // If reduced motion, seek to first stable frame
              if (shouldReduceMotion) {
                instance.setFrame(10);
                instance.pause();
              }
            }
          });

          if (onComplete) {
            instance.addEventListener("complete", onComplete);
          }

          dotLottieRef.current = instance;
        } catch (err) {
          console.warn("Failed to load Lottie animation:", src, err);
        }
      }

      initLottie();

      return () => {
        isMounted = false;
        if (dotLottieRef.current) {
          dotLottieRef.current.destroy();
          dotLottieRef.current = null;
        }
      };
    }, [src, autoplay, loop, speed, direction, shouldReduceMotion, onComplete, onLoad]);

    return (
      <div className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}>
        <canvas
          ref={canvasRef}
          className={`w-full h-full max-w-full max-h-full transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {!isLoaded && fallback && (
          <div className="absolute inset-0 flex items-center justify-center">
            {fallback}
          </div>
        )}
      </div>
    );
  }
);
