import { useEffect, useState } from "react";
import { StepStatus } from "./interface";

const stepQueue = [StepStatus.PREPARE, StepStatus.ACTIVE];

function nextFrame(callback: () => void, frameCount = 2) {
  requestAnimationFrame(() => {
    if (frameCount <= 1) {
      callback();
    } else {
      nextFrame(callback, frameCount - 1);
    }
  });
}

export function useStep(input: {
  callback: (step: StepStatus) => void;
}): [() => void, StepStatus] {
  const { callback } = input;

  const [step, setStep] = useState<StepStatus>(StepStatus.NONE);

  function startQueue() {
    setStep(StepStatus.PREPARE);
  }

  useEffect(() => {
    if (step !== StepStatus.NONE) {
      callback(step);

      const index = stepQueue.findIndex((item) => item === step);
      const nextStep = stepQueue[index + 1];

      if (nextStep) {
        nextFrame(() => {
          setStep(nextStep);
        });
      }
    }
  }, [step]);

  return [startQueue, step];
}
