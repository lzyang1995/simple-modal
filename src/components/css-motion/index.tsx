import { forwardRef, useCallback, useEffect, useRef } from "react";
import { CSSMotionProps, Status } from "./interface";
import { useStatus } from "./use-status";

export const CSSMotion = forwardRef<null | HTMLElement, CSSMotionProps>(
  (props, ref) => {
    const { children, motionName, visible } = props;
    const nodeRef = useRef<null | HTMLElement>(null);

    const setNodeRef = useCallback((node: HTMLElement | null) => {
      nodeRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, []);

    const [status, step] = useStatus({
      ...props,
      getElement: () => nodeRef.current,
    });

    if (status === Status.NONE) {
      return visible ? children(motionName, setNodeRef) : null;
    } else {
      return children(
        `${motionName} ${motionName}-${status} ${motionName}-${status}-${step}`,
        setNodeRef
      );
    }
  }
);
