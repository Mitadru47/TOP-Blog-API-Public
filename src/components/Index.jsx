import { useEffect, useState } from "react";

import Post from "./Post";

async function getIndex(setIndexResponse){

    fetch("http://localhost:3000/index", { mode: 'cors' })

      .then((response) => response.json())
      .then((responseBody) => setIndexResponse(responseBody))

      .catch((error) => console.log(error));
}

function Index() {

  const [indexResponse, setIndexResponse] = useState();
  useEffect(() => { getIndex(setIndexResponse); });

  if(indexResponse){

    let index = 0;
    let lineIndex = 0;

    const posts = indexResponse.posts;

    if(posts.length > 0){

      if(posts.length <= 4){

        return (

          <div className="posts">          
            {posts.map((post) => <Post key={index} index={index++} post={post} />)}

          </div>
        );
      }

      else {

        let postsArray = [];
        let postsArrayView = [];

        posts.forEach((post) => {
                       
          postsArray[index++] = post;
            
          if(index % 4 === 0){
          
            postsArrayView[lineIndex++] = postsArray;
            postsArray = [];
          }

        });

        if(postsArray)
          postsArrayView[lineIndex] = postsArray;

        index = 0;
        lineIndex = 0;

        return (

          <div className="posts-grid">          
          
           {postsArrayView.map((postsArray) => {
            
              return (

                <div className="posts-line" key={"posts-line" + (lineIndex++)}>
                  {postsArray.map((post) => <Post key={index} index={index++} post={post} />)}
                
                </div>
              );
            })}
            
          </div>

        );
      }
    }
  }
}

export default Index;