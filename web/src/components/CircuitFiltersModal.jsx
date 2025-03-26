import { useState } from "react";
import {createPortal} from "react-dom";
import ModalContent from "./CircuitFilters";

export default function CircuitFiltersModal({}) {

    const [showModal, setShowModal] = useState(false);

  return (
    <>
        <button onClick={() => setShowModal(true)}>Filter</button>
        {showModal && createPortal( <ModalContent updateCircuits={updateCircuits} onClose={() => setShowModal(false)} /> ,document.body)}    
    </>
  )
}
