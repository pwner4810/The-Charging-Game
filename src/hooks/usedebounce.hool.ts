import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set debouncedValue to value (passed in) after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Only re-call effect if value or delay changes

    return debouncedValue;
};

export default useDebounce;
