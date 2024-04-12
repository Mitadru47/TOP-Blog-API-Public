import { useEffect, useState } from "react";

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

    const posts = indexResponse.posts;

    if(posts.length > 0){

      return (

        <div className="posts-container">
        
          <div className="posts">

            <div className="post-preview">

              <div className="post-title">
                <a href={post.url}>{post.title}</a>

              </div>

              { post.body.length > 50 ? 
                <div className="post-body">{post.body.substring(0, 50) + "..."}</div> 
                : <div className="post-body">{post.body} </div>
              }

            </div>

            <div className="post-timestamp">{post.formattedTimestamp}</div>

          </div>
        
        </div>
      );
    }
  }
}

export default App