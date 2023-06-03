import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Activity_Block from "./Activity_block";
import React, { useEffect, useState } from 'react';
import axios from 'axios';



// function handleFilter(e){
//     showing.filter=e;
//     console.log(showing.filter);
// }
// function handletype(e){
//     showing.type=e;
//     console.log(showing.type);
// }


const get_act_info =  async (num, type, filter) =>{
    try {
        if(type === "all")
        {

            const l = ["travels", "sports", "car_pools", "shoppings"];
            let data = [];
            for(let i = 0; i < l.length; i++)
            {
                const response = await axios.get('http://localhost:5001/'+l[i]+"/")
                data = [...data, ...response.data]
                
            }
            return data.slice(0, num);
        }
        else
        {
            const response =  await axios.get('http://localhost:5001/'+type+"/");
            const data = response.data;
            return data.slice(0, num);
        }
        
    }catch(error)
    {
        alert(error.response.data.error);
    }
    return [];
}


function Show_activity(props){
    const [numToShow, setNumToShow] = useState(3);
    const [list, setList] = useState([]);
    const [filter, setfilter] = useState('filter');
    
    
    const updatefilter = (f) => {
        setfilter(f);
    }

    useEffect(() => {
        get_act_info(numToShow, props.type, filter)
        .then(result => {
            let newlist = [];
            let i = 0;
            while(i < result.length)
            {
                newlist.push(<Activity_Block info = {result[i]} userid = {props.userInfo._id} type={props.type}/>);
                i++;
            }
            setList(newlist);
        })
    })
    
    
    
    return (
        <div style={{ paddingLeft: '20px', paddingRight: '20px', fontFamily: 'Arial', backgroundColor: '#f0f0f0' }}>
            <div className="card-header bg-transparent d-flex justify-content-end">
                <br/><br/>
                <DropdownButton id="dropdown-basic-button" title="Filter" onSelect={updatefilter}>
                        <Dropdown.Item eventKey="Recent">Recent</Dropdown.Item>
                        <Dropdown.Item eventKey="Popular">Popular</Dropdown.Item>
                        <Dropdown.Item eventKey="Like">Like</Dropdown.Item>
                </DropdownButton>
            </div>
            {list}
            <div className="text-center mt-3">
                <Button variant="Light" onClick={() =>{setNumToShow(numToShow+3)}}>
                    <text style={{'color':'#2184F6'}}>
                        Show More...
                    </text>
                </Button>
            </div>
        </div>
    )
}




export {Show_activity};