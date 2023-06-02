import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";



function Nav_bar(props) {
    
    if(typeof(props.userInfo._id) === "undefined")
    {
        return <div>Loading..</div>;
    };
    const userid = props.userInfo._id;
    const username = props.userInfo.username;

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
                    <li className="nav-item"><d className="nav-item"><a href="http://localhost:3000/" className="nav-link" style={{color:'#CBE4F2', fontSize:'18px'}}>logout</a></d></li>    
                </ul>
            </div>
        </nav>
    )
}

export default Nav_bar;