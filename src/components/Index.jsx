import React from "react";
import { useEffect, useState } from "react";

import Header from './Header.jsx';
import Post from "./Post";

import { BLOG_API_BASE_URL } from "../utils/urls";

let apiCallCount = 1;

async function getIndex(setIndexResponse){

  console.log("Index - API Trigger #" + apiCallCount++);

    fetch(BLOG_API_BASE_URL + "index", { mode: 'cors' })

      .then((response) => response.json())
      .then((responseBody) => setIndexResponse(responseBody))

      .catch((error) => console.log(error));
}

function Index() {

  const [indexResponse, setIndexResponse] = useState();

  useEffect(() => { 
    
    const intervalID = setInterval(() => {
      getIndex(setIndexResponse); 

    }, 5000);
    
    // Clean-Up Function
    return (() => { clearInterval(intervalID); });
  });

  if(indexResponse){

    let index = 1;

    return (

      <div>
        <Header />
      
        <div className="posts">          
          {indexResponse.posts.map((post) => <Post key={index} index={index++} post={post} />)}

        </div>
      </div>
    );
  }

  else
    return <div className="loader">Loading Index...</div>;
}

export default Index;