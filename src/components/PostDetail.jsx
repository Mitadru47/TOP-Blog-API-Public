import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Comments from "./Comments";

async function getPostDetail(setPostDetailResponse){

    let { id } = useParams();

    fetch("http://localhost:3000/index/post/" + id, { mode: 'cors' })
        
        .then((response) => response.json())
        .then((responseBody) => setPostDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function PostDetail(){

    const [postDetailResponse, setPostDetailResponse] = useState();
    
    // useEffect(() => { getPostDetail(setPostDetailResponse); }, []);
    getPostDetail(setPostDetailResponse);

    if(postDetailResponse){

        const post = postDetailResponse.post;
        const comments = postDetailResponse.comments;

        console.log(comments[0].username);

        return(

            <div id="details">

                <div id="post-detail-container">

                    <div id="post-detail">

                        <div className="post-title">
                            <a href={post[0].url}>{post[0].title}</a>

                        </div>

                        <div className="post-body">{post[0].body}</div>

                    </div>

                    <div className="post-timestamp">{post[0].timestamp}</div>

                </div>

                <Comments comments={comments}/>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
            
            </div>
        );
    }
}

export default PostDetail;