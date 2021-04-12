import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const Panel = styled.div<{ open: boolean }>`
  box-sizing: content-box;
  height: var(--panel-height, 0px);
  opacity: ${({ open }) => (open ? 1 : 0)};
  overflow: hidden;
  pointer-events: ${({ open }) => !open && 'none'};
  transition-duration: var(--transition-duration, 0.15s);
  transition-property: height, opacity;
  transition-timing-function: ease;

  &[hidden] {
    display: block;
  }
`;

/**
 * Wraps around an element, placing all child components inside an extra DIV which is used to
 * determine their total height. This is used to animate when the panel is opened and closed.
 */
export default function AnimatedPanel<T extends React.ElementType>({
  component: Component,
  children,
  open,
  ...rest
}: ComponentPropsWithoutRef<T> & { component: T; open: boolean }): React.ReactElement {
  const panelRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);

  const [animate, setAnimate] = useState(false);

  // Disable animations for a brief period after the component is first rendered. Reach UI's
  // AccordionPanel sets the initial open state _after_ the first render, which results in
  // superflous animations.
  useEffect(() => {
    window.setTimeout(() => setAnimate(true), 200);
  }, []);

  useEffect(() => {
    if (!panelRef.current || !heightRef.current) {
      return;
    }

    const currentHeight = panelRef.current.style.height;

    if (!animate || currentHeight === '') {
      // Initial render
      panelRef.current.style.height = open ? 'auto' : '0px';
      return;
    }

    if (open === (currentHeight !== '0px')) {
      // Skip if DOM already represents current state (`animate` probably changed).
      return;
    }

    window.requestAnimationFrame(() => {
      panelRef.current &&
        heightRef.current &&
        (panelRef.current.style.height = `${heightRef.current.clientHeight}px`);
    });

    if (open) {
      let currentRender = true;

      panelRef.current.addEventListener(
        'transitionend',
        // Don't set the height when the disclosure is closed prior to the transition completing.
        // () => currentRender && setHeight('auto'),
        () => {
          currentRender && panelRef.current && (panelRef.current.style.height = 'auto');
        },
        { once: true }
      );

      return () => {
        currentRender = false;
      };
    } else {
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(
          () => panelRef.current && (panelRef.current.style.height = '0px')
        )
      );
    }
  }, [open, animate]);

  return (
    <Component
      {...rest}
      as={Panel}
      open={open}
      ref={panelRef}
      style={{ '--transition-duration': animate ? undefined : 0 }}
    >
      <div ref={heightRef}>{children}</div>
    </Component>
  );
}
