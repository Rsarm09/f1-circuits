import React, { useEffect, useState } from 'react';

//CSS
import '../global.css';
import '../RaceBtn.css';

//Modals/components
import AddCircuitModal from '../components/AddCircuitModal';
import CircuitFilters from '../components/CircuitFilters';
import DeleteCircuitModal from '../components/DeleteCircuitModal';
import UpdateCircuitModal from '../components/UpdateCircuitModal';
import Hero from '../components/Hero';



//All circuits page
function AllCircuits() {

    const [circuits, setCircuits] = useState([]);
    const [filtersOpen, setFiltersOpen] = useState(false);

    //connect to the api
    const fetchCircuits = () => {
        fetch("http://localhost:3000/circuits")
            .then(res => res.json())
            .then((data) => {
                setCircuits(data);
            })
    }

    //update the circuit information
    const handleUpdatedCircuits = (circuitsArray) => {
        setCircuits(circuitsArray);
    }

    useEffect(() => {
        fetchCircuits();

    }, [])

    //scroll to id on click
    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }


    return (
        <>
        <Hero />
            <div className='container'>
                <div id='circuit-list'>
                    {/* Filter drop down*/}
                    <button className="dropdown-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
                        {filtersOpen ? "Filters ▲" : "Filters ▼"}
                    </button>

                    {filtersOpen && <CircuitFilters updateCircuits={handleUpdatedCircuits} />}
                </div>

                {/* Buttons displaying each available circuit */}
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
                {/* Add a circuit modal */}
                <AddCircuitModal onCircuitAdded={fetchCircuits} />

                {/* Map through all available circuits in the database */}
                {circuits.map(circuit => {
                    return (
                        <div key={circuit.id} id={circuit.id}>
                            <img src={`http://localhost:3000/images/${circuit.image}`} alt={circuit.name} />
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
                                {/* Update and delete button for each circuit */}
                                <UpdateCircuitModal onCircuitUpdated={fetchCircuits} circuit={circuit} />
                                <DeleteCircuitModal onCircuitDeleted={fetchCircuits} circuit={circuit} />
                            </div>
                            {/* navigate back to circuit list button */}
                            <button className='full-btn' onClick={() => scrollToElement('circuit-list')}>Back to Circuit List</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default AllCircuits