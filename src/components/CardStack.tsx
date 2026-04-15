/**
 * CardStack.tsx
 * Single self-contained component — adapted from react-spring implementation.
 *
 * Dependencies:
 *   @react-spring/web  |  @use-gesture/react  |  react
 *
 * Usage:
 *   <CardStack
 *     cardList={['url1', 'url2', ...]}
 *     verticalDrag={false}
 *     horizontalDrag={true}
 *   />
 */

import React, { useState, useEffect } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

// ─── Inline styles adapted to Tribal Tattoo theme ────────────────────────────

const CARD_STACK_CSS = `
  .cs-root {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 600px;
    position: relative;
    overflow: hidden;
    background: hsl(var(--background));
    cursor: grab;
  }

  .cs-root:active {
    cursor: grabbing;
  }

  /* Deck wrapper (one per card) */
  .cs-deck-slot {
    position: absolute;
    width: 300px;
    height: 200px;
    will-change: transform;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
  }

  /* The card face - matches GallerySection dimensions */
  .cs-card-face {
    background-color: hsl(var(--card));
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    /* Desktop dimensions matching GallerySection (460px × 600px) */
    width: 460px;
    height: 600px;

    will-change: transform;
    border-radius: 18px;

    /* Shadow matching GallerySection aesthetic - no border for full image visibility */
    box-shadow:
      0 32px 80px hsl(var(--shadow-dark) / 0.15),
      0 8px 24px hsl(var(--shadow-dark) / 0.1);
  }

  .cs-card-face:active {
    cursor: grabbing;
  }

  /* Instruction text */
  .cs-instruction {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-body), sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: hsl(var(--muted-foreground) / 0.5);
    pointer-events: none;
    z-index: 10;
    animation: fadeInUp 0.6s ease-out 0.5s both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @media (max-width: 768px) {
    .cs-card-face {
      /* Mobile dimensions matching GallerySection (72vw × 4:3 aspect) */
      width: 72vw;
      height: calc(72vw * 4 / 3);
    }
  }
`;

/** Inject the stylesheet once, idempotently. */
function injectCardStackStyles(): void {
  const STYLE_ID = '__card-stack-styles__';
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = CARD_STACK_CSS;
  document.head.appendChild(el);
}

// ─── Spring helpers (identical logic to original) ─────────────────────────────

/** Resting spring target for card at position `i` in the stack. */
const toRest = (i: number, _total?: number) => ({
  x: 0,
  y: 0,  // All cards at same Y position
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});

/** Off-screen entry position (cards fall in from above). */
const fromOffscreen = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

/**
 * Translates spring values `[rot, scale]` into a CSS transform string.
 * Applies perspective + rotateX tilt for 3D effect.
 */
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

// ─── Deck component ───────────────────────────────────────────────────────────

interface DeckProps {
  /** Array of image URLs to use as cards. */
  cardList: string[];
  /** Allow cards to be flicked vertically. Default: false */
  verticalDrag?: boolean;
  /** Allow cards to be flicked horizontally. Default: true */
  horizontalDrag?: boolean;
  /** Enable auto-swipe. Default: false */
  autoSwipe?: boolean;
  /** Auto-swipe interval in milliseconds. Default: 3000 */
  autoSwipeInterval?: number;
}

