import React from "react";

import Header from './Header.jsx';
import Loader from "./Loader.jsx";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BLOG_API_BASE_URL } from "../utils/urls";

let apiCallCount = 1;

async function getCommentDetail(setCommentDetailResponse, postid, commentid){
    
    console.log("CommentDetail - API Trigger #" + apiCallCount++);

    fetch(BLOG_API_BASE_URL + "index/post/" + postid + "/comment/" + commentid, { mode: "cors" })
        
        .then((response) => response.json())
        .then((responseBody) => setCommentDetailResponse(responseBody))

        .catch((error) => {
            
            console.log(error);
            
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Comment...";

            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
}

function CommentDetail(){

    const { postid, commentid } = useParams();
    const [commentDetailResponse, setCommentDetailResponse] = useState();
   
    useEffect(() => { 

        if(apiCallCount === 1)
            getCommentDetail(setCommentDetailResponse, postid, commentid);

        if(apiCallCount > 1){
    
            const intervalID = setInterval(() => {
                getCommentDetail(setCommentDetailResponse, postid, commentid);
        
            }, 5000);
            
            // Clean-Up Function
            return (() => { clearInterval(intervalID); });
        }
    });

    if(commentDetailResponse){

        return(

            <div>
                <Header />

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
            </div>
        );
    }

    else
        return <Loader name="Comment"/>
}

export default CommentDetail;