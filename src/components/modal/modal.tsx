import classNames from "classnames";
import { Portal } from "../portal";
import type { ModalProps } from "./interface";
import "./modal.scss";
import { useEffect, useState } from "react";

export const Modal = (props: ModalProps) => {
  const { open, onCancel, children, afterClose } = props;

  const [animatedVisible, setAnimatedVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setAnimatedVisible(true)
    }
  }, [open])

  return (
    <Portal open={open || animatedVisible}>
      <div>
        <div className="modal-mask" />
        <div className="modal-wrap">
          <div
            className={classNames("modal-content", {
              "modal-content-enter": open,
              "modal-content-leave": !open,
            })}
            onAnimationEnd={() => {
              if (open) {
                return
              }

              console.warn('animation end')
              setAnimatedVisible(false)
              afterClose?.()
            }}
          >
            <div>{children}</div>
            <div className="modal-btn-container">
              <button onClick={onCancel}>cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
