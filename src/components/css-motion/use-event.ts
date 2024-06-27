import { useCallback, useRef } from "react";

export function useEvent<T extends Function>(func: T) {
    const funcRef = useRef(func)
    funcRef.current = func

    const result = useCallback((...args: any) => funcRef.current(...args), [])
    return result
}