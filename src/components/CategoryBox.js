import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"


const CategoryBox = ({ category }) => {
    const [subcategoriesList, setSubcategoriesList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [subCategoryName, setCategoryName] = useState('');

    const navigate = useNavigate("")

    const handleClick = () => {
        setShowForm(!showForm);
    }

    const createSubCategory = async () => {
        const response = await fetch(`http://localhost:8000/subcategories/${category.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: subCategoryName }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to create subcategory');
          }
    
        const data = await response.json();
        setSubcategoriesList((prev) => [...prev, data]);
        setCategoryName('');
        
    }

    const handleSubcategoryClick = (subcategory_id) => {
        navigate(`/subcategory/${subcategory_id}`, { state: category.id });
      };

    useEffect(() => {
        const fetchSubcategories = async () => {
            const response = await fetch(`http://localhost:8000/subcategories/category_id/${category.id}`);
            if (response.ok) {
                const data = await response.json();
                setSubcategoriesList(data);
            }
        };

        fetchSubcategories();
    }, [category.id]); 

    return (
        <div className="postContents" key={category.id}>
            <div className="category-name">{category.id}：{category.name}</div>
            <div onClick={handleClick}>➕</div>
            {showForm && (
                <>
                    <label>
                        サブカテゴリー名:
                        <input type="text" value={subCategoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </label>
                    <button onClick={createSubCategory}>Submit</button>
                </>
            )}
            {subcategoriesList.map((subcategory) => (
                <div className="subcategory-name" key={subcategory.id} onClick={() => handleSubcategoryClick(subcategory.id)}>●{subcategory.name}</div>
            ))}
        </div>
    );
}

export default CategoryBox;
