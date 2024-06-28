import { useLayoutEffect, useRef, useState } from "react";
import { useStep } from "./use-step";
import { CSSMotionProps, Status, StepStatus } from "./interface";
import { useEvent } from "./use-event";
import { useDomMotionEvents } from "./use-dom-motion-events";

export function useStatus(
  input: CSSMotionProps & { getElement: () => HTMLElement | null }
): [Status, StepStatus] {
  const {
    visible,
    onEnterPrepare,
    onLeavePrepare,
    onVisibleChanged,
    getElement,
  } = input;
  const [status, setStatus] = useState<Status>(Status.NONE);
  const onInternalMotionEnd = useEvent(() => {
    setStatus(Status.NONE);
    onVisibleChanged?.(visible);
  });
  const [patchMotionEvents] = useDomMotionEvents({
    callback: onInternalMotionEnd,
  });
  const stepCallback = useEvent((step: StepStatus) => {
    if (step === StepStatus.PREPARE && status !== Status.NONE) {
      status === Status.ENTER ? onEnterPrepare?.() : onLeavePrepare?.();
    }

    if (step === StepStatus.ACTIVE && status !== Status.NONE) {
      patchMotionEvents(getElement());
    }
  });
  const [startStep, step] = useStep({
    callback: stepCallback,
  });

  const isMounted = useRef(false);

  // 这里必须用useLayoutEffect，否则会有闪动
  useLayoutEffect(() => {
    if (visible) {
      setStatus(Status.ENTER);
      startStep();
    }

    if (isMounted.current && !visible) {
      setStatus(Status.LEAVE);
      startStep();
    }

    isMounted.current = true;
  }, [visible]);

  return [status, step];
}
