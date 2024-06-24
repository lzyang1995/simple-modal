import React from "react";
import "./modal.scss";

export interface ModalProps {
  visible: boolean;
  content: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { content, visible, onClose } = props;

  return visible ? (
    <div>
      <div className="modal-mask" />
      <div className="modal-wrap">
        <div className="modal-content">
          <div>{content}</div>
          <div className="modal-btn-container">
            <button onClick={onClose}>close</button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
