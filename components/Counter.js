"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ num, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const steps = 60;
            let i = 0;
            const t = setInterval(() => {
              i++;
              setVal(Math.round((num * i) / steps));
              if (i >= steps) {
                setVal(num);
                clearInterval(t);
              }
            }, 22);
          }
        });
      },
      { threshold: 0.6 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [num]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
