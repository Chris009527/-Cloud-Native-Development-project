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


const get_act_info =  async (num, type,filter) =>{
    //向後端拿資料
    // const activityInfo = {
    //     hostname : "Allen" ,
    //     hostid : "PIYANKiller000",
    //     title : "PIYANParty",
    //     id : "PIYANParty000",
    //     headcount : 10,
    //     introduction : "This is a fun activity.",
    //     from : "2023-5-24 23:00:00",
    //     to : "2023-5-25 00:00:00",
    // }
    try {
        const response =  await axios.get('http://localhost:5001/'+type+"/");
        const data = response.data;
        
        return data.slice(0, num);
        
    }catch(error)
    {
        console.error(error);
    }
}


function Show_activity(props){
    const [numToShow, setNumToShow] = useState(3);
    const [list, setList] = useState([]);
    const [filter, setfilter] = useState('filter');
    
    
    const updatefilter = (f) => {
        setfilter(f);
    }
    console.log(props)

    useEffect(() => {
        get_act_info(numToShow, props.type, filter)
        .then(result => {
            let newlist = [];
            let i = 0;
            while(i < result.length)
            {
                newlist.push(<Activity_Block info = {result[i]} />);
                i++;
            }
            setList(newlist);
            console.log('update');
        })
        .catch(err =>{console.log(err)});
    }, [filter, numToShow])
    
    
    
    return (
        <div>
            <div className="card-header bg-transparent">
                <DropdownButton id="dropdown-basic-button" title="Filter" onSelect={updatefilter}>
                        <Dropdown.Item eventKey="Recent">Recent</Dropdown.Item>
                        <Dropdown.Item eventKey="Popular">Popular</Dropdown.Item>
                        <Dropdown.Item eventKey="Like">Like</Dropdown.Item>
                </DropdownButton>
            </div>
            {list}
            <Button variant="Light" onClick={() =>{setNumToShow(numToShow+3)}}>
                <text style={{'color':'#2184F6'}}>
                    Show More...
                </text>
            </Button>
        </div>
    )
}




export {Show_activity};