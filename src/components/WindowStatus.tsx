import { useEffect, useState } from "react";

/**
 * Two live values, two separate effects. One effect = one concern, so each
 * cleanup is obvious and neither depends on the other.
 */
export default function WindowStatus() {
  const [now, setNow] = useState<Date>(() => new Date());
  const [width, setWidth] = useState<number>(() => window.innerWidth);

  // Effect 1: the clock.
  // Deps are [] because the effect reads nothing from props or state --
  // setNow(new Date()) builds its value from scratch every tick.
  useEffect(() => {
    const timerId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timerId);
  }, []);

  // Effect 2: the window width.
  // Also [] -- handleResize reads window.innerWidth, not `width`.
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="status" aria-live="off">
      <span className="status__time">{time}</span>
      <span className="status__sep" />
      <span className="status__width">{width}px</span>
    </div>
  );
}