import React from "react";

function Post(props){

    return(

        <div className="post" id={"post" + props.index}>
            <div className="post-preview">

                <div className="post-title">
                <a href={"/index" + props.post.url}>{props.post.title}</a>

                </div>

                { props.post.body.length > 50 ? <div className="post-body">{props.post.body.substring(0, 50) + "..."}</div> 
                : <div className="post-body">{props.post.body} </div> }

            </div>

            <div className="post-timestamp-container">
           
                <div className="post-timestamp">{props.post.formattedCreatedTimestamp}</div>
                <div className="post-timestamp">{!(props.post.createdTimestamp === props.post.timestamp) 
                    && ("Last Edited: " + props.post.formattedTimestamp)}</div>
            
            </div>

        </div>
    );
}

export default Post;