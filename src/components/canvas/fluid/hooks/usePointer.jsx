// import { ThreeEvent, useThree } from '@react-three/fiber';
// import { useCallback, useRef } from 'react';
// import { Vector2 } from 'three';

// export const usePointer = ({ force }) => {
//     const size = useThree((three) => three.size);
//     const splatStack = useRef([]).current;

//     const lastMouse = useRef(new Vector2());
//     const hasMoved = useRef(false);

//     const onPointerMove = useCallback(
//         (event) => {
//             const deltaX = event.x - lastMouse.current.x;
//             const deltaY = event.y - lastMouse.current.y;

//             if (!hasMoved.current) {
//                 hasMoved.current = true;
//                 lastMouse.current.set(event.x, event.y);
//             }

//             lastMouse.current.set(event.x, event.y);

//             if (!hasMoved.current) return;

//             splatStack.push({
//                 mouseX: event.x / size.width,
//                 mouseY: 1.0 - event.y / size.height,
//                 velocityX: deltaX * force,
//                 velocityY: -deltaY * force,
//             });
//         },
//         [force, size.height, size.width, splatStack]
//     );

//     return { onPointerMove, splatStack };
// };


import { useThree } from '@react-three/fiber';
import { useCallback, useRef } from 'react';
import { Vector2 } from 'three';

export const usePointer = ({ force }) => {
    const size = useThree((three) => three.size);
    const splatStack = useRef([]).current;

    const lastMouse = useRef(new Vector2());
    const isMouseInitialized = useRef(false); // Tracks if the mouse has been initialized

    const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    const onPointerMove = useCallback(
        (event) => {
            let x, y;
            if (isTouchCapable && event.touches && event.touches.length) {
                x = event.touches[0].clientX;
                y = event.touches[0].clientY;
            } else {
                x = event.clientX;
                y = event.clientY;
            }

            const deltaX = x - lastMouse.current.x;
            const deltaY = y - lastMouse.current.y;

            // Initialize mouse position on the first event
            if (!isMouseInitialized.current) {
                isMouseInitialized.current = true;
                lastMouse.current.set(x, y);
            } else {
                lastMouse.current.set(x, y);
            }

            // If the mouse is moving, push a splat
            if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
                splatStack.push({
                    mouseX: x / size.width,
                    mouseY: 1.0 - y / size.height,
                    velocityX: deltaX * force,
                    velocityY: -deltaY * force,
                });
            }
        },
        [force, size.width, size.height, splatStack, isTouchCapable] // Add isTouchCapable to the dependency array
    );

    return { onPointerMove, splatStack };
};

