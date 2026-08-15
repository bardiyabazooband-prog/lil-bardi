"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Menu,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

const smartLink = "https://ffm.to/pkkj93n";
const rideOrDieAudio = "/audios/ride-or-die.mp3";

const releases = [
  {
    title: "Ride or Die",
    date: "August 7, 2026",
    type: "Single",
    image: "/Rideordie.png",
    className: "release-ride",
  },
  {
    title: "Foreign Season",
    date: "July 7, 2026",
    type: "Album · 8 songs",
    image: "/Foreignseason.png",
    className: "release-foreign",
  },
  {
    title: "Calibaby",
    date: "January 31, 2026",
    type: "EP · 4 songs",
    image: "/images/releases/calibaby.jpg",
    className: "release-calibaby",
  },
  {
    title: "Loaded Up",
    date: "June 3, 2026",
    type: "Single",
    image: "/images/releases/loaded-up.jpg",
    className: "release-loaded",
  },
  {
    title: "Racks in the Safe",
    date: "May 16, 2026",
    type: "Single",
    image: "/images/releases/racks-in-the-safe.jpg",
    className: "release-racks",
  },
  {
    title: "Rarri",
    date: "July 7, 2026",
    type: "Single",
    image: "/images/releases/rarri.jpg",
    className: "release-rarri",
  },
];

const videos = [
  {
    title: "Stacked",
    subtitle: "feat. MbxTheKidd & R3 · Official Audio",
    views: "258 views · 1 month ago",
    image: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
    featured: true,
  },
  {
    title: "Rarri",
    subtitle: "Official Audio",
    views: "58 views · 1 month ago",
    image: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
  },
  {
    title: "Road Runnin'",
    subtitle: "Official Audio",
    views: "44 views · 1 month ago",
    image: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
  },
  {
    title: "Woah, Woah",
    subtitle: "Official Audio",
    views: "79 views · 1 month ago",
    image: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
  },
  {
    title: "Two-Tone Patek",
    subtitle: "Official Audio",
    views: "33 views · 1 month ago",
    image: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
  },
  {
    title: "Malibu",
    subtitle: "Official Audio",
    views: "59 views · 1 month ago",
    image: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
  },
  {
    title: "Pullin' Up",
    subtitle: "Official Audio",
    views: "177 views · 6 months ago",
    image: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
  },
];

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "MUSIC", href: "/music" },
  { label: "RELEASES", href: "/releases" },
  { label: "VIDEOS", href: "/videos" },
  { label: "ABOUT", href: "/about" },
];

const socialLinks = [
  {
    label: "Spotify",
    icon: FaSpotify,
    href: "https://open.spotify.com/artist/0ece3eqURp6ZSahMp2J7pq?si=gBXnPXxDRBmdaibZjz0wfg",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "https://www.youtube.com/@officiallilbardi",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/officiallilbardi/",
  },
  {
    label: "TikTok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@officiallilbardi",
  },
];

const ease = [0.22, 1, 0.36, 1];