const Deck: React.FC<DeckProps> = ({
  cardList,
  verticalDrag = false,
  horizontalDrag = true,
  autoSwipe = false,
  autoSwipeInterval = 3000,
}) => {
  // Track rotation offset to cycle through cards
  const [rotation, setRotation] = useState(0);
  const rotationRef = React.useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = React.useRef<NodeJS.Timeout>();

  // Keep ref in sync with state
  React.useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const [springProps, api] = useSprings(cardList.length, i => ({
    ...toRest(i),
    from: fromOffscreen(i),
  }));

  // Auto-swipe effect - cycle cards by moving front card to back
  useEffect(() => {
    if (!autoSwipe || isPaused) return;

    const interval = setInterval(() => {
      // Get the current front card index (affected by rotation)
      const frontCardIndex = rotationRef.current % cardList.length;
      
      // Animate the front card flying off to the side
      const dirX = Math.random() > 0.5 ? 1 : -1;
      
      api.start(i => {
        if (i !== frontCardIndex) return;
        
        return {
          x: (window.innerWidth + 300) * dirX,
          y: -100 + Math.random() * 200,
          rot: dirX * 20 + (Math.random() - 0.5) * 15,
          scale: 0.9,
          delay: 0,
          config: {
            friction: 50,
            tension: 200,
          },
        };
      });

      // After animation completes, move card to back and increment rotation
      setTimeout(() => {
        setRotation(prev => prev + 1);
        api.start(i => {
          if (i !== frontCardIndex) return;
          return {
            ...toRest(i),
            config: {
              friction: 50,
              tension: 500,
            },
          };
        });
      }, 400);
    }, autoSwipeInterval);

    return () => clearInterval(interval);
  }, [autoSwipe, autoSwipeInterval, api, cardList.length, isPaused]);

  // Always call useDrag (Rules of Hooks), conditionally enabled
  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx, my],
      direction: [xDir, yDir],
      velocity: [vx, vy],
    }) => {
      // Pause auto-swipe when user interacts
      if (autoSwipe && down) {
        setIsPaused(true);
        // Clear any existing resume timeout
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }
      }

      // Resume auto-swipe after 5 seconds of inactivity
      if (autoSwipe && !down) {
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }
        pauseTimeoutRef.current = setTimeout(() => {
          setIsPaused(false);
        }, 5000);
      }

      // Velocity threshold to trigger a "fling" dismissal
      const velocity = Math.sqrt(vx * vx + vy * vy);
      const trigger = velocity > 0.2;
      const dirX = xDir < 0 ? -1 : 1;
      const dirY = yDir < 0 ? -1 : 1;

      if (!down && trigger) {
        // Card was flung - cycle to next card
        setRotation(prev => prev + 1);
      }

      api.start(i => {
        if (index !== i) return; // only update the card being dragged
        const isFlung = !down && trigger;

        const x = horizontalDrag
          ? isFlung ? (200 + window.innerWidth) * dirX : down ? mx : 0
          : 0;

        const y = verticalDrag
          ? isFlung ? (200 + window.innerHeight) * dirY : down ? my : 0
          : 0;

        const rot =
          mx / 100 + my / 100 + (isFlung ? (dirX * 10 + dirY * 10) * velocity : 0);

        const scale = down ? 1.1 : 1;

        return {
          x,
          y,
          rot,
          scale,
          delay: undefined,
          config: {
            friction: 50,
            tension: down ? 800 : isFlung ? 200 : 500,
          },
        };
      });
    },
    {
      enabled: true, // Always allow manual interaction
    }
  );

  return (
    <>
      {springProps.map(({ x, y, rot, scale }, i) => {
        // Calculate visual order based on rotation
        const visualOrder = (i - rotation + cardList.length * 100) % cardList.length;
        const zIndex = cardList.length - visualOrder;
        
        return (
          <animated.div
            key={i}
            className="cs-deck-slot"
            style={{ 
              x, 
              y,
              zIndex,
            }}
          >
            <animated.div
              {...bind(i)}
              className="cs-card-face"
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url(${cardList[i]})`,
                cursor: 'grab',
              }}
            />
          </animated.div>
        );
      })}
    </>
  );
};

// ─── Root export ──────────────────────────────────────────────────────────────

/**
 * CardStack
 *
 * Drop-in root component. Renders the full container + Deck.
 */
const CardStack: React.FC<DeckProps> = (props) => {
  useEffect(() => {
    injectCardStackStyles();
  }, []);

  return (
    <div className="cs-root">
      <Deck {...props} />
    </div>
  );
};

export default CardStack;
