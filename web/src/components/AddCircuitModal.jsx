import { useState } from "react";
import {createPortal} from "react-dom";
import ModalContent from "./AddCircuitModalContent";

export default function AddCircuitModal({onCircuitAdded}) {

    const [showModal, setShowModal] = useState(false);

  return (
    <>
        <button onClick={() => setShowModal(true)}>Add Circuit</button>
        {showModal && createPortal( <ModalContent onCircuitAdded={onCircuitAdded} onClose={() => setShowModal(false)} /> ,document.body)}

    
    </>
  )
}
