import { useState } from "react";
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
                    
                    <div className="comment-timestamp-container">
                            
                        <div><strong>Created: </strong>{commentDetailResponse.comment.createdTimestamp}</div>
                        <div>{!(commentDetailResponse.comment.createdTimestamp === commentDetailResponse.comment.timestamp) 
                            && (<p style={{margin:0}}><strong>Edited: </strong>{commentDetailResponse.comment.timestamp}</p>)}</div>
                    
                    </div>
                    
                </div>
                
            </div>
        );
    }

    else
        return <div className="loader">Loading Comment...</div>;
}

export default CommentDetail;