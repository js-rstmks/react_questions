import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SubcategoryPage() {
    const { subcategory_id } = useParams()
    const [subCategoryName, setSubCategoryName] = useState('')
    const [questionList, setQuestionList] = useState([])
    const location = useLocation()
    const ids = {
        subcategory_id: subcategory_id,
        category_id: location.state
    } 
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
                setQuestionList(data)
            })
        }
      getSubcategory()
      getQuestions()
  }, [])

  return (
    <div>
      <h1>{subCategoryName}</h1>
        <Link to={{ 
            pathname: "/createquestion",
            }}
            state= { ids }
        >
            Questionを作成する
        </Link>
      {questionList.map((question) => {
                return (
                    <div key={question.id}>
                        <h2>{question.problem}</h2>
                        {question.answer.map((answer, index) => (
                            <p key={index}>{answer}</p>
                        ))}
                    </div>
                )
            })}
    </div>
  );
}

export default SubcategoryPage;
