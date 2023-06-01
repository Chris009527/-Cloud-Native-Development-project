import React, {useState} from "react";
import { Button} from "react-bootstrap";
import Joined_event from "./event_block";


function get_Joined_event(showall) {
    //拿資料
    const activityInfo = {
        hostname : "Allen" ,
        hostid : "PIYANKiller000",
        title : "PIYANParty",
        id : "PIYANParty000",
        headcount : 10,
        introduction : "This is a fun activity.",
        from : "2023-5-24 23:00:00",
        to : "2023-5-25 00:00:00",
    }
    let list = [];
    if (showall)
    {
        for(let i = 0; i < 10; i++)
        {
            list.push(<Joined_event info={activityInfo} />);
        }
    }
    else
    {
        for(let i = 0; i < 2; i++)
        {
            list.push(<Joined_event info={activityInfo} />);
        }
    }
    
    return list;
}

function Joined_event_block() {
    const [showmore, setshowmore] = useState(false);
    const [buttontext, setbuttontext] = useState('more...')

    const handlemore = () => {
        setshowmore(!showmore);
        if (buttontext == 'more...')
        setbuttontext('less...');
        else setbuttontext('more...');
    }
    let list = get_Joined_event(showmore);

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