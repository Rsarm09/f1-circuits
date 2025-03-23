import React, { useEffect, useState } from 'react';
import './AllCircuits.css';
import '../global.css';
import '../RaceBtn.css';
import AddCircuitModal from '../components/AddCircuitModal';
import CircuitFilters from '../components/CircuitFilters';
import DeleteCircuitModal from '../components/DeleteCircuitModal';
import UpdateCircuitModal from '../components/UpdateCircuitModal';

function AllCircuits() {

    const [circuits, setCircuits] = useState([]);
    const [filtersOpen, setFiltersOpen] = useState(false);

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
        <>
            <div className='container'>
                <div>
                    <button className="dropdown-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
                        {filtersOpen ? "Filters ▲" : "Filters ▼"}
                    </button>

                    {filtersOpen && <CircuitFilters updateCircuits={handleUpdatedCircuits} />}
                </div>
                <div className='racebtn-container'>
                    {circuits.map(circuit => {
                        return (
                            <div key={circuit.id}>
                                <button class="race-btn">
                                    <span class="city">{circuit.city}</span>
                                    <span class="country">{circuit.country}</span>
                                </button>
                            </div>
                        )
                    })}
                </div>
                <AddCircuitModal onCircuitAdded={fetchCircuits} />
                {circuits.map(circuit => {
                    return (
                        <div key={circuit.id}>
                            <img src={`http://localhost:3000/images/${circuit.image}`} alt="" />
                            <h2>{circuit.name}</h2>
                            <h3>{circuit.city}, {circuit.country}</h3>
                            <h3>{circuit.category}</h3>
                            <p>{circuit.description}</p>
                            <div className="btn-container">
                                <UpdateCircuitModal onCircuitUpdated={fetchCircuits} circuit={circuit} />
                                <DeleteCircuitModal onCircuitDeleted={fetchCircuits} circuit={circuit} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default AllCircuits