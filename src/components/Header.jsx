import { useEffect, useState } from "react";

async function getIndex(setIndexResponse){

    fetch("http://localhost:3000/index", { mode: 'cors' })

        .then((response) => response.json())
        .then((responseBody) => setIndexResponse(responseBody))

        .catch((error) => console.log(error));
}

function HeaderInfo(props){

    if(props.indexResponse){

        const author = props.indexResponse.author;
        const posts = props.indexResponse.posts;

        return(

            <div id="header-info">

                    <div id="author-container"> 
                        <a id="author" href={"/index" + author[0].url}>Author: {author[0].username}</a>
                    </div>

                    <div id="post-count-container"> 
                        <p id="post-count">Posts: {posts.length}</p>
                    </div>

                </div>
        );
    }
}

function Header(){

    const [indexResponse, setIndexResponse] = useState();
    useEffect(() => { getIndex(setIndexResponse); });

    return(

        <div id="top-nav">

            <div id="header-container"> 
                <a id="header" href="/">Blog API</a>
            </div>

            <HeaderInfo indexResponse={indexResponse}/>

        </div>
    );
}

export default Header;