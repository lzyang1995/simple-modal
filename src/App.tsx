import { useState } from "react";
import { Modal } from "./components/modal";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        点击显示Modal:
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          show Modal
        </button>
      </div>
      <div>
        点击通过Modal.info显示Modal:
        <button
          onClick={() => {
            Modal.info({
              content: "test Modal.info",
              onCancel: () => console.warn("closed!"),
            });
          }}
        >
          show Modal
        </button>
      </div>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      >
        test
      </Modal>
    </div>
  );
}

export default App;
