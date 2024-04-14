import { useEffect, useState } from "react";

import Post from "./Post";

async function getIndex(setIndexResponse){

    fetch("http://localhost:3000/index", { mode: 'cors' })

        .then((response) => response.json())
        .then((responseBody) => setIndexResponse(responseBody))

        .catch((error) => console.log(error));
}

function App() {

  const [indexResponse, setIndexResponse] = useState();
  useEffect(() => { getIndex(setIndexResponse); }, []);

  if(indexResponse){

    let index = 0;
    const posts = indexResponse.posts;

    if(posts.length > 0){

      return (

        <div className="posts">
          {posts.map((post) => <Post key={index} index={index++} post={post} />)}

        </div>
      );
    }
  }
}

export default App