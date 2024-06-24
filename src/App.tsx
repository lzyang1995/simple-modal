import { useState } from "react";
import { Modal } from "./components/modal/modal";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div>
        点击显示Modal:
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          show Modal
        </button>
      </div>
      <Modal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        test
      </Modal>
    </div>
  );
}

export default App;
