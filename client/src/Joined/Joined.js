import React, {useEffect, useState} from "react";
import { Button} from "react-bootstrap";
import Joined_event from "./event_block";
import axios from 'axios';


const get_Joined_event = async (showall, userid) => {
    //拿資料
    const user = {
        userid : userid,
        actname : []
    }
    try {
        const response = await axios.post('http://localhost:5002/participate/findByUser',user)

        const further = async () => {
            const tempList = []
            const data = response.data;
            try{
                for(let i = 0; i < data.length; i++)
                {
                    const type = data[i].substring(0, data[i].indexOf(":"));
                    const act = {
                        title : data[i]
                    }
                    const res = await axios.post('http://localhost:5001/'+type+'/findByName', act);
                    tempList.push(res.data);
                                    
                }
                if(!showall)
                {
                    tempList.slice(0, showall);
                }
                return tempList;
            }catch(error)
            {
                alert(error.response.data.error);
            }
            
        }
        const response2 = await further();
        
        return response2;
        //return data.slice(0, num);
 
    }catch(error)
    {
        alert(error.response.data.error);
    }
    return [];
}

function Joined_event_block(props) {
    const [showmore, setshowmore] = useState(false);
    const [buttontext, setbuttontext] = useState('more...')
    const [list, setList] = useState([]);

    const handlemore = () => {
        setshowmore(!showmore);
        if (buttontext === 'more...')
        setbuttontext('less...');
        else setbuttontext('more...');
    }
    useEffect(() => {

        get_Joined_event(showmore, props.userInfo._id)
        .then(result => {
            let newlist = [];
            let i = 0;
            while(i < result.length)
            {
                newlist.push(<Joined_event info={result[i]} userid={props.userInfo._id}/>);
                i++;
            }
            setList(newlist);

        })
    }) 

    return (
        <div>
            <div className="card shadow-sm mb-4" >
                <div className="card-body">
                    <div className="row no-gutters d-none d-lg-flex">
                        <h6 className="card-title ">
                            Joined activities, 
                            <Button variant="link" onClick={handlemore}><small>{buttontext}</small> </Button> 
                        </h6>

                        <div>
                            {list}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Joined_event_block;