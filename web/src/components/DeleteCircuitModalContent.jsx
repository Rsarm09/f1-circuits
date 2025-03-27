import React from 'react';
import m from "./CircuitModalContent.module.css";
import '../global.css';


export default function DeleteCircuitModalContent({circuit, onClose, onCircuitDeleted}) {
    
    //grabs the circuit by its id from the database and deletes it
    const handleDeleteCircuit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:3000/circuits/${circuit.id}`, {
            method: "DELETE"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            onCircuitDeleted();
            onClose();
        })
    }
  
  //Form for deletion
    return (
        <div className={m["form-container"]}>
            <button onClick={onClose} className='close-button'>X</button>
            <h3 className={m["close-label"]}>Are you sure you want to delete {circuit.name}?</h3>
            <form onSubmit={handleDeleteCircuit}>
                <button className={m["delete-button"]} type="submit">Yes, delete this circuit</button>
            </form>
        </div>
  )
}
