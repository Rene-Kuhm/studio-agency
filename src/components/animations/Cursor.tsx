'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Check if device has mouse
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) {
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
      document.body.style.cursor = 'auto';
      return;
    }

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const speed = 0.15;

    const updatePosition = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      gsap.set(cursor, {
        x: pos.x,
        y: pos.y,
      });

      gsap.set(cursorDot, {
        x: mouse.x,
        y: mouse.y,
      });

      requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Interactive elements detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      ) as HTMLElement | null;

      if (interactiveElement) {
        setIsHovering(true);
        const cursorType = interactiveElement.dataset.cursor;
        if (cursorType) {
          setCursorText(cursorType);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );

      if (interactiveElement) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    updatePosition();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: isHovering ? '80px' : '40px',
          height: isHovering ? '80px' : '40px',
          marginLeft: isHovering ? '-40px' : '-20px',
          marginTop: isHovering ? '-40px' : '-20px',
          transition: 'width 0.3s ease, height 0.3s ease, margin 0.3s ease',
        }}
      >
        <div
          className="w-full h-full rounded-full border border-white flex items-center justify-center"
          style={{
            transform: isClicking ? 'scale(0.8)' : 'scale(1)',
            transition: 'transform 0.15s ease',
            backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          {cursorText && (
            <span className="text-white text-xs font-medium uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          opacity: isHovering ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        <div className="w-full h-full rounded-full bg-accent" />
      </div>
    </>
  );
}
