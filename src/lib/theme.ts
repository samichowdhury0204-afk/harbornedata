import { useSyncExternalStore } from "react";

const storageKey = "harborne-theme-v1";
const themeEvent = "harborne-theme-change";

export const themeBootstrap = `(function(){try{var t=localStorage.getItem('${storageKey}');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  window.dispatchEvent(new Event(themeEvent));
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch {
      /* Storage may be disabled. */
    }
    applyTheme(saved === "dark" || (saved !== "light" && media.matches));
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) sync();
  };
  window.addEventListener(themeEvent, onChange);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", sync);
  return () => {
    window.removeEventListener(themeEvent, onChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", sync);
  };
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export function useTheme() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggleTheme = () => {
    const next = !getSnapshot();
    try {
      localStorage.setItem(storageKey, next ? "dark" : "light");
    } catch {
      /* Keep the toggle usable without storage. */
    }
    applyTheme(next);
  };
  return { dark, toggleTheme };
}
