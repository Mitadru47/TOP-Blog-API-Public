import React from "react";

function Comment({ comment }){

    return(

        <div className="comment">
        
            <div className="comment-details">

                <div className="comment-username">
                    <a href={"/index" + comment.url}>{comment.username}:</a>
            
                </div>
            
                <div className="comment-body">{comment.body}</div>

            </div>

            <div className="comment-tools">

                <div>
                    {!(comment.createdTimestamp === comment.timestamp) && "Edited by Post Author"}
                </div>

            </div>

        </div>
    );
}

function Comments(props){

    if(props.comments.length > 0){

        let index = 0;
        return(

            <div className="comments-container">

                <h2 id="comments-header">Comments</h2>
                {props.comments.map((comment) => <Comment key={index} index={index++} comment={comment} />)}
            
            </div>
        );
    }

    else{

        return(

            <div id="comments-container">

                <h2>Comments</h2>
                <div id="no-comments">No Comments</div>
            
            </div>
        );
    }
}

export default Comments;