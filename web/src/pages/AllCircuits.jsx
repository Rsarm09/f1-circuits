import React, { useEffect, useState } from 'react';
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

    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }


    return (
        <>
            <div className='container'  id='circuit-list'>
                <div>
                    <button className="dropdown-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
                        {filtersOpen ? "Filters ▲" : "Filters ▼"}
                    </button>

                    {filtersOpen && <CircuitFilters updateCircuits={handleUpdatedCircuits} />}
                </div>
                <div className='racebtn-container' >
                    {circuits.map(circuit => {
                        return (
                            <div key={circuit.id}>
                                <button className="race-btn" onClick={() => scrollToElement(circuit.id)}>
                                    <span className="city">{circuit.city}</span>
                                    <span className="country">{circuit.country}</span>
                                </button>
                            </div>
                        )
                    })}
                </div>
                <AddCircuitModal onCircuitAdded={fetchCircuits} />
                {circuits.map(circuit => {
                    return (
                        <div key={circuit.id} id={circuit.id}>
                            <img src={`http://localhost:3000/images/${circuit.image}`} alt="" />
                            <h2>{circuit.name}</h2>
                            <h3>{circuit.city}, {circuit.country}</h3>
                            <h4>{circuit.category}</h4>
                            <p>{circuit.description}</p>
                            <div className='flex'>
                                <h4>Turns:</h4>
                                <p>{circuit.turns}</p>
                                <h4>Length:</h4>
                                <p>{circuit.length_km} km</p>
                            </div>
                            <div className="btn-container">
                                <UpdateCircuitModal onCircuitUpdated={fetchCircuits} circuit={circuit} />
                                <DeleteCircuitModal onCircuitDeleted={fetchCircuits} circuit={circuit} />
                            </div>
                            <button className='full-btn' onClick={() => scrollToElement('circuit-list')}>Back to Circuit List</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default AllCircuits