"use client";
import { useEffect, useRef, useState } from "react";

// Manages the browser Web Speech API and exposes a `speakingRef`
// that the 3D avatar reads each frame to animate its mouth.
// Prefers a MALE English voice.
const MALE_HINTS = [
  "david", "mark", "guy", "daniel", "aaron", "fred", "alex", "rishi",
  "george", "james", "ryan", "thomas", "google uk english male",
  "microsoft david", "microsoft mark", "microsoft guy", "male",
];

export default function useTalk() {
  const speakingRef = useRef(false);
  const voiceRef = useRef(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    setSupported(true);

    const pick = () => {
      const vs = window.speechSynthesis.getVoices();
      if (!vs.length) return;
      const en = vs.filter((v) => /^en/i.test(v.lang));
      const pool = en.length ? en : vs;
      // 1) explicit male-named voice
      let chosen = pool.find((v) => MALE_HINTS.some((h) => v.name.toLowerCase().includes(h)));
      // 2) prefer en-US/en-GB if no clear male name
      if (!chosen) chosen = pool.find((v) => /en[-_](US|GB)/i.test(v.lang));
      // 3) fallback
      voiceRef.current = chosen || pool[0] || vs[0] || null;
    };

    pick();
    window.speechSynthesis.onvoiceschanged = pick;
    return () => {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    };
  }, []);

  const speak = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = 0.96;   // slightly slower = more natural, masculine cadence
    u.pitch = 0.8;   // lower pitch reinforces a male tone
    u.volume = 1;
    u.onstart = () => (speakingRef.current = true);
    u.onend = () => (speakingRef.current = false);
    u.onerror = () => (speakingRef.current = false);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      speakingRef.current = false;
    }
  };

  return { speak, stop, speakingRef, supported };
}
