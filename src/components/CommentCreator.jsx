import React from "react";
import { BLOG_API_BASE_URL } from "../utils/urls";

function handleSubmit(event, id){

    event.preventDefault();

    // Form Data Parsing

    const data = new FormData(event.currentTarget);

    const plainFormData = Object.fromEntries(data.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    // Disabling Inputs to prevent Spamming

    let body = document.getElementById("body-input");
    let username = document.getElementById("username-input");
    let email = document.getElementById("email-input"); 
    let submit = document.getElementById("submit-button");

    body.disabled = true;
    username.disabled = true;
    email.disabled = true;
    submit.disabled = true;

    // API Header Creation

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    fetch(BLOG_API_BASE_URL + "index/post/" + id + "/comment/create", {
         
            mode: "cors",
            method: "POST",
            
            headers: headers,
            body: formDataJsonString 
        })

        .then((response) => response.json())
        .then((responseBody) => {
    
            if(responseBody.status === "Failure!"){
            
                // Displaying error messages received from backend
                
                let message = document.getElementById("comment-failed-info");

                message.classList.remove("display-off");
                message.classList.add("display-on");

                let err = "";
                for(let i=0; i<responseBody.error.length; i++){
                
                    if(i === responseBody.error.length - 1)
                        err = err + responseBody.error[i].msg;

                    else
                        err = err + responseBody.error[i].msg + "\n ";
                }

                message.innerText = err;
            }

            else{

                let message = document.getElementById("comment-failed-info");

                message.classList.remove("display-on");
                message.classList.add("display-off");

                // After successful POST, removing previous comment body to prevent Spamming

                body.value = "";

                username.value = plainFormData.username;
                email.value = plainFormData.email;
            }
            
            // Re-enabling Inputs after POST

            body.disabled = false;
            username.disabled = false;
            email.disabled = false;
            submit.disabled = false;
        }
    )
        .catch((error) => console.log(error));  
}

function CommentCreator({ post }){

    return(
        
        <div id="comment-creator">

            <div id="form-container">

                <form onSubmit={(event) => handleSubmit(event, post[0]._id)}>
                    
                    <textarea id="body-input" name="body" cols="150" rows="4" defaultValue="" placeholder="Comment" required></textarea>
                    
                    <br></br>
                
                    <input id="username-input" type="text" name="username" defaultValue="" placeholder="Username" required></input>
                    <input id="email-input" type="email" name="email" defaultValue="" placeholder="Email" required></input>
                
                    <input id="post-input" type="text" name="post"  value={post[0]._id} readOnly></input>
                    <button id="submit-button" type="submit">Comment</button>

                    <div id="comment-failed-info" className="display-off">Something went wrong. Please try again!</div>

                </form>

            </div>
        </div>
    );
}

export default CommentCreator;