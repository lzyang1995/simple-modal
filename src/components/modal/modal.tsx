import { Portal } from "../portal";
import "./modal.scss";

export interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = (props: ModalProps) => {
  const { visible, onClose, children } = props;

  return (
    <Portal visible={visible}>
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
