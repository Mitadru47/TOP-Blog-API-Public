import { useEffect, useState } from "react";

async function getIndex(setIndexResponse){

    fetch("http://localhost:3000/index", { mode: 'cors' })

        .then((response) => response.json())
        .then((responseBody) => setIndexResponse(responseBody))

        .catch((error) => console.log(error));
}

function Header(){

    const [indexResponse, setIndexResponse] = useState();
    useEffect(() => { getIndex(setIndexResponse); });

    if(indexResponse){

        return(

            <div id="top-nav">

                <div id="header-container"> 
                    <a id="header" href="/">Blog API</a>
                </div>

                <div id="header-info">

                    <div id="author-container"> 
                        <a id="author" href={"/index" + indexResponse.author[0].url}>Author: {indexResponse.author[0].username}</a>
                    </div>

                    <div id="post-count-container"> 
                        <p id="post-count">Posts: {indexResponse.posts.length}</p>
                    </div>

                </div>

            </div>
        );
    }

    else
        return <div className="loader">Loading Header...</div>;
}

export default Header;