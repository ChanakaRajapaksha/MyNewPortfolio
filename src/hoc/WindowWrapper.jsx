import { useWindowStore } from "#store/windows.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef, useEffect } from "react";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey];
    const ref = useRef(null);
    const originalBounds = useRef(null);
    const draggableInstance = useRef(null);

    // Handle window open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }, [isOpen, isMinimized]);

    // Handle minimize animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      if (isMinimized) {
        gsap.to(el, {
          scale: 0.8,
          opacity: 0,
          y: 40,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      } else if (!isMinimized && isOpen) {
        el.style.display = "block";
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      }
    }, [isMinimized]);

    // Handle maximize/restore
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;

      if (isMaximized) {
        // Store original bounds
        const rect = el.getBoundingClientRect();
        originalBounds.current = {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        };

        // Disable dragging when maximized
        if (draggableInstance.current) {
          draggableInstance.current.disable();
        }

        // Animate to full screen using fixed positioning
        gsap.set(el, { position: "fixed" });
        gsap.to(el, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else {
        // Restore original size and position
        if (originalBounds.current) {
          gsap.to(el, {
            top: originalBounds.current.y + "px",
            left: originalBounds.current.x + "px",
            width: originalBounds.current.width + "px",
            height: originalBounds.current.height + "px",
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
              // Reset to absolute positioning
              gsap.set(el, { position: "absolute", clearProps: "top,left,width,height" });
              // Re-enable dragging
              if (draggableInstance.current) {
                draggableInstance.current.enable();
              }
              originalBounds.current = null;
            },
          });
        }
      }
    }, [isMaximized]);

    // Setup draggable
    useGSAP(() => {
      const el = ref.current;
      if (!el || isMaximized) return;

      draggableInstance.current = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      })[0];

      return () => {
        if (draggableInstance.current) {
          draggableInstance.current.kill();
        }
      };
    }, [isMaximized]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      
      if (!isOpen) {
        el.style.display = "none";
      } else if (!isMinimized) {
        el.style.display = "block";
      }
    }, [isOpen, isMinimized]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
