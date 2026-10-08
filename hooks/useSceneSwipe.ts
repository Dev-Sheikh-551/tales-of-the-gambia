"use client";

import { useRef, useCallback } from "react";

export interface UseSceneSwipeOptions {
  onNext?: () => void;
  onPrevious?: () => void;
  canNext?: boolean;
  canPrevious?: boolean;
  threshold?: number;
  velocityThreshold?: number;
  disabled?: boolean;
}

export interface SceneSwipeHandlers {
  onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLElement>) => void;
  onTouchCancel: () => void;
}

/**
 * Robust, thumb-friendly touch gesture hook for horizontal scene swiping.
 * - Ensures natural vertical page scrolling is never blocked.
 * - Prevents accidental transitions during audio scrubbing, slider dragging, or button taps.
 * - Respects active text selection (select-text integrity).
 * - Debounces to prevent double-swiping.
 */
export function useSceneSwipe({
  onNext,
  onPrevious,
  canNext = true,
  canPrevious = true,
  threshold = 48,
  velocityThreshold = 0.35,
  disabled = false,
}: UseSceneSwipeOptions): SceneSwipeHandlers {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchCurrentRef = useRef<{ x: number; y: number } | null>(null);
  const isLockedRef = useRef(false);

  const isInteractiveTarget = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof HTMLElement)) return false;
    return Boolean(
      target.closest(
        'input, select, textarea, button, a, [role="slider"], [role="button"], [data-no-swipe="true"], .no-swipe'
      )
    );
  };

  const hasActiveTextSelection = (): boolean => {
    if (typeof window === "undefined") return false;
    const selection = window.getSelection();
    return Boolean(selection && selection.toString().trim().length > 0);
  };

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (disabled || isLockedRef.current) return;
      if (e.touches.length !== 1) {
        touchStartRef.current = null;
        touchCurrentRef.current = null;
        return;
      }

      // Do not trigger on interactive elements like scrubbers, sliders, or buttons
      if (isInteractiveTarget(e.target)) {
        touchStartRef.current = null;
        touchCurrentRef.current = null;
        return;
      }

      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      touchCurrentRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [disabled]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (disabled || !touchStartRef.current) return;
      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      touchCurrentRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [disabled]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (disabled || !touchStartRef.current || isLockedRef.current) {
        touchStartRef.current = null;
        touchCurrentRef.current = null;
        return;
      }

      // Prevent scene change if user is selecting text
      if (hasActiveTextSelection()) {
        touchStartRef.current = null;
        touchCurrentRef.current = null;
        return;
      }

      const touchEnd = e.changedTouches[0];
      const deltaX = touchEnd.clientX - touchStartRef.current.x;
      const deltaY = touchEnd.clientY - touchStartRef.current.y;
      const elapsed = Math.max(1, Date.now() - touchStartRef.current.time);

      touchStartRef.current = null;
      touchCurrentRef.current = null;

      // Gesture criteria:
      // 1. Must be horizontal dominant: |deltaX| > |deltaY| * 1.5
      // 2. Must not take longer than 650ms (avoid dragging across screen slowly)
      // 3. Movement exceeds threshold OR velocity exceeds quick-flick threshold
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const isHorizontalDominant = absX > absY * 1.5;
      const velocity = absX / elapsed;

      if (!isHorizontalDominant || elapsed > 650) {
        return;
      }

      const isSwipeIntent = absX >= threshold || (velocity >= velocityThreshold && absX >= 30);

      if (isSwipeIntent) {
        if (deltaX < 0 && canNext && onNext) {
          // Swipe Left -> Next Scene
          isLockedRef.current = true;
          onNext();
          setTimeout(() => {
            isLockedRef.current = false;
          }, 400);
        } else if (deltaX > 0 && canPrevious && onPrevious) {
          // Swipe Right -> Previous Scene
          isLockedRef.current = true;
          onPrevious();
          setTimeout(() => {
            isLockedRef.current = false;
          }, 400);
        }
      }
    },
    [disabled, threshold, velocityThreshold, canNext, canPrevious, onNext, onPrevious]
  );

  const onTouchCancel = useCallback(() => {
    touchStartRef.current = null;
    touchCurrentRef.current = null;
  }, []);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
  };
}
