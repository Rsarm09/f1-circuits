import React, {useEffect, useState} from 'react';
import './AllCircuits.css';
import '../global.css';

function AllCircuits() {

    const [circuits, setCircuits] = useState([]);

    const fetchCircuits = () => {
        fetch("http://localhost:3000/circuits")
            .then(res => res.json())
            .then((data) => {
                setCircuits(data);
            })
    }

    useEffect(() => {
        fetchCircuits();

    }, [])


  return (
    <div className='container'>
        {circuits.map(circuit => {
            return(
                <div key={circuit.id}>
                    <h2>{circuit.name}</h2>
                    <h3>{circuit.location}</h3>
                </div>
            )
        })}
    
    
    
    </div>
  )
}

export default AllCircuits