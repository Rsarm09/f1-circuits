import React, {useEffect, useState} from 'react';
import './AllCircuits.css';
import '../global.css';
import AddCircuitModal from '../components/AddCircuitModal';
import CircuitFilters from '../components/CircuitFilters';
import DeleteCircuitModal from '../components/DeleteCircuitModal';
import UpdateCircuitModal from '../components/UpdateCircuitModal';

function AllCircuits() {

    const [circuits, setCircuits] = useState([]);

    const fetchCircuits = () => {
        fetch("http://localhost:3000/circuits")
            .then(res => res.json())
            .then((data) => {
                setCircuits(data);
            })
    }

    const handleUpdatedCircuits = (circuitsArray) => {
        setCircuits(circuitsArray);
    }

    useEffect(() => {
        fetchCircuits();

    }, [])


  return (
    <div className='container'>
        <div>
            <AddCircuitModal onCircuitAdded={fetchCircuits} />
        </div>
        <div>
            <h3>Filters</h3>
            <CircuitFilters updateCircuits={handleUpdatedCircuits}/>
        </div>
        {circuits.map(circuit => {
            return(
                <div key={circuit.id}>
                    <img src={`http://localhost:3000/images/${circuit.image}`} alt="" />
                    <h2>{circuit.name}</h2>
                    <h3>{circuit.location}</h3>
                    <h3>{circuit.category}</h3>
                    <p>{circuit.description}</p>
                    <DeleteCircuitModal onCircuitDeleted={fetchCircuits} circuit={circuit}/>
                    <UpdateCircuitModal onCircuitUpdated={fetchCircuits} circuit={circuit}/>
                </div>
            )
        })}
    
    
    
    </div>
  )
}

export default AllCircuits