import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from './Header.jsx';
import Loader from "./Loader.jsx";

import Comments from "./Comments";
import CommentCreator from "./CommentCreator";

import { BLOG_API_BASE_URL } from "../utils/urls";

let apiCallCount = 1;

async function getPostDetail(setPostDetailResponse, id){

    console.log("PostDetail - API Trigger #" + apiCallCount++);

    fetch(BLOG_API_BASE_URL + "index/post/" + id, { mode: 'cors' })
        
        .then((response) => response.json())
        .then((responseBody) => setPostDetailResponse(responseBody))

        .catch((error) => {
            
            console.log(error);

            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Post...";

            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
}

function PostDetail(props){

    const { id } = useParams();
    const [postDetailResponse, setPostDetailResponse] = useState();
   
    useEffect(() => { 
    
        if(apiCallCount === 1)
            getPostDetail(setPostDetailResponse, id);

        if(apiCallCount > 1){

            const intervalID = setInterval(() => {
                getPostDetail(setPostDetailResponse, id);
        
            }, props.poll);
            
            // Clean-Up Function
            return (() => { clearInterval(intervalID); });
        }
    });

    if(postDetailResponse){

        const post = postDetailResponse.post;
        const comments = postDetailResponse.comments;

        return(

            <div>
                <Header poll={ props.poll }/>

                <div id="details">

                    <div id="post-detail-container">

                        <div id="post-detail">

                            <div className="post-title">
                                <a href={"/index" + post[0].url}>{post[0].title}</a>

                            </div>

                            <div className="post-body">{post[0].body}</div>

                        </div>

                        <div className="post-detail-timestamp-container">
                                    
                            <div className="post-timestamp">{!(post[0].createdTimestamp === post[0].timestamp) && ("Edited: " + post[0].timestamp)}</div>
                            <div className="post-timestamp">Created: {post[0].createdTimestamp}</div>
                        
                        </div>

                    </div>

                    <Comments comments={comments} />

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                
                    <CommentCreator post={post} />

                </div>
            </div>
        );
    }

    else
        return <Loader name="Post"/>
}

export default PostDetail;