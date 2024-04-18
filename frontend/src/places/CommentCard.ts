import React, { useContext } from "react";
import { CurrentUser } from "../contexts/CurrentUser";

interface Comment {
    rant: boolean;
    content: string;
    authorId: string;
    author?: {
        firstName: string;
        lastName: string;
    };
    stars: number;
}

interface Props {
    comment: Comment;
    onDelete: () => void;
}

function CommentCard({ comment, onDelete }: Props) {
    const { currentUser } = useContext(CurrentUser);

    let deleteButton: JSX.Element | null = null;

    if (currentUser?.userId === comment.authorId) {
        deleteButton = (
            <button className="btn btn-danger" onClick={onDelete}>
                Delete Comment
            </button>
        );
    }

    return (
        <div className="border col-sm-4">
            <h2 className="rant">{comment.rant ? 'Rant! 😡' : 'Rave! 😻'}</h2>
            <h4>{comment.content}</h4>
            <h3>
                <strong>- {comment.author?.firstName} {comment.author?.lastName}</strong>
            </h3>
            <h4>Rating: {comment.stars}</h4>
            {deleteButton}
        </div>
    );
}

export default CommentCard;

