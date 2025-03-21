import React, { useEffect, useState } from 'react';
import m from './CircuitFilters.module.css';

import '../global.css';



export default function CircuitFilters({updateCircuits}) {


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
        const queryString = queryStringArray.join("&")

        fetch(`http://localhost:3000/circuits?${queryString}`)
            .then((response) => response.json())
            .then((data) => {
                updateCircuits(data);
            });
    }

  return (
    <div>
    <form onSubmit={handleFilterSubmit}>
        <div>
            <h4>Categories</h4>
            { categories.map(category => {
                return (
                    <label key={category.id}  className={m["container"]}>
                        <input className={m["checkbox"]} type="checkbox" name="category" value={category.id} />
                        { category.name }
                        <span className={m["checkmark"]}></span>
                    </label>
                )
            })}
            <button type="submit" value="Apply"> Filter
            </button>
        </div>
    </form>
</div>
  )
}
