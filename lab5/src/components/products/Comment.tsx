import {useState} from "react";

interface User {
    id: number,
    username: string,
    fullName: string
}

interface CommentProps {
    id: number,
    body: string,
    postID: number,
    user: User,
    likes: number
}

const Comment = ({id, body, user, likes}: CommentProps) => {

    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = () => {
        setLikeCount(likeCount + 1);
    };

    const handleDislike = () => {
        setLikeCount(likeCount - 1);
    };

    return (
        <div>
            <div style={{border: "2px solid #f0f0f0", padding: "10px", background: "white", color: "black"}}>
                <div style={{padding: "5px", background: "#f0f0f0"}}>
                    <strong>ID: {id}</strong> | Autor: {user.fullName} (@{user.username})
                </div>

                <p style={{padding: "10px"}}>{body}</p>

                <div style={{marginTop: "10px", display: "flex", gap: "20px", alignItems: "center"}}>
                    <strong>Likes: {likeCount}</strong>
                    <button onClick={handleLike}>👍 +1</button>
                    <button onClick={handleDislike}>👎 -1</button>
                </div>
            </div>
        </div>
    );
};
export default Comment;