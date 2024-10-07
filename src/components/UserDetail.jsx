import React from "react";

import { useEffect, useState } from "react";
import { BLOG_API_BASE_URL } from "../utils/urls";

import Header from './Header.jsx';
import Loader from "./Loader.jsx";

let apiCallCount = 1;

async function getUserDetail(setUserDetailResponse){

    console.log("UserDetail - API Trigger #" + apiCallCount++);

    fetch(BLOG_API_BASE_URL + "index/user", { mode: 'cors' })
        .then((response) => response.json())
        .then((responseBody) => setUserDetailResponse(responseBody))

        .catch((error) => {
            
            console.log(error);
          
            let loaderElements = document.getElementsByClassName("loader");
            loaderElements[0].innerText = "Something went wrong. Failed to load Author...";

            let errorElements = document.getElementsByClassName("error");
            errorElements[0].innerText = error;
        });
}

function UserDetail(props){
    
    const [userDetailResponse, setUserDetailResponse] = useState();

    useEffect(() => { 

        if(apiCallCount === 1)
            getUserDetail(setUserDetailResponse); 

        if(apiCallCount > 1){
    
            const intervalID = setInterval(() => {
            getUserDetail(setUserDetailResponse); 
        
            }, props.poll);
            
            // Clean-Up Function
            return (() => { clearInterval(intervalID); });
        }
    });

    if(userDetailResponse){
        
        return(

            <div>
                <Header poll={ props.poll }/>

                <div id="author-details">
                    
                    <div id="authorName"><strong>Author:</strong><br></br>{userDetailResponse[0].firstName + " " + userDetailResponse[0].lastName}</div>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <div><strong>Alias:</strong> {userDetailResponse[0].username}</div>
                    <div><strong>Email:</strong> {userDetailResponse[0].email}</div>

                </div>
            </div>
        );
    }

    else
        return <Loader name="Author"/>
}

export default UserDetail;