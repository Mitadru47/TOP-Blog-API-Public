function Post(props){

    return(

        <div className={"post"}>
        <div className="post-preview">

            <div className="post-title">
            <a href={props.post.url}>{props.post.title}</a>

            </div>

            { props.post.body.length > 50 ? <div className="post-body">{props.post.body.substring(0, 50) + "..."}</div> 
            : <div className="post-body">{props.post.body} </div> }

        </div>

        <div className="post-timestamp">{props.post.formattedTimestamp}</div>
    </div>
    );
}

export default Post;