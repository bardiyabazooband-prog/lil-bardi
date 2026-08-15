"use client";

import { Volume2, VolumeX } from "lucide-react";

import { useSound } from "@/components/SoundProvider";

/**
 * @param {{ variant?: "pill" | "bare", className?: string }} props
 */
export default function SoundToggle({ variant = "pill", className = "" }) {
  const { soundOn, toggleSound, play } = useSound();

  const base =
    "type-label inline-flex items-center gap-2 transition-colors duration-300";

  const skin =
    variant === "pill"
      ? `${base} rounded-full border border-ink/12 bg-white/70 px-3 py-2 text-ink/70 hover:border-ink/25 hover:text-ink`
      : `${base} text-cloud/60 hover:text-lime`;

  return (
    <button
      type="button"
      onClick={toggleSound}
      onMouseEnter={() => play("hover")}
      aria-pressed={soundOn}
      aria-label={soundOn ? "Turn interface sound off" : "Turn interface sound on"}
      className={`${skin} ${className}`}
    >
      {soundOn ? (
        <Volume2 size={14} aria-hidden="true" className="text-aqua" />
      ) : (
        <VolumeX size={14} aria-hidden="true" />
      )}
      <span className="hidden sm:inline">SOUND {soundOn ? "ON" : "OFF"}</span>
      <span className="sm:hidden">{soundOn ? "ON" : "OFF"}</span>
    </button>
  );
}
