import { Link } from 'react-router-dom';
import type {Article} from "./AddArticle.tsx";

const Blog = () => {
    const store = localStorage.getItem("articles");
    const articles: Article[] = store ? JSON.parse(store) : [];

    return (
        <div>
            <h2>Lista Artykułów</h2>
            <ul>
                {articles.map((art) => (
                    <li key={art.id}>
                        <Link to={`/article/${art.id}`}>
                            {art.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: "20px" }}>
                <Link to="/add">Dodaj nowy artykuł</Link>
            </div>
        </div>
    );
};

export default Blog;