import { useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  visible: boolean;
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = (props) => {
  const { visible, children } = props;

  const container = useMemo(() => {
    const elem = document.createElement("div");
    return elem;
  }, []);

  function append() {
    if (!container.parentElement) {
      document.body.appendChild(container);
    }
  }

  function cleanup() {
    container.parentElement?.removeChild(container);
  }

  useLayoutEffect(() => {
    if (visible) {
      append();
    } else {
      cleanup();
    }

    return cleanup;
  }, [visible]);

  return createPortal(children, container);
};
