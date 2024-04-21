function CommentCreator({ post }){

    return(
        
        <div id="comment-creator">
            <div id="form-container">

                <form action={post[0].url + "/comment/create"} method="POST">
                    
                    <textarea id="body-input" name="body" cols="150" rows="4" placeholder="Comment"></textarea>
                    
                    <br></br>
                
                    <input type="text" name="username" placeholder="Username"></input>
                    <input id="email-input" type="text" name="email" placeholder="Email"></input>
                    <input id="post-input" type="text" name="post"  value={post[0]._id} readOnly></input>
                
                    <button id="submit-button" type="submit">Comment</button>
                
                </form>

            </div>
        </div>
    );
}

export default CommentCreator;