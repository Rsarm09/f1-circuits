import React, { useState, useEffect } from 'react';
import "../global.css";
import m from "./CircuitModalContent.module.css"

//Add circuit modal displaying form that allows someone to create a new circuit

export default function ModalContent({ onClose, onCircuitAdded }) {
    //state declarations for the form
    const [dbCategories, setDbCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [circuitName, setCircuitName] = useState('');
    const [circuitCity, setCircuitCity] = useState('');
    const [circuitCountry, setCircuitCountry] = useState('');
    const [circuitDescription, setCircuitDescription] = useState('');
    const [circuitLength, setCircuitLength] = useState('');
    const [circuitTurns, setCircuitTurns] = useState('');
    const [image, setImage] = useState(null);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    //Fetch category data to classify new circuits under a chosen category
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

    //used for category dropdown for users to classify each circuit, this will check if the user
    //   creates a new category
    const handleCategoryChange = (event) => {
        if (event.target.value === "-1") {
            setIsNewCategory(true);
            setCategory("");
        } else {
            setIsNewCategory(false);
            setCategory(event.target.value);
        }
    };

    //Submits the new circuit asynchronously
    //fetches the category list and appends user created category if they make a new one
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

        //checks and changes the length/turns of a circuit if theyre the appropriate variable type
        const lengthKmParsed = parseFloat(circuitLength);
        const turnsParsed = parseInt(circuitTurns, 10);

        //stops submission if the user has not completed the form
        if (!circuitName || !circuitCity || !circuitCountry || isNaN(lengthKmParsed) || isNaN(turnsParsed) || !circuitDescription || !image) {
            alert("Please fill in all fields correctly.");
            return;
        }

        //Appends formdata to the database if submission is successful, changes the state
        const formData = new FormData();
        formData.append("category_id", categoryId);
        formData.append("name", circuitName);
        formData.append("city", circuitCity);
        formData.append("country", circuitCountry);
        formData.append("length_km", circuitLength);
        formData.append("turns", circuitTurns);
        formData.append("description", circuitDescription);
        formData.append("image", image);

        //grabs the circuit data in a try catch block in case of errors
        try {
            const circuitResponse = await fetch("http://localhost:3000/circuits", {
                method: "POST",
                body: formData,
            });

            //brings back circuit data in json format
            const circuitData = await circuitResponse.json();

            //checks if the response is available, if not, it will display an error
            if (!circuitResponse.ok) {
                throw new Error(circuitData.error || "Failed to add circuit");
            }

            //adds circuit and closes the modal
            onCircuitAdded();
            onClose();
        } catch (error) {
            //catches errors and displays them
            console.error("Error adding circuit:", error);
            alert("Failed to add circuit.");
        }
    };

    return (
        <div>
            {/* add a circuit form */}
            <form onSubmit={handleFormSubmit} encType="multipart/form-data" className={m['form-container']}>
                <h2>Add New Circuit</h2>
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
                    <label htmlFor="circuitCity">City</label>
                    <input type="text" id="circuitCity" onChange={(e) => setCircuitCity(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="circuitCountry">Country</label>
                    <input type="text" id="circuitCountry" onChange={(e) => setCircuitCountry(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="circuitLength">Length (km)</label>
                    <input type="number" id="circuitLength" step="0.01" onChange={(e) => setCircuitLength(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="circuitTurns">Turns</label>
                    <input type="number" id="circuitTurns" onChange={(e) => setCircuitTurns(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="circuitDescription">Description [255 Char]</label>
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
