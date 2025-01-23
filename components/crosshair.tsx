import { useEffect, useRef, MutableRefObject } from "react";
import { gsap } from "gsap";

type MousePosition = {
  x: number;
  y: number;
};

const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

const getMousePos = (e: MouseEvent | globalThis.MouseEvent, container: HTMLDivElement | null): MousePosition => {
  if (!container) return { x: e.clientX, y: e.clientY };
  
  const bounds = container.getBoundingClientRect();
  return {
    x: e.clientX - bounds.left,
    y: e.clientY - bounds.top,
  };
};

interface CrosshairProps {
  color?: string;
  containerRef?: MutableRefObject<HTMLDivElement | null>;
}

const Crosshair: React.FC<CrosshairProps> = ({ 
  color = "white", 
  containerRef 
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);
  
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 },
    };

    const handleMouseMove = (ev: globalThis.MouseEvent) => {
      mouseRef.current = getMousePos(ev, containerRef?.current || null);

      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        const isOutside =
          ev.clientX < bounds.left ||
          ev.clientX > bounds.right ||
          ev.clientY < bounds.top ||
          ev.clientY > bounds.bottom;

        if (lineHorizontalRef.current && lineVerticalRef.current) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
            opacity: isOutside ? 0 : 1,
          });
        }
      }
    };

    const render = () => {
      renderedStyles.tx.current = mouseRef.current.x;
      renderedStyles.ty.current = mouseRef.current.y;

      renderedStyles.tx.previous = lerp(
        renderedStyles.tx.previous,
        renderedStyles.tx.current,
        renderedStyles.tx.amt
      );
      renderedStyles.ty.previous = lerp(
        renderedStyles.ty.previous,
        renderedStyles.ty.current,
        renderedStyles.ty.amt
      );

      if (lineVerticalRef.current && lineHorizontalRef.current) {
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    const primitiveValues = { turbulence: 0 };

    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = `url(#filter-noise-x)`;
            lineVerticalRef.current.style.filter = `url(#filter-noise-y)`;
          }
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute("baseFrequency", String(primitiveValues.turbulence));
            filterYRef.current.setAttribute("baseFrequency", String(primitiveValues.turbulence));
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = "none";
            lineVerticalRef.current.style.filter = "none";
          }
        },
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: "power1",
        startAt: { turbulence: 1 },
        turbulence: 0,
      });

    const enter = () => tl.restart();
    const leave = () => {
      tl.progress(1);
      tl.kill();
    };

    const target = containerRef?.current || window;
    target.addEventListener("mousemove", handleMouseMove as EventListener);
    animationFrameRef.current = requestAnimationFrame(render);

    const links = containerRef?.current
      ? containerRef.current.querySelectorAll("a")
      : document.querySelectorAll("a");

    links.forEach((link) => {
      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);
    });

    return () => {
      target.removeEventListener("mousemove", handleMouseMove as EventListener);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      tl.kill();
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className={`${
        containerRef ? "absolute" : "fixed"
      } top-0 left-0 w-full h-full pointer-events-none z-[10000]`}
    >
      <svg className="absolute top-0 left-0 w-full h-full">
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterXRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterYRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        className="absolute w-full h-px pointer-events-none opacity-0 transform translate-y-1/2"
        style={{ background: color }}
      />
      <div
        ref={lineVerticalRef}
        className="absolute h-full w-px pointer-events-none opacity-0 transform translate-x-1/2"
        style={{ background: color }}
      />
    </div>
  );
};

export default Crosshair;