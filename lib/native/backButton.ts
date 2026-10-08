"use client";

type BackAction = () => boolean;

// Stack of handler callbacks. Return true if handled, false to delegate to next handler.
const handlers: BackAction[] = [];

/**
 * Register a back-button handler. Higher priority handlers are pushed to the top of the stack.
 * If the handler returns true, the back-press is considered consumed.
 * If false, it delegates to the next handler in the stack.
 */
export function registerBackButtonHandler(handler: BackAction): () => void {
  handlers.push(handler);
  return () => {
    const idx = handlers.indexOf(handler);
    if (idx !== -1) {
      handlers.splice(idx, 1);
    }
  };
}

/**
 * Execute the top-most handler if available.
 * Returns true if an active handler consumed the action.
 */
export function handleBackAction(): boolean {
  for (let i = handlers.length - 1; i >= 0; i--) {
    const handled = handlers[i]();
    if (handled) return true;
  }
  return false;
}
