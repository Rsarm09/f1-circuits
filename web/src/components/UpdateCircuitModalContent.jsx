import { useEffect, useState } from "react";
import m2 from "./CircuitModalContent.module.css";
import "../global.css";

export default function UpdateCircuitModalContent({ onClose, onCircuitUpdated, circuit }) {
  const [dbCategories, setDbCategories] = useState([]);
  const [categories, setCategories] = useState(circuit.category_id ?? "");
  const [image, setImage] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [circuitName, setCircuitName] = useState(circuit.name ?? "");
  const [circuitCity, setCircuitCity] = useState(circuit.city ?? "");
  const [circuitCountry, setCircuitCountry] = useState(circuit.country ?? "");
  const [circuitLength, setCircuitLength] = useState(circuit.length_km ?? "");
  const [circuitTurns, setCircuitTurns] = useState(circuit.turns ?? "");
  const [circuitDescription, setCircuitDescription] = useState(circuit.description ?? "");

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setDbCategories(data);

        if (data.length > 0 && !categories) {
          setCategories(data[0].id);
        }
      });
  }, []);

  const handleCategorySelectChange = (event) => {
    if (event.target.value === "-1") {
      setIsNewCategory(true);
      setCategories("");
    } else {
      setIsNewCategory(false);
      setCategories(event.target.value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let categoryId = categories;

    if (isNewCategory) {
      const categoryResponse = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_category: newCategory }),
      });

      const categoryData = await categoryResponse.json();
      categoryId = categoryData.categoryId;
    }

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("name", circuitName);
    formData.append("city", circuitCity);
    formData.append("country", circuitCountry);
    formData.append("length_km", circuitLength);
    formData.append("turns", circuitTurns);
    formData.append("description", circuitDescription);
    formData.append("image", image);

    const circuitResponse = await fetch(`http://localhost:3000/circuits/${circuit.id}`, {
      method: "PUT",
      body: formData,
    });

    const circuitResult = await circuitResponse.json();
    console.log("Success:", circuitResult);

    onCircuitUpdated();
    onClose();
  };

  return (
    <div>
      <div className={m2["form-container"]}>
        <h3>Edit Circuit</h3>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="category">Category</label>
            {!isNewCategory ? (
              <select
                name="category"
                id="category_id"
                value={categories}
                onChange={handleCategorySelectChange}
              >
                {dbCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={circuitName}
              onChange={(e) => setCircuitName(e.target.value)}
            />
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={circuitCity}
              onChange={(e) => setCircuitCity(e.target.value)}
            />
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              value={circuitCountry}
              onChange={(e) => setCircuitCountry(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={circuitDescription}
              onChange={(e) => setCircuitDescription(e.target.value)}
            />
            <label>Current Image</label>
            <img src={`http://localhost:3000/images/${circuit.image}`} alt={circuit.name} />
            <label htmlFor="image">Upload New Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <button type="submit" className="full-btn">Save</button>
          </div>
        </form>
        <button onClick={onClose} className='close-button'>
          x
        </button>
      </div>
    </div>
  );
}
