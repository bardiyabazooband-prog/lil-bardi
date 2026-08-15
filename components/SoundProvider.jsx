"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "lil-bardi-sound";

const CUES = {
  hover: { src: "/sounds/hover-tick.mp3", volume: 0.1 },
  tap: { src: "/sounds/button-tap.mp3", volume: 0.16 },
  nav: { src: "/sounds/nav-shift.mp3", volume: 0.18 },
};

/* ------------------------------------------------------------------ *
 * Preference store
 *
 * The setting lives outside React so it can be read on demand without
 * writing state from an effect. Sound is OFF unless localStorage has
 * explicitly opted in, and the server snapshot is always "off".
 * ------------------------------------------------------------------ */

const listeners = new Set();
let cached = null;

function readPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    // Private mode / storage disabled — stay silent.
    return false;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);

  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY) return;
    cached = readPreference();
    emit();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  if (cached === null) cached = readPreference();
  return cached;
}

function getServerSnapshot() {
  return false;
}

function writePreference(next) {
  cached = next;

  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Ignore storage failures — the toggle still works for this session.
  }

  emit();
}

const SoundContext = createContext({
  soundOn: false,
  toggleSound: () => {},
  play: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

/**
 * Site-wide UI sound. Off by default; only enabled when localStorage says so.
 * Playback is additionally gated on a real user gesture to respect browser
 * autoplay policies, and every play() call fails silently.
 */
export default function SoundProvider({ children }) {
  const soundOn = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const gestured = useRef(false);
  const buffers = useRef(null);

  useEffect(() => {
    const unlock = () => {
      gestured.current = true;
    };

    window.addEventListener("pointerdown", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  // Audio elements are created lazily inside event handlers — never during
  // render or in an effect — so nothing is fetched until sound is enabled.
  const ensureBuffers = useCallback(() => {
    if (buffers.current || typeof Audio === "undefined") return buffers.current;

    buffers.current = Object.fromEntries(
      Object.entries(CUES).map(([name, cue]) => {
        const audio = new Audio(cue.src);
        audio.preload = "auto";
        audio.volume = cue.volume;
        return [name, audio];
      }),
    );

    return buffers.current;
  }, []);

  const fire = useCallback(
    (name) => {
      const bank = ensureBuffers();
      const audio = bank?.[name];
      if (!audio) return;

      try {
        audio.currentTime = 0;
        const attempt = audio.play();
        if (attempt?.catch) attempt.catch(() => {});
      } catch {
        // Ignore — sound is decorative.
      }
    },
    [ensureBuffers],
  );

  const play = useCallback(
    (name) => {
      if (!soundOn || !gestured.current) return;
      fire(name);
    },
    [soundOn, fire],
  );

  const toggleSound = useCallback(() => {
    gestured.current = true;

    const next = !getSnapshot();
    writePreference(next);

    // Confirm the toggle audibly when turning sound on.
    if (next) fire("tap");
  }, [fire]);

  const value = useMemo(
    () => ({ soundOn, toggleSound, play }),
    [soundOn, toggleSound, play],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}
