import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CreateQuestion = () => {
    const location = useLocation()
    const { subcategory_id, category_id } = location.state;
    const [problem, setProblem] = useState()
    const [answers, setAnswers] = useState([''])
    const navigate = useNavigate("")
    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
      };
    
    const addAnswerField = () => {
    setAnswers([...answers, '']);
    };
    
    const removeAnswerField = (index) => {
    setAnswers(answers.filter((_, i) => i !== index));
    };

    const createQuestion = async() => {

        const response = await fetch('http://localhost:8000/questions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({problem: problem, answer: answers, category_id: category_id,subcategory_id: subcategory_id}),
          });
    
          if (!response.ok) {
            throw new Error('Incorrect username or password');
          }
    
        const data = await response.json();
        console.log(data)
        navigate("/")
    }
  return (
    <>
        <div className="postQuestion">
            <h1>Questionを作成</h1>
            <div className="inputPost">
                <div>Problem</div>
                <input 
                    type="text" 
                    placeholder="タイトルを記入" 
                    onChange={(e) => setProblem(e.target.value)}/>
            </div>
            {/* <div className="inputPost">
                <div>Answer1</div>
                <textarea 
                    placeholder="投稿内容を記入"
                    onChange={(e) => setAnswer(e.target.value)}>
                </textarea>
            </div>
            <div className="inputPost">
                <div>Answer2</div>
                <textarea 
                    placeholder="投稿内容を記入"
                    onChange={(e) => setAnswer(e.target.value)}>
                </textarea>
            </div> */}
            {answers.map((answer, index) => (
                <div key={index} className="inputPost">
                    <div>Answer {index + 1}</div>
                    <textarea 
                    placeholder="投稿内容を記入"
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    <button onClick={() => removeAnswerField(index)}>Remove</button>
                </div>
            ))}
            <button onClick={addAnswerField}>Add Answer</button>
            <button className="questionButton" onClick={createQuestion}>Submit</button>
        </div>
    </>
  )
}

export default CreateQuestion