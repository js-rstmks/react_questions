import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SubcategoryPage({ setIsAuth }) {
    const { subcategory_id } = useParams()
    const [subCategoryName, setSubCategoryName] = useState('')
    const [questionList, setQuestionList] = useState([])
  useEffect(() => {
        const getSubcategory = () => {
            fetch(`http://localhost:8000/subcategories/${subcategory_id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                setSubCategoryName(data.name)
            })
        }
        const getQuestions = () => {
            fetch(`http://localhost:8000/questions/subcategory_id/${subcategory_id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data)
                setQuestionList(data)
            })
        }
      getSubcategory()
      getQuestions()
  }, [])

  // ここでsubcategory_idを使用して必要なデータを取得したり、表示したりします
  return (
    <div>
      <h1>{subCategoryName}</h1>
      <button>Questionを作成する</button>
      {questionList.map((question) => {
                return (
                    <div key={question.id}>
                        <h2>{question.problem}</h2>
                        <p>{question.answer}</p>
                    </div>
                )
            })}
    </div>
  );
}

export default SubcategoryPage;
