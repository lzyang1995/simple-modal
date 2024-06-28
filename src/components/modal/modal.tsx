import { Portal } from "../portal";
import type { ModalProps } from "./interface";
import "./modal.scss";
import { useEffect, useRef, useState } from "react";
import { CSSMotion } from "../css-motion";

let mousePosition: { x: number; y: number } | null;

document.documentElement.addEventListener(
  "click",
  (e) => {
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };

    setTimeout(() => {
      mousePosition = null;
    }, 100);
  },
  true
);

export const Modal = (props: ModalProps) => {
  const { open, onCancel, children, afterClose } = props;

  const [animatedVisible, setAnimatedVisible] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center");

  useEffect(() => {
    if (open) {
      setAnimatedVisible(true);
    }
  }, [open]);

  const contentRef = useRef<null | HTMLDivElement>(null);

  return (
    <Portal open={open || animatedVisible}>
      <div>
        <CSSMotion motionName="modal-mask" visible={open}>
          {(classname, ref) => {
            return <div ref={ref} className={classname} />;
          }}
        </CSSMotion>
        <div className="modal-wrap">
          <CSSMotion
            motionName="modal-content"
            visible={open}
            onVisibleChanged={(newVisible) => {
              if (newVisible) {
                return;
              }

              setAnimatedVisible(false);
              afterClose?.();
            }}
            onEnterPrepare={() => {
              const rect = contentRef.current?.getBoundingClientRect();
              setTransformOrigin(
                mousePosition === null || !rect
                  ? "center"
                  : `${mousePosition.x - rect.left}px ${
                      mousePosition.y - rect.top
                    }px`
              );
            }}
            ref={contentRef}
          >
            {(classname, ref) => {
              return (
                <div
                  ref={ref}
                  className={classname}
                  style={{
                    transformOrigin,
                  }}
                >
                  <div>{children}</div>
                  <div className="modal-btn-container">
                    <button onClick={onCancel}>cancel</button>
                  </div>
                </div>
              );
            }}
          </CSSMotion>
        </div>
      </div>
    </Portal>
  );
};
