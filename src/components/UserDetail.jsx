import { useState } from "react";

async function getUserDetail(setUserDetailResponse){

    fetch("http://localhost:3000/index/user", { mode: 'cors' })
        .then((response) => response.json())
        .then((responseBody) => setUserDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function UserDetail(){
    
    const [userDetailResponse, setUserDetailResponse] = useState();
    getUserDetail(setUserDetailResponse);

    if(userDetailResponse){
        
        return(

            <div id="author-details">
                
                <div id="authorName"><strong>Author:</strong><br></br>{userDetailResponse[0].firstName + " " + userDetailResponse[0].lastName}</div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div><strong>Alias:</strong> {userDetailResponse[0].username}</div>
                <div><strong>Email:</strong> {userDetailResponse[0].email}</div>

            </div>
        );
    }

    else
        return <div className="loader">Loading Author...</div>;
}

export default UserDetail;