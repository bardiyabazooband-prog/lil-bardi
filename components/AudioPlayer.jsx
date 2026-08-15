"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Pause, Play } from "lucide-react";

import Equalizer from "@/components/Equalizer";
import { useSound } from "@/components/SoundProvider";

function clock(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);

  return `${minutes}:${String(total % 60).padStart(2, "0")}`;
}

/**
 * Compact preview player.
 *
 * variant "pill"  — floating control used on the hero artwork
 * variant "panel" — wider control with a seekable bar, used on Music / Releases
 *
 * Playback is always started from a user gesture, so it works within browser
 * autoplay restrictions on iOS and Android. Load failures surface as an
 * explicit "audio unavailable" state rather than a dead button.
 */
export default function AudioPlayer({
  src,
  title,
  subtitle,
  variant = "pill",
  tone = "light",
  className = "",
}) {
  const audioRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(!src);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { play: cue } = useSound();

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || failed) return;

    cue("tap");

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setFailed(true);
        setPlaying(false);
      }
      return;
    }

    audio.pause();
  }

  function seek(event) {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);

    audio.currentTime = ratio * duration;
    setTime(audio.currentTime);
  }

  const progress = duration ? (time / duration) * 100 : 0;
  const dark = tone === "dark";

  const label = failed
    ? `${title} preview unavailable`
    : playing
      ? `Pause ${title} preview`
      : `Play ${title} preview`;

  const media = src ? (
    <audio
      ref={audioRef}
      src={src}
      preload="metadata"
      onLoadedMetadata={(event) => {
        setDuration(event.currentTarget.duration || 0);
        setReady(true);
      }}
      onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => {
        setPlaying(false);
        setTime(0);
      }}
      onError={() => {
        setFailed(true);
        setPlaying(false);
      }}
    />
  ) : null;

  if (variant === "pill") {
    return (
      <div className={className}>
        {media}

        <button
          type="button"
          onClick={toggle}
          onMouseEnter={() => cue("hover")}
          disabled={failed}
          aria-label={label}
          className={`type-label group relative flex w-full items-center gap-3 overflow-hidden rounded-full border px-4 py-3 backdrop-blur-md transition-colors duration-300 ${
            failed
              ? "cursor-not-allowed border-ink/12 bg-white/70 text-ink/40"
              : "border-ink/12 bg-white/85 text-ink hover:border-blue/50"
          }`}
        >
          {failed ? (
            <AlertCircle size={15} aria-hidden="true" />
          ) : (
            <Equalizer active={playing} barClass="bg-blue" />
          )}

          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-cloud">
            {playing ? (
              <Pause size={11} fill="currentColor" aria-hidden="true" />
            ) : (
              <Play size={11} fill="currentColor" aria-hidden="true" />
            )}
          </span>

          <span className="flex-1 truncate text-left">
            {failed ? "AUDIO UNAVAILABLE" : title.toUpperCase()}
          </span>

          {!failed && ready ? (
            <span className="shrink-0 tabular-nums text-ink/45">
              {clock(duration - time)}
            </span>
          ) : null}

          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-blue transition-transform duration-150"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-3 sm:p-4 ${
        dark
          ? "border-cloud/15 bg-cloud/5 text-cloud"
          : "border-ink/10 bg-white text-ink"
      } ${className}`}
    >
      {media}

      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => cue("hover")}
        disabled={failed}
        aria-label={label}
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
          failed
            ? "cursor-not-allowed bg-ink/10 text-ink/40"
            : dark
              ? "bg-lime text-ink hover:scale-105"
              : "bg-ink text-cloud hover:scale-105"
        }`}
      >
        {failed ? (
          <AlertCircle size={18} aria-hidden="true" />
        ) : playing ? (
          <Pause size={16} fill="currentColor" aria-hidden="true" />
        ) : (
          <Play size={16} fill="currentColor" aria-hidden="true" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="type-label truncate">
            {failed ? "AUDIO UNAVAILABLE" : title.toUpperCase()}
          </p>

          <span
            className={`type-label shrink-0 tabular-nums ${dark ? "text-cloud/50" : "text-ink/45"}`}
          >
            {failed ? "—" : `${clock(time)} / ${clock(duration)}`}
          </span>
        </div>

        {failed ? (
          <p className={`mt-2 text-xs ${dark ? "text-cloud/50" : "text-ink/45"}`}>
            {subtitle ?? "Preview could not load. Use the streaming link instead."}
          </p>
        ) : (
          <>
            <div
              role="slider"
              tabIndex={0}
              aria-label={`${title} progress`}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration) || 0}
              aria-valuenow={Math.round(time)}
              aria-valuetext={clock(time)}
              onClick={seek}
              onKeyDown={(event) => {
                const audio = audioRef.current;
                if (!audio || !duration) return;

                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  audio.currentTime = Math.min(audio.currentTime + 5, duration);
                }

                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  audio.currentTime = Math.max(audio.currentTime - 5, 0);
                }

                if (event.key === " " || event.key === "Enter") {
                  event.preventDefault();
                  toggle();
                }
              }}
              className={`mt-3 h-2 w-full cursor-pointer rounded-full ${
                dark ? "bg-cloud/15" : "bg-ink/10"
              }`}
            >
              <div
                className={`h-full rounded-full ${dark ? "bg-lime" : "bg-blue"}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {subtitle ? (
              <p
                className={`mt-2 flex items-center gap-2 text-xs ${dark ? "text-cloud/50" : "text-ink/45"}`}
              >
                <Equalizer
                  active={playing}
                  bars={3}
                  className="h-2.5"
                  barClass={dark ? "bg-lime" : "bg-blue"}
                />
                {subtitle}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
