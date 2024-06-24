import { info } from "./info";
import { Modal as OriginModal } from "./modal";

const Modal: typeof OriginModal & { info: typeof info } = OriginModal as any
Modal.info = info

export { Modal }