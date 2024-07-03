import React, { useState } from "react"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import  "./Home.css"
import { useEffect } from "react"
import { auth } from "../firebase"
import CategoryBox from "./CategoryBox"

const Home = () => {
    const [categoryList, setCategoryList] = useState([])
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

    const handleDelete = async (id) => {
        console.log(88)
        await deleteDoc(doc(db, "posts", id))
        window.location.href = "/"
    }

    return (
        <div className="homePage">
            {/* {postList.map((post) => { */}
            {categoryList.map((category) => {
                return (
                    <CategoryBox category={category}></CategoryBox>
                )
            })}
        </div>
    )
}

export default Home