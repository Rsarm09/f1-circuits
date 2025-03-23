import { useState } from "react";
import {createPortal} from "react-dom";
import ModalContent from "./AddCircuitModalContent";
import '../global.css';

export default function AddCircuitModal({onCircuitAdded}) {

    const [showModal, setShowModal] = useState(false);

  return (
    <>
        <button onClick={() => setShowModal(true)} className="newCircuit-btn">Add New Circuit</button>
        {showModal && createPortal( <ModalContent onCircuitAdded={onCircuitAdded} onClose={() => setShowModal(false)} /> ,document.body)}    
    </>
  )
}
