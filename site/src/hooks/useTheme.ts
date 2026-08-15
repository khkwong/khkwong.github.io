import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/*
 * Module-level rather than per-hook state. There are now several theme
 * controls in the app (the title screen's sun/moon, the inner pages' corner
 * button, the nav bar's toggle) and a plain useState hook would give each its
 * own copy — mount two at once and one shows the wrong state.
 */
let theme: Theme = localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
const listeners = new Set<() => void>();

function apply() {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

apply();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleTheme() {
  theme = theme === "light" ? "dark" : "light";
  apply();
  listeners.forEach((listener) => listener());
}

export function useTheme() {
  return {
    theme: useSyncExternalStore(subscribe, () => theme),
    toggleTheme,
  };
}
