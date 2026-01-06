import AddArticle from "./components/blog/AddArticle.tsx";
import Blog from "./components/blog/Blog.tsx";
import OneArticle from "./components/blog/Article.tsx";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => (
    <div>
        <p>Wybierz podstronę z menu.</p>
        <Link to="/blog">Przejdź do Bloga</Link>
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', gap: '20px', padding: '10px', background: '#eee', marginBottom: '20px' }}>
                <Link to="/">Home</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/add">Dodaj Artykuł</Link>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog/>} />
                <Route path="/article/:id" element={<OneArticle/>} />
                <Route path="/add" element={<AddArticle/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
