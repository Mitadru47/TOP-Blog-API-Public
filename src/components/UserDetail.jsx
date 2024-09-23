import React from "react";

import { useEffect, useState } from "react";
import { BLOG_API_BASE_URL } from "../utils/urls";

let apiCallCount = 1;

async function getUserDetail(setUserDetailResponse){

    console.log("UserDetail - API Trigger #" + apiCallCount++);

    fetch(BLOG_API_BASE_URL + "index/user", { mode: 'cors' })
        .then((response) => response.json())
        .then((responseBody) => setUserDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function UserDetail(){
    
    const [userDetailResponse, setUserDetailResponse] = useState();

    useEffect(() => { 
    
        const intervalID = setInterval(() => {
          getUserDetail(setUserDetailResponse); 
    
        }, 5000);
        
        // Clean-Up Function
        return (() => { clearInterval(intervalID); });
    });

    if(userDetailResponse){
        
        return(

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
        );
    }

    else
        return <div className="loader">Loading Author...</div>;
}

export default UserDetail;