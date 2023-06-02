import Create_activity from '../Create_activity';
import { Show_activity } from '../Activity_block/Show_activity';
import Nav_bar from '../Nav_bar/Nav_bar';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Joined_event_block from '../Joined/Joined';
import { useEffect, useState } from 'react';
import axios from 'axios';

const getUserInfo = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('user_id');
    try {
        const response =  await axios.get('http://localhost:5000/users/findByid', {
            params:{
                _id : user_id
            }
        });
        const data = response.data;
        return data;
        
    }catch(error)
    {
        console.error(error);
    }
    
}


function Home() {
    const[userInfo, setUserInfo] = useState("");
    useEffect(() => {
        getUserInfo()
        .then(data => {
            setUserInfo(data);
        });
    }, [])

  return (
    <div classNameName="App">
        <Nav_bar userInfo = {userInfo}/>

        <div className="container">
            <div className="row">
                {/* <div className="col-12 col-lg-3">
                    <div className="left-column">
                    </div>
                </div> */}
            
                <div className="col-12 col-lg-8" >
                    <div className="middle-column">
                        <div className="card" >
                            <div className="card-header bg-transparent">
                                <Create_activity userInfo = {userInfo}/>
                            </div>
 
                            <Show_activity type="sports" userInfo = {userInfo}/>

                        </div>
                    </div>
                </div>

                <br /> <br /> <br /><br /> <br /> <br />


                    
                <div className="col-12 col-lg-4">
                    <div className="right-column">
                        <Joined_event_block userInfo = {userInfo}/>
                        
                    </div>

                </div>

            </div>
        </div>
    </div>
  );
}

export default Home;