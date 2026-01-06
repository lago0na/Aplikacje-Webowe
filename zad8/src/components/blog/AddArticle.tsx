import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Article{
    id: number;
    title: string;
    body: string;
}

const AddArticle = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const navigate = useNavigate();

    const handleAdd = () => {
        const newArticle: Article = {
            id: Date.now(),
            title: title,
            body: body
        };

        const oldData = localStorage.getItem("articles");
        const currentArticles: Article[] = oldData ? JSON.parse(oldData) : [];

        currentArticles.push(newArticle);

        localStorage.setItem("articles", JSON.stringify(currentArticles));

        navigate("/blog");
    };

    return (
        <div>
            <h2>Dodaj nowy artykuł</h2>
            <div>
                <input
                    type="text"
                    placeholder="Tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ display: "block", marginBottom: "10px" }}
                />
                <textarea
                    placeholder="Treść"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ display: "block", marginBottom: "10px" }}
                />
                <button onClick={handleAdd}>DODAJ</button>
            </div>
        </div>
    );
};

export default AddArticle;