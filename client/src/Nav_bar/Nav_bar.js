import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import logo from '../assets/mountain-logo2.png';
function Nav_bar(props) {
    if(typeof(props.userInfo._id) === "undefined")
    {
        return <div>Loading..</div>;
    };
    const userid = props.userInfo._id;
    const username = props.userInfo.username;

    return (
        <Navbar  variant="dark" expand="md" className="navbar-custom">
        <Navbar.Brand>
            <img src={logo} alt="logo" className="img-fluid" width="40px" height="5px" style={{ marginLeft: '15px' }} />
        </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto text-capitalize">
                    <Nav.Link as={Link} to={`/?user_id=${userid}`}>Home</Nav.Link>
                    <Nav.Link as={Link} to={`/travels?user_id=${userid}`}>Travel</Nav.Link>
                    <Nav.Link as={Link} to={`/sports?user_id=${userid}`}>Sport</Nav.Link>
                    <Nav.Link as={Link} to={`/car_pools?user_id=${userid}`}>Car Pool</Nav.Link>
                    <Nav.Link as={Link} to={`/shoppings?user_id=${userid}`}>Shopping</Nav.Link>
                </Nav>

                <Nav className="ms-auto text-capitalize d-flex align-items-center">
                    <p className="mx-3 mb-0" style={{color:'#CBE4F2', fontSize:'18px'}}>Hi, {username}</p>
                    <Nav.Link href="http://localhost:3000/">Logout</Nav.Link>    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Nav_bar;