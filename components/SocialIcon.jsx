import { FaInstagram, FaSpotify, FaTiktok, FaYoutube } from "react-icons/fa6";

const ICONS = {
  spotify: FaSpotify,
  youtube: FaYoutube,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

/** Renders the correct brand glyph for a social key from lib/site.js. */
export default function SocialIcon({ name, className = "", size }) {
  const Icon = ICONS[name];
  if (!Icon) return null;

  return <Icon aria-hidden="true" className={className} size={size} />;
}
