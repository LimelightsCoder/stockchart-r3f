import * as THREE from 'three';
import { useFBO } from '@react-three/drei';
import { useRef, useEffect } from 'react';

// Create the useDoubleFBO hook
export const useDoubleFBO = (width, height, options) => {
    const read = useFBO(width, height, options);
    const write = useFBO(width, height, options);

    const fbo = useRef({
        read,
        write,
        swap: () => {
            const temp = fbo.current.read;  // This access should be safe now
            fbo.current.read = fbo.current.write;
            fbo.current.write = temp;
        },
        dispose: () => {
            read.dispose();
            write.dispose();
        },
    });

    // Make sure to assign the FBO properties on first render
    useEffect(() => {
        fbo.current.read = read;
        fbo.current.write = write;
    }, [read, write]);

    return fbo.current;
};
