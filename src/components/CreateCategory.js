import React, { useEffect } from "react"
import "./CreateCategory.css"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db, auth } from "../firebase"
import { useNavigate } from "react-router-dom"

const CreateCategory = ({isAuth}) => {
    const [categoryName, setCategoryName] = useState()

    const navigate = useNavigate("")
    const createCategory = async() => {

        const response = await fetch('http://localhost:8000/categories', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: categoryName}),
          });
    
          if (!response.ok) {
            throw new Error('Incorrect username or password');
          }
    
        const data = await response.json();

        navigate("/")
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    }, [])
    return (
        <div className="createPostPage">
            <div className="postContainer">
                <h1>カテゴリを作成</h1>
                <div className="inputPost">
                    <div>カテゴリ名</div>
                    <input 
                        type="text" 
                        placeholder="タイトルを記入" 
                        onChange={(e) => setCategoryName(e.target.value)}/>
                </div>
                {/* <div className="inputPost">
                    <div>投稿</div>
                    <textarea 
                        placeholder="投稿内容を記入"
                        onChange={(e) => setPostText(e.target.value)}>
                    </textarea>
                </div> */}
                <button className="categoryButton" onClick={createCategory}></button>
            </div>
        </div>
    )
}

export default CreateCategory