function MagneticButton({
  href,
  children,
  dark = false,
  external = false,
  className = "",
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 260,
    damping: 18,
  });

  const springY = useSpring(y, {
    stiffness: 260,
    damping: 18,
  });

  function move(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  }

  function leave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.span
      className={`magnetic-button ${
        dark ? "magnetic-button-dark" : ""
      } ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={move}
      onMouseLeave={leave}
      whileTap={{ scale: 0.97, y: 1 }}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={2.25} />
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

function TiltRelease({ release, index }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, {
    stiffness: 140,
    damping: 16,
  });

  const springY = useSpring(rotateY, {
    stiffness: 140,
    damping: 16,
  });

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(px * 10);
    rotateX.set(py * -10);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const slug = release.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <motion.article
      className={`release-node ${release.className}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay: index * 0.06, ease }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000 }}
    >
      <Link href={`/releases/${slug}`}>
        <motion.div
          className="release-art"
          style={{ rotateX: springX, rotateY: springY }}
          whileHover={{ scale: 1.025 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <img src={release.image} alt={`${release.title} cover art`} />
          <span className="release-glass" />
          <span className="release-open">
            <ArrowUpRight size={20} />
          </span>
        </motion.div>

        <div className="release-meta">
          <span>0{index + 1}</span>

          <div>
            <h3>{release.title}</h3>
            <p>
              {release.type} · {release.date}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function VideoTile({ video, index }) {
  return (
    <motion.a
      href="https://www.youtube.com/@officiallilbardi"
      target="_blank"
      rel="noreferrer"
      className={`video-tile ${video.featured ? "video-featured" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease }}
      whileHover="hover"
    >
      <div className="video-image">
        <img
          src={video.image}
          alt={`${video.title} video artwork`}
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />

        <span className="video-fallback">
          LIL BARDI / VISUAL {String(index + 1).padStart(2, "0")}
        </span>

        <motion.span
          className="video-play"
          variants={{
            hover: {
              scale: 1.12,
              rotate: 8,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 19,
          }}
        >
          <Play size={18} fill="currentColor" />
        </motion.span>
      </div>

      <div className="video-meta">
        <div>
          <h3>{video.title}</h3>
          <p>{video.subtitle}</p>
        </div>

        <span>{video.views}</span>
      </div>
    </motion.a>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const rideOrDieAudioRef = useRef(null);

  const sounds = useMemo(() => {
    if (typeof window === "undefined") return null;

    const hover = new Audio("/sounds/hover-tick.mp3");
    const click = new Audio("/sounds/button-tap.mp3");
    const nav = new Audio("/sounds/nav-shift.mp3");

    [hover, click, nav].forEach((sound) => {
      sound.preload = "auto";
      sound.volume = 0.13;
    });

    return { hover, click, nav };
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("lil-bardi-sound");
    setSoundOn(saved === "on");
  }, []);

  useEffect(() => {
    return () => {
      if (rideOrDieAudioRef.current) {
        rideOrDieAudioRef.current.pause();
      }
    };
  }, []);

  function enableInteraction() {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  }

  function playSound(name) {
    if (!soundOn || !hasInteracted || !sounds?.[name]) return;

    const sound = sounds[name];
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function toggleSound() {
    enableInteraction();

    const next = !soundOn;

    setSoundOn(next);
    window.localStorage.setItem("lil-bardi-sound", next ? "on" : "off");

    if (!soundOn) {
      setTimeout(() => {
        if (!sounds?.click) return;

        sounds.click.currentTime = 0;
        sounds.click.play().catch(() => {});
      }, 40);
    }
  }

  function updateRideOrDieProgress() {
    const audio = rideOrDieAudioRef.current;

    if (!audio || !audio.duration || Number.isNaN(audio.duration)) {
      return;
    }

    setProgress((audio.currentTime / audio.duration) * 100);
  }

  function resetRideOrDieAudio() {
    setPlaying(false);
    setProgress(0);
  }

  async function toggleRideOrDieAudio() {
    enableInteraction();

    const audio = rideOrDieAudioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
        setAudioError(false);
        playSound("click");
      } catch (error) {
        console.error("Ride or Die audio could not play:", error);
        setAudioError(true);
        setPlaying(false);
      }

      return;
    }

    audio.pause();
    setPlaying(false);
    playSound("click");
  }

  return (
    <main onPointerDown={enableInteraction}>
      <audio
        ref={rideOrDieAudioRef}
        preload="auto"
        onTimeUpdate={updateRideOrDieProgress}
        onEnded={resetRideOrDieAudio}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onError={() => {
          console.error("Ride or Die audio file failed to load.");
          setAudioError(true);
          setPlaying(false);
        }}
      >
        <source src="/audios/ride-or-die.mp3" type="audio/mpeg" />
        Your browser does not support audio playback.
      </audio>

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />

        <header className="floating-nav">
          <Link href="/" className="nav-mark" aria-label="Lil Bardi home">
            LB<span>.</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("nav")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="sound-toggle"
              type="button"
              onClick={toggleSound}
              onMouseEnter={() => playSound("hover")}
              aria-pressed={soundOn}
              aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span>SOUND {soundOn ? "ON" : "OFF"}</span>
            </button>

            <button
              className="menu-button"
              type="button"
              onClick={() => {
                setMenuOpen(true);
                playSound("nav");
              }}
              aria-label="Open navigation menu"
            >
              <Menu size={19} />
            </button>
          </div>
        </header>

        <div className="hero-content">
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease }}
            >
              <span className="live-dot" />
              OFFICIALLILBARDI / SIGNAL ACTIVE
            </motion.p>

            <div className="hero-title" aria-label="Lil Bardi">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15, duration: 0.9, ease }}
              >
                LIL
              </motion.span>

              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.26, duration: 0.9, ease }}
              >
                BARDI
              </motion.span>
            </div>

            <motion.div
              className="hero-release-copy"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.63, duration: 0.7, ease }}
            >
              <p className="eyebrow">CURRENT FREQUENCY / SINGLE 01</p>
              <h1>RIDE OR DIE</h1>
              <p className="release-date">OUT AUGUST 7, 2026</p>
            </motion.div>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.76, duration: 0.6, ease }}
            >
              <MagneticButton href={smartLink} external dark>
                LISTEN NOW
              </MagneticButton>

              <MagneticButton href={smartLink} external>
                PRESAVE NEXT RELEASE
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            className="hero-art-zone"
            initial={{ opacity: 0, scale: 0.9, rotate: -9 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ delay: 0.34, duration: 1.05, ease }}
          >
            <motion.div
              className="orbit orbit-one"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="orbit orbit-two"
              animate={{ rotate: -360 }}
              transition={{ duration: 31, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="hero-art"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/Rideordie.png" alt="Ride or Die by Lil Bardi" />
              <span className="art-shine" />
              <span className="art-code">LB / ROD / 080726</span>
            </motion.div>

            <button
              type="button"
              className={`mini-player ${audioError ? "mini-player-error" : ""}`}
              onClick={toggleRideOrDieAudio}
              onMouseEnter={() => playSound("hover")}
              aria-label={
                audioError
                  ? "Ride or Die preview is unavailable"
                  : playing
                    ? "Pause Ride or Die preview"
                    : "Play Ride or Die preview"
              }
            >
              <span className={`equalizer ${playing ? "is-playing" : ""}`}>
                <i />
                <i />
                <i />
                <i />
              </span>

              {playing ? (
                <Pause size={15} fill="currentColor" />
              ) : (
                <Play size={15} fill="currentColor" />
              )}

              <span>{audioError ? "AUDIO UNAVAILABLE" : "RIDE OR DIE"}</span>

              <span
                className="player-progress"
                style={{ transform: `scaleX(${progress / 100})` }}
                aria-hidden="true"
              />
            </button>
          </motion.div>

          <motion.aside
            className="hero-socials"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease }}
          >
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("click")}
                aria-label={label}
              >
                <Icon size={18} />
                <span>{label}</span>
              </a>
            ))}
          </motion.aside>
        </div>

        <div className="hero-bottom">
          <p>SCROLL TO ENTER THE CLIMATE</p>
          <ArrowDownRight size={18} />

          <div className="hero-route-links">
            <Link href="/music">MUSIC</Link>
            <Link href="/releases">RELEASES</Link>
            <Link href="/videos">VIDEOS</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </div>
      </section>

      <section className="signal-ticker" aria-label="Artist release ticker">
        <div className="ticker-track">
          <span>RIDE OR DIE</span>
          <i />
          <span>FOREIGN SEASON</span>
          <i />
          <span>LIL BARDI</span>
          <i />
          <span>KEEP THE SIGNAL MOVING</span>
          <i />
          <span>RIDE OR DIE</span>
          <i />
          <span>FOREIGN SEASON</span>
          <i />
          <span>LIL BARDI</span>
          <i />
          <span>KEEP THE SIGNAL MOVING</span>
          <i />
        </div>
      </section>

      <section className="latest section-shell">
        <div className="section-label">
          <span>01</span>
          <p>LATEST RELEASE / NOW IN ROTATION</p>
        </div>

        <div className="latest-layout">
          <motion.div
            className="latest-art-wrap"
            initial={{ opacity: 0, x: -38 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="latest-art-backdrop" />
            <img src="/Rideordie.png" alt="Ride or Die cover art" />
            <span className="latest-art-stamp">08 / 07 / 26</span>
          </motion.div>

          <motion.div
            className="latest-copy"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.1, ease }}
          >
            <p className="eyebrow">LIL BARDI / SINGLE</p>
            <h2>
              RIDE
              <br />
              OR DIE
            </h2>

            <p className="latest-description">
              A new Lil Bardi signal: polished pressure, high velocity, and no
              off switch.
            </p>

            <div className="waveform" aria-hidden="true">
              {Array.from({ length: 34 }).map((_, index) => (
                <span
                  key={index}
                  style={{ height: `${20 + ((index * 17) % 66)}%` }}
                />
              ))}
            </div>

            <div className="latest-actions">
              <MagneticButton href={smartLink} external dark>
                OPEN ON STREAMING
              </MagneticButton>

              <MagneticButton
                href="https://www.youtube.com/@officiallilbardi"
                external
              >
                WATCH ON YOUTUBE
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="releases-section section-shell">
        <div className="section-heading-row">
          <div className="section-label">
            <span>02</span>
            <p>RELEASE CLIMATE / 2026</p>
          </div>

          <Link href="/releases" className="text-link">
            VIEW EVERY RELEASE <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="releases-intro">
          <h2>
            EVERY DROP
            <br />
            HAS WEATHER.
          </h2>

          <p>
            A catalog built for motion: singles, projects, and different shades
            of the same frequency.
          </p>
        </div>

        <div className="release-constellation">
          {releases.map((release, index) => (
            <TiltRelease key={release.title} release={release} index={index} />
          ))}
        </div>
      </section>

      <section className="videos-section section-shell">
        <div className="section-heading-row">
          <div className="section-label">
            <span>03</span>
            <p>VISUAL ARCHIVE / YOUTUBE</p>
          </div>

          <span className="channel-stat">889 SUBSCRIBERS / 88 VIDEOS</span>
        </div>

        <div className="videos-title-row">
          <h2>
            PLAY IT
            <br />
            BACK LOUD.
          </h2>

          <Link href="/videos" className="text-link">
            ENTER THE ARCHIVE <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="video-grid">
          {videos.map((video, index) => (
            <VideoTile key={`${video.title}-${index}`} video={video} index={index} />
          ))}
        </div>
      </section>

      <section className="social-section section-shell">
        <div className="section-label">
          <span>04</span>
          <p>STAY ON FREQUENCY</p>
        </div>

        <div className="social-grid">
          <a
            href={smartLink}
            target="_blank"
            rel="noreferrer"
            className="social-panel spotify-panel"
          >
            <FaSpotify />

            <div>
              <span>SPOTIFY</span>
              <strong>LISTEN IN FULL</strong>
            </div>

            <ArrowUpRight />
          </a>

          <a
            href="https://www.youtube.com/@officiallilbardi"
            target="_blank"
            rel="noreferrer"
            className="social-panel youtube-panel"
          >
            <FaYoutube />

            <div>
              <span>YOUTUBE</span>
              <strong>889 SUBSCRIBERS / 88 VIDEOS</strong>
            </div>

            <ArrowUpRight />
          </a>

          <a
            href="https://www.instagram.com/officiallilbardi/"
            target="_blank"
            rel="noreferrer"
            className="social-panel instagram-panel"
          >
            <FaInstagram />

            <div>
              <span>INSTAGRAM</span>
              <strong>@OFFICIALLILBARDI</strong>
            </div>

            <ArrowUpRight />
          </a>

          <a
            href="https://www.tiktok.com/@officiallilbardi"
            target="_blank"
            rel="noreferrer"
            className="social-panel tiktok-panel"
          >
            <FaTiktok />

            <div>
              <span>TIKTOK</span>
              <strong>FOLLOW THE MOTION</strong>
            </div>

            <ArrowUpRight />
          </a>
        </div>
      </section>

      <footer className="final-cta">
        <div className="final-orb" />
        <p className="eyebrow">LIL BARDI / ALL SIGNALS ACTIVE</p>

        <h2>
          KEEP THE
          <br />
          SIGNAL MOVING.
        </h2>

        <MagneticButton href={smartLink} external dark>
          LISTEN TO LIL BARDI
        </MagneticButton>

        <div className="footer-row">
          <span>© 2026 LIL BARDI</span>
          <span>OFFICIAL DIGITAL WORLD</span>
          <span>BUILT FOR THE NEXT SEASON</span>
        </div>
      </footer>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at 94% 7%)" }}
            animate={{ clipPath: "circle(150% at 94% 7%)" }}
            exit={{ clipPath: "circle(0% at 94% 7%)" }}
            transition={{ duration: 0.65, ease }}
          >
            <div className="mobile-menu-orb" />

            <div className="mobile-menu-top">
              <span className="nav-mark">
                LB<span>.</span>
              </span>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={25} />
              </button>
            </div>

            <nav>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + index * 0.07,
                    duration: 0.5,
                    ease,
                  }}
                >
                  <Link href={link.href} onClick={() => setMenuOpen(false)}>
                    <span>0{index + 1}</span>
                    {link.label}
                    <ArrowUpRight />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mobile-menu-bottom">
              <button type="button" onClick={toggleSound}>
                {soundOn ? "SOUND ON" : "SOUND OFF"}
              </button>

              <span>@OFFICIALLILBARDI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}