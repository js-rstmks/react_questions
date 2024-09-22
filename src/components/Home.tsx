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
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [limit, setLimit] = useState(7);
    useEffect(() => {
        const getPageCount = async () => {
            fetch(`http://127.0.0.1:8000/categories/page_count`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                setPageCount(data)
            })
        }
        if (pageCount === 0) {
            
        }
        getPageCount()
    }, [])
    useEffect(() => {
        if (page < 1) {
            setPage(1)
            return
        }

        if (page > 10) {
            setPage(10)
            return
        }
        const skip = (page - 1) * limit;
        console.log(skip)
        const getCategories = () => {
            // fetch('http://localhost:8000/categories')
            fetch(`http://127.0.0.1:8000/categories?skip=${skip}&limit=${limit}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                // if (data.length === 0) {
                if (data.length > 0) {
                    setCategoryList(data)
                }
                // return
            })
        }
        getCategories()

    }, [page, limit, pageCount])

    return (
        <div className="homePage">
            {categoryList.map((category) => {
                return (
                    <CategoryBox category={category} key={category.id}></CategoryBox>
                )
            })}
            <div className="pagination">
                <button onClick={() => setPage(page - 1)}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    )
}

export default Home