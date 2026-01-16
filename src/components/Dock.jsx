import { useRef, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { gsap } from "gsap";

import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import { useWindowStore } from "#store/windows.js";

const Dock = () => {
  const { openWindow, closeWindow, restoreWindow, windows } = useWindowStore();
  const dockRef = useRef(null);
  const indicatorRefs = useRef({});
  const previousStates = useRef({});
  
  // Create a string representation of minimized states for dependency tracking
  const minimizedStates = dockApps
    .filter(({ canOpen }) => canOpen)
    .map(({ id }) => windows[id]?.isMinimized ?? false)
    .join(',');

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        })
      );
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app) => {
    if(!app.canOpen) return;

    const window = windows[app.id];

    if (!window) {
      console.error(`Window not found for app id: ${app.id}`);
      return;
    }

    // If minimized, restore it
    if (window.isMinimized) {
      restoreWindow(app.id);
    } else if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  // Initialize previous states
  useEffect(() => {
    dockApps.forEach(({ id, canOpen }) => {
      if (!canOpen) return;
      const window = windows[id];
      if (previousStates.current[id] === undefined) {
        previousStates.current[id] = window?.isMinimized ?? false;
      }
    });
  }, []);

  // Animate minimized indicators
  useEffect(() => {
    dockApps.forEach(({ id, canOpen }) => {
      if (!canOpen) return;
      
      const window = windows[id];
      const indicator = indicatorRefs.current[id];
      
      if (!indicator) return;

      const isMinimized = window?.isMinimized === true;
      const previousState = previousStates.current[id];
      
      // Only animate if state actually changed
      if (previousState === isMinimized) return;
      
      previousStates.current[id] = isMinimized;

      if (isMinimized) {
        gsap.set(indicator, { display: "block" });
        gsap.to(indicator, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(indicator, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(indicator, { display: "none" });
          },
        });
      }
    });
  }, [minimizedStates]);

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const window = windows[id];
          const isMinimized = window?.isMinimized || false;
          
          return (
            <div key={id} className="relative flex flex-col items-center">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
              {canOpen && (
                <div
                  ref={(el) => (indicatorRefs.current[id] = el)}
                  className="minimized-indicator"
                />
              )}
            </div>
          );
        })}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
