import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

async function getUserDetail(setUserDetailResponse){

    let { id } = useParams();

    fetch("http://localhost:3000/index/user/" + id, { mode: 'cors' })
        .then((response) => response.json())
        .then((responseBody) => setUserDetailResponse(responseBody))

        .catch((error) => console.log(error));
}

function UserDetail(){
    
    const [userDetailResponse, setUserDetailResponse] = useState();

    // useEffect(() => { getUserDetail(setUserDetailResponse); }, []);
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
}

export default UserDetail;