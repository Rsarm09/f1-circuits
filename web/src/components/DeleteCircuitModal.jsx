import {useState} from 'react'
import { createPortal } from 'react-dom'
import DeleteCircuitModalContent from './DeleteCircuitModalContent';
import '../global.css';

export default function DeleteCircuitModal({circuit, onCircuitDeleted}) {
  const [showModal, setShowModal] = useState(false)
  
    return (
    <>
        <button onClick={() => {setShowModal(true)}}>Delete</button>
        
        {showModal && createPortal(
            <DeleteCircuitModalContent
                 circuit={circuit}
                 onCircuitDeleted={onCircuitDeleted}
                 onClose={ () => {setShowModal(false)}} />,
            document.body
        )}
    
    </>
  )
}
