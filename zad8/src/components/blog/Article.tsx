import { useParams } from 'react-router-dom';
import type {Article} from "./AddArticle.tsx";

const OneArticle = () => {
    const { id } = useParams();

    const store = localStorage.getItem("articles");
    const articles: Article[] = store ? JSON.parse(store) : [];

    const art = articles.find((a) => a.id === Number(id));

    return (
        <div>
            {art ? (
                <div>
                    <h2>{art.title}</h2>
                    <p>{art.body}</p>
                </div>
            ) : (
                <div>Nie znaleziono artykułu o takim ID.</div>
            )}

        </div>
    );
};

export default OneArticle;