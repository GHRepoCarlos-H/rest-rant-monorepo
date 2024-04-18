import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router";
import CommentCard from './CommentCard';
import NewCommentForm from "./NewCommentForm";
import { CurrentUser } from "../contexts/CurrentUser";

interface Comment {
    commentId: string;
    content: string;
    stars: number;
}

interface Place {
    placeId: string;
    name: string;
    pic: string;
    city: string;
    state: string;
    cuisines: string;
    founded: number;
    comments: Comment[];
}

function PlaceDetails() {
    const { placeId } = useParams<{ placeId: string }>();
    const history = useHistory();
    const [place, setPlace] = useState<Place | null>(null);
    const { currentUser } = useContext(CurrentUser);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/places/${placeId}`);
            const resData = await response.json();
            setPlace(resData);
        };
        fetchData();
    }, [placeId]);

    const editPlace = () => {
        history.push(`/places/${place?.placeId}/edit`);
    };

    const deletePlace = async () => {
        await fetch(`http://localhost:5000/places/${place?.placeId}`, {
            method: 'DELETE'
        });
        history.push('/places');
    };

    const deleteComment = async (deletedComment: Comment) => {
        await fetch(`http://localhost:5000/places/${place?.placeId}/comments/${deletedComment.commentId}`, {
            method: 'DELETE'
        });
        setPlace(prevPlace => ({
            ...prevPlace!,
            comments: prevPlace?.comments.filter(comment => comment.commentId !== deletedComment.commentId) || []
        }));
    };

    const createComment = async (commentAttributes: Omit<Comment, "commentId">) => {
        const response = await fetch(`http://localhost:5000/places/${place?.placeId}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentAttributes)
        });

        const comment: Comment = await response.json();

        setPlace(prevPlace => ({
            ...prevPlace!,
            comments: [
                ...prevPlace!.comments,
                comment
            ]
        }));
    };

    let comments = (
        <h3 className="inactive">
            No comments yet!
        </h3>
    );

    let rating = (
        <h3 className="inactive">
            Not yet rated
        </h3>
    );

    if (place && place.comments.length) {
        const sumRatings = place.comments.reduce((tot, c) => tot + c.stars, 0);
        const averageRating = Math.round(sumRatings / place.comments.length);
        let stars = '';
        for (let i = 0; i < averageRating; i++) {
            stars += '⭐️';
        }
        rating = (
            <h3>
                {stars} stars
            </h3>
        );

        comments = place.comments.map(comment => (
            <CommentCard key={comment.commentId} comment={comment} onDelete={() => deleteComment(comment)} />
        ));
    }

    let placeActions = null;

    if (currentUser?.role === 'admin') {
        placeActions = (
            <>
                <button className="btn btn-warning" onClick={editPlace}>
                    Edit
                </button>
                <button type="button" className="btn btn-danger" onClick={deletePlace}>
                    Delete
                </button>
            </>
        );
    }

    return (
        <main>
            <div className="row">
                <div className="col-sm-6">
                    <img style={{ maxWidth: 200 }} src={place?.pic} alt={place?.name} />
                    <h3>
                        Located in {place?.city}, {place?.state}
                    </h3>
                </div>
                <div className="col-sm-6">
                    <h1>{place?.name}</h1>
                    <h2>
                        Rating
                    </h2>
                    {rating}
                    <br />
                    <h2>
                        Description
                    </h2>
                    <h3>
                        {place?.name} has been serving {place?.city}, {place?.state} since {place?.founded}.
                    </h3>
                    <h4>
                        Serving {place?.cuisines}.
                    </h4>
                    <br />
                    {placeActions}
                </div>
            </div>
            <hr />
            <h2>Comments</h2>
            <div className="row">
                {comments}
            </div>
            <hr />
            <h2>Got Your Own Rant or Rave?</h2>
            <NewCommentForm place={place!} onSubmit={createComment} />
        </main>
    );
}

export default PlaceDetails;
