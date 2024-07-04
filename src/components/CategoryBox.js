import React from 'react'
import { useState, useEffect } from 'react'

const CategoryBox = ({ category }) => {
    const [subcategoriesList, setSubcategoriesList] = useState([]);

    useEffect(() => {
        const fetchSubcategories = async () => {
            const response = await fetch(`http://localhost:8000/subcategories/category_id/${category.id}`);
            if (response.ok) {
                const data = await response.json();
                setSubcategoriesList(data);
            }
        };

        fetchSubcategories();
    }, []); 

    return (
        <div className="postContents" key={category.id}>
            <div className="category-name">{category.id}：{category.name}</div>
                {subcategoriesList.map((subcategory) => {
                    return (
                        <div className="subcategory-name">●{subcategory.name}</div>
                        
                    )

                })}
            {/* <div className="nameAndDeleteButton">
                <h3>@{post.author.username}</h3>
                {post.author.id === auth.currentUser?.uid && (
                    <button onClick={() => handleDelete(post.id)}>削除</button>
                )}
            </div> */}
        </div>
    )
}

export default CategoryBox