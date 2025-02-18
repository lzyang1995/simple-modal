import { Root, createRoot } from "react-dom/client";
import type { ModalFuncProps } from "./interface";
import { Modal } from "./modal";

const MARK = "__rc_react_root__";

function reactRender(
  node: React.ReactNode,
  container: DocumentFragment & { [MARK]?: Root }
) {
  if (!container[MARK]) {
    container[MARK] = createRoot(container);
  }

  container[MARK]?.render(node);
}

export function info(config: ModalFuncProps) {
  const container = document.createDocumentFragment() as DocumentFragment & {
    [MARK]?: Root;
  };

  let currentConfig = { ...config, close, open: true } as any;
  let timeoutId: ReturnType<typeof setTimeout>;

  function render(props: any) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      const { close, content, ...rest } = props;

      reactRender(
        <Modal
          {...rest}
          onCancel={() => {
            close();
          }}
        >
          {content}
        </Modal>,
        container
      );
    });
  }

  function destroy() {
    config.onCancel?.();
    container[MARK]?.unmount();
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        config.afterClose?.();
        destroy();
      },
    };
    render(currentConfig);
  }

  render(currentConfig);
}
