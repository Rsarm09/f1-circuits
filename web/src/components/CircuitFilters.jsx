import React, { useEffect, useState, useRef } from 'react';
import m from './CircuitFilters.module.css';
import '../global.css';

export default function CircuitFilters({ updateCircuits }) {
    
    const checkboxesRef = useRef([]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);

    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const filterFormData = new FormData(event.target);
        const selectedCategories = filterFormData.getAll("category");

        const queryStringArray = selectedCategories.map((id) => `category_id=${id}`);
        const queryString = queryStringArray.join("&");

        fetch(`http://localhost:3000/circuits?${queryString}`)
            .then((response) => response.json())
            .then((data) => {
                updateCircuits(data);
            });
    };

    const handleUncheckAll = () => {
        checkboxesRef.current.forEach((checkbox) => {
            if (checkbox) {
                checkbox.checked = false;
            }
        });
    };

    return (
        <div>
            <form onSubmit={handleFilterSubmit}>
                <div>
                    <h3 className={m["filter-title"]}>Filters</h3>
                    <h4>Categories</h4>
                    {categories.map((category, index) => (
                        <label key={category.id} className={m["container"]}>
                            <input
                                className={m["checkbox"]}
                                type="checkbox"
                                name="category"
                                value={category.id}
                                ref={(el) => {
                                    if (el) checkboxesRef.current[index] = el;
                                }}
                            />
                            {category.name}
                            <span className={m["checkmark"]}></span>
                        </label>
                    ))}

                    <div className="btn-container">
                        <button type="submit" className={m["clear-btn"]} onClick={handleUncheckAll}>Clear Filter</button>
                        <button type="submit">Filter</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
