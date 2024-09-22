import React from "react";
import { useEffect, useState } from "react";

import Post from "./Post";
import { BLOG_API_BASE_URL } from "../utils/urls";

let apiCallCount = 0;

async function getIndex(setIndexResponse){

  console.log("API Trigger #" + apiCallCount++);

    fetch(BLOG_API_BASE_URL + "index", { mode: 'cors' })

      .then((response) => response.json())
      .then((responseBody) => setIndexResponse(responseBody))

      .catch((error) => console.log(error));
}

function Index() {

  const [indexResponse, setIndexResponse] = useState();
  useEffect(() => { getIndex(setIndexResponse); }, []);

  if(indexResponse){

    let index = 1;

    return (

      <div className="posts">          
        {indexResponse.posts.map((post) => <Post key={index} index={index++} post={post} />)}

      </div>
    );
  }

  else
    return <div className="loader">Loading Index...</div>;
}

export default Index;