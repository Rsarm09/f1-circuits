import {useState} from 'react'
import { createPortal } from 'react-dom'
import '../global.css';
import m from './UpdateCircuitModalContent.module.css';
import ModalContent from './UpdateCircuitModalContent';


export default function UpdateCircuitModal({onCircuitUpdated, circuit}) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className={m['edit-button']} onClick={() => setShowModal(true)}>Edit</button>
            {showModal && createPortal( <ModalContent onCircuitUpdated={onCircuitUpdated} circuit={circuit} onClose={() => setShowModal(false)}/>, document.body )}
        </>

  )
}
