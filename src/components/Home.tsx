import React, { useState } from "react"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import  "./Home.css"
import { useEffect } from "react"
// import { auth } from "../firebase"
import CategoryBox from "./CategoryBox"

export interface Category {
    id: number;
    name: string;
    user_id: number;    
}


const Home: React.FC = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    useEffect(() => {
        const getCategories = () => {
            fetch('http://localhost:8000/categories')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                setCategoryList(data)
            })
        }
        getCategories()
    }, [])

    return (
        <div className="homePage">
            {categoryList.map((category) => {
                return (
                    <CategoryBox category={category} key={category.id}></CategoryBox>
                )
            })}
        </div>
    )
}

export default Home