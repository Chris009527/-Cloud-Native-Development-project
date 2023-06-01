import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button } from "react-bootstrap";

        


const Dashboard = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('user_id');
    return user_id;
  }

function Nav_bar() {

    return (
        <nav className="navbar navbar-expand-md navbar-dark mb-4" style={{backgroundColor:'#3097D1',}}>
            <a href="/" className="navbar-brand"><img src="img/brand-white.png" alt="logo" className="img-fluid" width="80px" height="100px" /></a>

            <Button className="navbar-toggler" data-toggle="collapse" data-target="#responsive"><span className="navbar-toggler-icon"></span></Button>


            <div className="collapse navbar-collapse" id="responsive">
               
                <ul className="navbar-nav mr-auto text-capitalize">
                <li className="nav-item"><Link to={"/"} className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to={"/travels"} className="nav-link">Travel</Link></li>
                <li className="nav-item"><Link  to={"/sports"} className="nav-link">Sport</Link></li>
                <li className="nav-item"><Link  to={"/car_pools"} className="nav-link">Car Pool</Link></li>
                <li className="nav-item"><Link  to={"/shoppings"} className="nav-link">Shopping</Link></li>
                </ul>
                
            
                <ul className="navbar-nav ms-auto text-capitalize ">
                    <li className="nav-item mx-3 "><d className="nav-item"><p  style={{color:'#CBE4F2', fontSize:'18px'}}>Hi, {Dashboard()}</p></d></li>
                    <li className="nav-item"><d className="nav-item"><a href="signin.html" className="nav-link" style={{color:'#CBE4F2', fontSize:'18px'}}>logout</a></d></li>
    
                </ul>
            </div>
        </nav>
    )
}

export default Nav_bar;