function Header(props){

    return(

        <div id="top-nav">

            <div id="header-container"> 
                <a id="header" href="/">Blog API</a>
            </div>

            <div id="header-info">

                <div id="author-container"> 
                    <a id="author" href={author[0].url}>Author: {author[0].username}</a>
                </div>

                <div id="post-count-container"> 
                    <p id="post-count">Posts: {posts.length}</p>
                </div>

            </div>

        </div>
    );
}

export default Header;