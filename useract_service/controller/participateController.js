const Participate = require('../models/participate.model');

exports.update = async (req, res) =>{
    const userid = req.body.userid;
    const actname = req.body.actname;

    let response = await Participate.findOne({userid : userid});
    if(!response)
    {
        console.log("User_act not found, create a new one.");
        const newuserid = userid;
        const newactname = [actname];

        const newParticipate = new Participate({userid:newuserid, actname :newactname});
        newParticipate.save()
        .then((res2) => {
            return res.json(res2);
        })
        .catch((err) => {res.status(400).json('Error: ' + err)});
    }

    else
    {
        if(response.actname.find(e => e === actname))
        {
            return res.status(400).json("Error: Has been participated.");
        }
        response.actname.push(actname);
        Participate.findOneAndUpdate(
            {userid : userid},
            {
                actname : response.actname
            },
            {
                new : true
            }
        ).then((data) => {
            return res.json(data);
        })
        .catch((err) => {res.status(400).json('Error: ' + err)})
    }
    
        

}

exports.withdraw = async (req, res) => {
    const userid = req.body.userid;
    const actname = req.body.actname;

    let response = await Participate.findOne({userid : userid});
    if (!response) 
    {
        return res.status(400).json("Error: User not found.");
    }
    else
    {

        if(response.actname.find(e => e === actname))
        {
            const idx = response.actname.indexOf(actname);
            response.actname.splice(idx, 1);
            Participate.findOneAndUpdate(
                {userid : userid},
                {
                    actname : response.actname
                },
                {
                    new : true
                }
            ).then((data) => {
                return res.json(data);
            })
            .catch((err) => {return res.status(400).json("Error: withdraw failed."+err)})
        }
        else
        {
            return res.status(400).json("Error: Not found activity.");
        }
    }
}

exports.findByUser = async(req, res) => {
    const userid = req.body.userid;
    Participate.findOne({userid: userid})
    .then(participate => res.json(participate.actname))
    .catch(err => res.status(400).json('Error: ' + err));
}