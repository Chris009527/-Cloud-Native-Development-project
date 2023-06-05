import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, Row , Container} from "react-bootstrap";
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


const get_act_info =  async (num, type, filter, onSearch, keyword) =>{
    try {
        if(type === "all")
        {

            const l = ["travels", "sports", "car_pools", "shoppings"];
            let data = [];
            for(let i = 0; i < l.length; i++)
            {
                const response = await axios.get('http://localhost:5001/'+l[i]+"/", 
                    {
                        params:{
                            filter : filter
                        }
                    }
                )
                data = [...data, ...response.data]
                
            }
            return data.slice(0, num);
        }
        else
        {
            if(onSearch)
            {
                const response = await axios.post('http://localhost:5001/'+type+"/search", {title:type+':'+keyword});
                if(!response.data)
                {
                    return [];
                }
                const data = response.data;

                return [data];
            }
            else
            {
                const response = await axios.get('http://localhost:5001/'+type+"/", 
                    {
                        params:{
                            filter : filter
                        }
                    }
                )
                const data = response.data;
                return data.slice(0, num);
            }
            
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
    const [keyword, setkeyword] = useState('');
    const [onSearch, setOnSearch] = useState(false);
    
    
    const updatefilter = (f) => {
        setfilter(f);
    }

    const handleKeywordOnChange = (e) => {
        setkeyword(e.target.value);
        setOnSearch(false);
    }
    const handleSearchOnSubmit = (event) => {
        event.preventDefault();
        if(keyword != '')
        {
            setOnSearch(true);
        } 
    };

    const renderSearchBar = () => {
        
        if(props.type != "all")
        {
            return (
                <Container className="card-header bg-transparent ">
                <Row>
                    <Col>
                    <Form className="d-flex" onSubmit={handleSearchOnSubmit}>
                        <FormControl
                            type="text"
                            placeholder="search"
                            value={keyword}
                            className="me-2 rounded-pill"
                            onChange={handleKeywordOnChange}
                        />
                        <Button className="rounded-pill" variant="outline-primary" type="submit">
                        Search
                        </Button>
                    </Form>
                    </Col>
                </Row>
                </Container>
            )
        }
        else return;
    };

    useEffect(() => {
        if(typeof(props.userInfo._id) === "undefined")
        {
            ;
        }
        else
        {
            get_act_info(numToShow, props.type, filter, onSearch, keyword)
            .then(result => {
                let newlist = [];
                let i = 0;
                if(result.length <= 0)
                {
                    ;
                }
                else
                {
                    while(i < result.length)
                    {
                        newlist.push(<Activity_Block info = {result[i]} user = {props.userInfo} type={props.type}/>);
                        i++;
                    }
                }
                
                setList(newlist);
                
            })
        }
        
    }, )
    
    
    
    return (
        <div style={{ paddingLeft: '20px', paddingRight: '20px', fontFamily: 'Arial', backgroundColor: '#f0f0f0' }}>
            <div className="card-header bg-transparent d-flex justify-content-end">
                <br/>
                <DropdownButton id="dropdown-basic-button" title="Filter" onSelect={updatefilter}>
                        <Dropdown.Item eventKey="recent">Recent</Dropdown.Item>
                        <Dropdown.Item eventKey="popular">Popular</Dropdown.Item>
                        <Dropdown.Item eventKey="startTime">Start Time</Dropdown.Item>
                        <Dropdown.Item eventKey="none">None</Dropdown.Item>
                </DropdownButton>
            </div>
            <div>
            {renderSearchBar()}
            
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