import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Comments from "./Comments";
import CommentCreator from "./CommentCreator";

import { BLOG_API_BASE_URL } from "../utils/urls";

async function getPostDetail(setPostDetailResponse){

    let { id } = useParams();

    fetch(BLOG_API_BASE_URL + "index/post/" + id, { mode: 'cors' })
        
        .then((response) => response.json())
        .then((responseBody) => setPostDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function PostDetail(){

    const [postDetailResponse, setPostDetailResponse] = useState();
    getPostDetail(setPostDetailResponse);

    if(postDetailResponse){

        const post = postDetailResponse.post;
        const comments = postDetailResponse.comments;

        return(

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
        );
    }

    else
        return <div className="loader">Loading Post...</div>;
}

export default PostDetail;