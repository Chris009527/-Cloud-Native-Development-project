import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button } from "react-bootstrap";
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
        console.log(data);
        return data;
        
    }catch(error)
    {
        console.error(error);
    }
    
  }

function Nav_bar() {
    const [userid, setuserid] = useState("");
    const [username, setusername] = useState("");
    useEffect(() => {
        getUserInfo()
        .then(res => {
            console.log(res);
            setuserid(res[0]._id);
            setusername(res[0].username);

        })
        
    })

    return (
        <nav className="navbar navbar-expand-md navbar-dark mb-4" style={{backgroundColor:'#3097D1',}}>
            <a href="/" className="navbar-brand"><img src="img/brand-white.png" alt="logo" className="img-fluid" width="80px" height="100px" /></a>

            <Button className="navbar-toggler" data-toggle="collapse" data-target="#responsive"><span className="navbar-toggler-icon"></span></Button>


            <div className="collapse navbar-collapse" id="responsive">
               
                <ul className="navbar-nav mr-auto text-capitalize">
                <li className="nav-item"><Link to={`/?user_id=${userid}`} className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to={`/travels?user_id=${userid}`} className="nav-link">Travel</Link></li>
                <li className="nav-item"><Link  to={`/sports?user_id=${userid}`} className="nav-link">Sport</Link></li>
                <li className="nav-item"><Link  to={`/car_pools?user_id=${userid}`} className="nav-link">Car Pool</Link></li>
                <li className="nav-item"><Link  to={`/shoppings?user_id=${userid}`} className="nav-link">Shopping</Link></li>
                </ul>
                
            
                <ul className="navbar-nav ms-auto text-capitalize ">
                    <li className="nav-item mx-3 "><d className="nav-item"><p  style={{color:'#CBE4F2', fontSize:'18px'}}>Hi, {username}</p></d></li>
                    <li className="nav-item"><d className="nav-item"><a href="signin.html" className="nav-link" style={{color:'#CBE4F2', fontSize:'18px'}}>logout</a></d></li>
    
                </ul>
            </div>
        </nav>
    )
}

export default Nav_bar;