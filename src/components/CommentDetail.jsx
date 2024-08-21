import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

async function getCommentDetail(setCommentDetailResponse){

    const { postid, commentid } = useParams();

    fetch("http://localhost:3000/index/post/" + postid + "/comment/" + commentid, { mode: "cors" })
        
        .then((response) => response.json())
        .then((responseBody) => setCommentDetailResponse(responseBody))

        .catch((error) => console.log(error))
}

function CommentDetail(){

    const [commentDetailResponse, setCommentDetailResponse] = useState();
    getCommentDetail(setCommentDetailResponse);

    if(commentDetailResponse){

        return(

            <div id = "comment-details">
                
                <div id="comment-header"><a href={"/index" + commentDetailResponse.comment.post.url}>{commentDetailResponse.comment.post.title}</a>/Comment</div>

                <div>

                    <div id="comment-detail-body">{commentDetailResponse.comment.body}</div>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <div><strong>Alias: </strong>{commentDetailResponse.comment.username}</div>
                    <div><strong>Email: </strong>{commentDetailResponse.comment.email}</div>

                    <br></br>
                    <br></br>

                    <div><strong>Timestamp: </strong>{commentDetailResponse.comment.timestamp}</div>

                </div>
                
            </div>
        );
    }
}

export default CommentDetail;