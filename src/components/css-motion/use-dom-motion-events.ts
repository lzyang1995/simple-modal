import { useEffect, useRef } from "react";

export function useDomMotionEvents(input: { callback: () => void }) {
  const { callback } = input;
  const elemRef = useRef<null | HTMLElement>(null);

  function patchMotionEvents(elem: HTMLElement | null) {
    if (elemRef.current && elemRef.current !== elem) {
      elemRef.current.removeEventListener("animationend", callback);
    }

    if (elem && elem !== elemRef.current) {
      elem.addEventListener("animationend", callback);

      elemRef.current = elem;
    }
  }

  useEffect(() => {
    return () => {
      if (elemRef.current) {
        elemRef.current.removeEventListener("animationend", callback);
      }
    };
  }, []);

  return [patchMotionEvents]
}
