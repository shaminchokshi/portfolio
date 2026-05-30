"use client";
import { useEffect, useState } from "react";
import Pipe from "./Pipe";

// Shows the rope only while in the rope region (About -> Contact), matching
// AvatarJourney's region test, so the rope appears exactly when he can grab it.
export default function PipeMount() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => {
      const about = document.getElementById("about");
      const contact = document.getElementById("contact");
      if (!about || !contact) return;
      const vh = window.innerHeight;
      const a = about.getBoundingClientRect().top <= vh * 0.45;
      const past = contact.getBoundingClientRect().bottom < vh * 0.2;
      setShow(a && !past);
    };
    check();
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    return () => {
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
    };
  }, []);
  if (!show) return null;
  return <Pipe />;
}