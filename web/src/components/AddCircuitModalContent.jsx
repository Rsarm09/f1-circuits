import React, { useState, useEffect } from 'react';
import "../global.css";
import m from "./CircuitModalContent.module.css"

export default function ModalContent({ onClose, onCircuitAdded }) {
    const [dbCategories, setDbCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [circuitName, setCircuitName] = useState('');
    const [circuitLocation, setCircuitLocation] = useState('');
    const [circuitDescription, setCircuitDescription] = useState('');
    const [circuitLength, setCircuitLength] = useState('');
    const [circuitTurns, setCircuitTurns] = useState('');
    const [image, setImage] = useState(null);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((res) => res.json())
            .then((data) => {
                setDbCategories(data);
                if (data.length > 0) {
                    setCategory(data[0].id); 
                }
            });
    }, []);

    const handleCategoryChange = (event) => {
        if (event.target.value === "-1") {
            setIsNewCategory(true);
            setCategory("");
        } else {
            setIsNewCategory(false);
            setCategory(event.target.value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let categoryId = category;

        if (isNewCategory) {
            try {
                const newCategoryResponse = await fetch("http://localhost:3000/categories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: newCategory })
                });

                const newCategoryData = await newCategoryResponse.json();

                if (!newCategoryResponse.ok) {
                    throw new Error(newCategoryData.error || "Failed to create category");
                }

                categoryId = newCategoryData.categoryId;  
                setDbCategories([...dbCategories, { id: categoryId, name: newCategory }]);
                setIsNewCategory(false);
                setCategory(categoryId);
            } catch (error) {
                console.error("Error adding category:", error);
                alert("Failed to add category.");   
                return;
            }
        }

        const lengthKmParsed = parseFloat(circuitLength);
        const turnsParsed = parseInt(circuitTurns, 10);

        if (!circuitName || !circuitLocation || isNaN(lengthKmParsed) || isNaN(turnsParsed) || !circuitDescription || !image) {
            alert("Please fill in all fields correctly.");
            return;
        }


        const formData = new FormData();
        formData.append("category_id", categoryId);
        formData.append("name", circuitName);
        formData.append("location", circuitLocation);
        formData.append("length_km", circuitLength);
        formData.append("turns", circuitTurns);
        formData.append("description", circuitDescription);
        formData.append("image", image);

        try {
            const circuitResponse = await fetch("http://localhost:3000/circuits", {
                method: "POST",
                body: formData,
            });

            const circuitData = await circuitResponse.json();

            if (!circuitResponse.ok) {
                throw new Error(circuitData.error || "Failed to add circuit");
            }

            onCircuitAdded();
            onClose();
        } catch (error) {
            console.error("Error adding circuit:", error);
            alert("Failed to add circuit.");
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data" className={m['form-container']}>
                <h2>Add Circuit</h2>
                <button type="button" onClick={onClose} className='close-button'>X</button>
                <div>
                    <label htmlFor="category">Category</label>
                    {!isNewCategory ? (
                        <select id="category" value={category} onChange={handleCategoryChange}>
                            {dbCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                            <option value="-1">New Category</option>
                        </select>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <button type="button" onClick={() => setIsNewCategory(false)}>Show List</button>
                        </>
                    )}
                </div>

                <div>
                    <label htmlFor="circuitName">Circuit Name</label>
                    <input type="text" id="circuitName" onChange={(e) => setCircuitName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="circuitLocation">Circuit Location</label>
                    <input type="text" id="circuitLocation" onChange={(e) => setCircuitLocation(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="circuitLength">Circuit Length (km)</label>
                    <input type="number" id="circuitLength" step="0.01" onChange={(e) => setCircuitLength(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="circuitTurns">Circuit Turns</label>
                    <input type="number" id="circuitTurns" onChange={(e) => setCircuitTurns(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="circuitDescription">Circuit Description</label>
                    <input type="text" id="circuitDescription" onChange={(e) => setCircuitDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                </div>

                <button type="submit">Add Circuit</button>
            </form>
        </div>
    );
}
