import { useState, useEffect } from "react"
/* Purpose of this file is to delay updating a value until the user stops typing
delay is how long to wait in milliseconds, value is what we are watching */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    /* Set a timer, when it fires update the debounced value */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        },
        delay)

        /* If the value changes before the timer ends, then start a new timer
        Resets every time a user types */ 
        return () => clearTimeout(timer)
    },
    [value, delay])
    
    return debouncedValue
}