import classNames from "classnames";
import { Portal } from "../portal";
import type { ModalProps } from "./interface";
import "./modal.scss";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
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

const Div = forwardRef((props: any, ref: any) => {
  useEffect(() => {
    console.warn(props.className)
  }, [props.className])
  
  return <div ref={ref} {...props} />
})

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
        <div className="modal-mask" />
        <div className="modal-wrap">
          <CSSMotion
            motionName="modal-content"
            visible={open}
            onVisibleChanged={(newVisible) => {
              if (newVisible) {
                return;
              }

              console.warn("animation end");
              setAnimatedVisible(false);
              afterClose?.();
            }}
            onEnterPrepare={() => {
              const rect = contentRef.current?.getBoundingClientRect();
              console.warn("pos", rect);
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
                <Div
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
                </Div>
              );
            }}
          </CSSMotion>
        </div>
      </div>
    </Portal>
  );
};
