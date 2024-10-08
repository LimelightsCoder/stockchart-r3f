import { forwardRef, useEffect, useMemo } from 'react';
import { FluidEffect2 } from './FluidEffect2';

export const Effect2 = forwardRef(function Fluid2(props, ref) {
    // Create a memoized instance of FluidEffect
    const effect = useMemo(() => new FluidEffect2(props), [props]);

    // Clean up the effect on component unmount
    useEffect(() => {
        return () => {
            if (effect) effect.dispose();
        };
    }, [effect]);

    // Return the primitive object wrapped in a React ref
    return <primitive ref={ref} object={effect} />;
});
