import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

// types.ts
export interface Subcategory {
    id: number;
    name: string;
    category_id: number;
}

export interface Question {
    id: number;
    problem: string;
    answer: string[];
    subcategory_id: number;
}


const SubcategoryPage: React.FC = () => {
    const { subcategory_id } = useParams<{ subcategory_id: string }>();

    const location = useLocation()
    const subcategoryId = subcategory_id ? parseInt(subcategory_id, 10) : undefined;
    const categoryId = location.state as number;
    const ids = {
        subcategory_id: subcategoryId,
        category_id: categoryId
    };

    const [subCategoryName, setSubCategoryName] = useState<string>('');
    const [questionList, setQuestionList] = useState<Question[]>([]);

    useEffect(() => {
        const getSubcategory = async () => {
            const response = await fetch(`http://localhost:8000/subcategories/${subcategory_id}`);
            if (response.ok) {
                const data: Subcategory = await response.json();
                setSubCategoryName(data.name);
            }
        };

        const getQuestions = async () => {
            const response = await fetch(`http://localhost:8000/questions/subcategory_id/${subcategory_id}`);
            if (response.ok) {
                const data: Question[] = await response.json();
                setQuestionList(data);
            }
        };

        getSubcategory();
        getQuestions();
    }, [subcategory_id]);

    return (
        <div>
            <h1>{subCategoryName}</h1>
            <Link 
                to={{ pathname: "/createquestion" }}
                state={ids}
            >
                Questionを作成する
            </Link>
            {questionList.map((question) => (
                <div key={question.id}>
                    <h2>{question.problem}</h2>
                    {question.answer.map((answer, index) => (
                        <p key={index}>{answer}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SubcategoryPage;
