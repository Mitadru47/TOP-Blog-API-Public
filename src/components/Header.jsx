import React from "react";

import { useEffect, useState } from "react";
import { BLOG_API_BASE_URL, BLOG_API_PRIVATE_LOGIN } from "../utils/urls";

import Loader from "./Loader.jsx";

let apiCallCount = 1;

async function getIndex(setIndexResponse){

    console.log("Header - API Trigger #" + apiCallCount++);

    fetch(BLOG_API_BASE_URL + "index", { mode: 'cors' })

        .then((response) => response.json())
        .then((responseBody) => setIndexResponse(responseBody))

        .catch((error) => {
            
            console.log(error);
            
            let element = document.getElementsByClassName("loader");
            element[0].innerText = "Something went wrong!\nFailed to load Header...\n\n" + error;
        });
}

function Header(){

    const [indexResponse, setIndexResponse] = useState();
    
    useEffect(() => { 

        if(apiCallCount === 1)
            getIndex(setIndexResponse);

        if(apiCallCount > 1){
     
            const intervalID = setInterval(() => {
            getIndex(setIndexResponse); 
        
            }, 5000);
            
            // Clean-Up Function
            return (() => { clearInterval(intervalID); });
        }
    });

    if(indexResponse){

        return(

            <div id="top-nav">

                <div id="header-container"> 
                    <a id="header" href="/">Blog API</a>
                </div>

                <div id="header-info-container">
                   
                    <div id="header-info">

                        <div id="author-link"> 
                            <a id="author" href={"/index" + indexResponse.author[0].url}>Author(s)</a>
                        </div>

                        <div id="post-count-container"> 
                            <p id="post-count">Published Posts: {indexResponse.posts.length}</p>
                        </div>

                    </div>

                    <div id="author-container">
                        <a id="author" href={BLOG_API_PRIVATE_LOGIN}>Public</a>
                    </div>

                </div>

            </div>
        );
    }

    else
        return <Loader />
}

export default Header;