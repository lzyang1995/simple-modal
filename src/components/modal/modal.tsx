import { Portal } from "../portal";
import type { ModalProps } from "./interface";
import "./modal.scss";

export const Modal = (props: ModalProps) => {
  const { open, onClose, children } = props;

  return (
    <Portal open={open}>
      <div>
        <div className="modal-mask" />
        <div className="modal-wrap">
          <div className="modal-content">
            <div>{children}</div>
            <div className="modal-btn-container">
              <button onClick={onClose}>close</button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
