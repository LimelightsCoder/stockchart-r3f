import { forwardRef, useEffect, useMemo } from 'react';
import { FluidEffect } from './FluidEffect';

export const Effect = forwardRef(function Fluid(props, ref) {
    // Create a memoized instance of FluidEffect
    const effect = useMemo(() => new FluidEffect(props), [props]);

    // Clean up the effect on component unmount
    useEffect(() => {
        return () => {
            if (effect) effect.dispose();
        };
    }, [effect]);

    // Return the primitive object wrapped in a React ref
    return <primitive ref={ref} object={effect} />;
});
