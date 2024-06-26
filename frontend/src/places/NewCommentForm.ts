import React, { useContext, useState } from "react";
import { CurrentUser } from "../contexts/CurrentUser";

interface Comment {
    content: string;
    stars: number;
    rant: boolean;
}

interface NewCommentFormProps {
    place: {
        rant: boolean;
    };
    onSubmit: (comment: Comment) => void;
}

function NewCommentForm({ place, onSubmit }: NewCommentFormProps) {
    const [comment, setComment] = useState<Comment>({
        content: '',
        stars: 3,
        rant: false,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(comment);
        setComment({
            content: '',
            stars: 3,
            rant: false,
        });
    }

    const { currentUser } = useContext(CurrentUser);

    if (!currentUser) {
        return <p>You must be logged in to leave a comment</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="content">Content</label>
                    <textarea
                        required
                        value={comment.content}
                        onChange={e => setComment({ ...comment, content: e.target.value })}
                        className="form-control"
                        id="content"
                        name="content"
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="stars">Star Rating</label>
                    <input
                        value={comment.stars}
                        onChange={e => setComment({ ...comment, stars: parseFloat(e.target.value) })}
                        type="range"
                        step="0.5"
                        min="1"
                        max="5"
                        id="stars"
                        name="stars"
                        className="form-control"
                    />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="rant">Rant</label>
                    <input
                        checked={comment.rant}
                        onChange={e => setComment({ ...comment, rant: e.target.checked })}
                        type="checkbox"
                        id="rant"
                        name="rant"
                        className="form-control"
                    />
                </div>
            </div>
            <input className="btn btn-primary" type="submit" value="Add Comment" />
        </form>
    );
}

export default NewCommentForm;
