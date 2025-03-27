import React, { useEffect, useState, useRef } from 'react';
import m from './CircuitFilters.module.css';
import '../global.css';

//Circuit filters modal
export default function CircuitFilters({ updateCircuits }) {
    //declarations
    const checkboxesRef = useRef([]);
    const [categories, setCategories] = useState([]);

    //grabs the categories from the api to be used for filtering
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);

    //submit filter button
    const handleFilterSubmit = (event) => {
        event.preventDefault();

        //grabs the form data below (checklist) and filters based on the data
        const filterFormData = new FormData(event.target);
        //grabs category to filter by
        const selectedCategories = filterFormData.getAll("category");

        //appends the user's chosen category into a query string
        const queryStringArray = selectedCategories.map((id) => `category_id=${id}`);
        //joins the query string data together
        const queryString = queryStringArray.join("&");

        //grabs the categories and appends the query string to get filtered results
        fetch(`http://localhost:3000/circuits?${queryString}`)
            .then((response) => response.json())
            .then((data) => {
                //update the shown circuits based on the data that comes back
                updateCircuits(data);
            });
    };

    //Clear checkbox form
    const handleUncheckAll = () => {
        checkboxesRef.current.forEach((checkbox) => {
            if (checkbox) {
                checkbox.checked = false;
            }
        });
    };

    return (
        <div>
            {/* Checkbox form for filtering*/}
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

                    {/* Buttons for filtering and clearing filters */}
                    <div className="btn-container">
                        <button type="submit">Filter</button>
                        <button type="submit" className={m["clear-btn"]} onClick={handleUncheckAll}>Clear Filter</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
