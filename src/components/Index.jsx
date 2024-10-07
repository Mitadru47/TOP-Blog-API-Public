import React from "react";
import { useEffect, useState } from "react";

import Header from './Header.jsx';
import Loader from "./Loader.jsx";

import Post from "./Post";

import { BLOG_API_BASE_URL } from "../utils/urls";

let apiCallCount = 1;

async function getIndex(setIndexResponse){

  console.log("Index - API Trigger #" + apiCallCount++);

    fetch(BLOG_API_BASE_URL + "index", { mode: 'cors' })

      .then((response) => response.json())
      .then((responseBody) => setIndexResponse(responseBody))

      .catch((error) => {
            
        console.log(error);
      
        let loaderElements = document.getElementsByClassName("loader");
        loaderElements[0].innerText = "Something went wrong. Failed to load Index...";

        let errorElements = document.getElementsByClassName("error");
        errorElements[0].innerText = error;
    });
}

function Index(props) {

  const [indexResponse, setIndexResponse] = useState();

  useEffect(() => { 
    
    if(apiCallCount === 1)
      getIndex(setIndexResponse);

    if(apiCallCount > 1){

      const intervalID = setInterval(() => {
        getIndex(setIndexResponse); 

      }, props.poll);
      
      // Clean-Up Function
      return (() => { clearInterval(intervalID); });
    }
  });

  if(indexResponse){

    let index = 1;

    return (

      <div>
        <Header poll={ props.poll }/>
      
        <div className="posts">          
          {indexResponse.posts.map((post) => <Post key={index} index={index++} post={post} />)}

        </div>
      </div>
    );
  }

  else
    return <Loader name="Index"/>
}

export default Index;