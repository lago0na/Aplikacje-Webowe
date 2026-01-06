import Comment from "./Comment.tsx";
import {useEffect, useState} from "react";

interface User {
    id: number,
    username: string,
    fullName: string
}

interface CommentData {
    id: number,
    body: string,
    postID: number,
    user: User,
    likes: number
}

interface ApiResponse {
    comments: CommentData[];
    total: number;
    skip: number;
    limit: number;
}

const Comments = () => {

    const [comments, setComments] = useState<CommentData[]>([]);

    useEffect(() => {
        fetch('https://dummyjson.com/comments')
            .then(res => res.json())
            .then((data: ApiResponse) => {
                setComments(data.comments);
            })
            .catch(err => console.error("Błąd pobierania danych:", err));
    }, []);

    return (
        <div>
            <h1>Comments from API</h1>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    body={comment.body}
                    postID={comment.postID}
                    user={comment.user}
                    likes={comment.likes}
                />
            ))}
        </div>
    );
};
export default Comments;