const Participate = require('../models/participate.model');

const update = async (req, res) =>{
    const userid = req.body.userid;
    const actid = req.body.actid;

    let response = await Participate.findOne({userid : userid});
    if(!response)
    {
        console.log("User_act not found, create a new one.");
        const newuserid = userid;
        const newactid = [actid];

        const newParticipate = new Participate({userid:newuserid, actid :newactid});
        newParticipate.save()
        .then((res2) => {
            res.json(res2);
        })
        .catch((err) => {res.json("Error: Can not create new participant." + err)});
    }

    else
    {
        const newactid = response.actid.push(actid)
    }
    
        

}

exports.update = update;