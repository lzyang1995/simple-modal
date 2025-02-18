interface ModalCommonProps {
  onCancel?: () => void;
  afterClose?: () => void
}

export interface ModalProps extends ModalCommonProps {
  open: boolean;
  children: React.ReactNode;
}

export interface ModalFuncProps extends ModalCommonProps {
  content: React.ReactNode;
}
