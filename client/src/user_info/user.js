
import axios from 'axios';
import React, { useEffect, useState } from "react";
import avatar from '../assets/user.png';
const getUserInfo = async() => {
  const urlParams = new URLSearchParams(window.location.search);
  const user_id = urlParams.get('user_id');

  try {
      const response =  await axios.get('http://localhost:5000/users/findByid', {
          params:{
              _id : user_id
          }
      });
      const data = response.data;
      console.log(data);
      return data;
      
  }catch(error)
  {
      console.error(error);
  }
  
}



function User_info(props) {


  
  // const [userid, setuserid] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setephone] = useState("");
  const [old, seteold] = useState("");
  
  const [intro, seteintro] = useState("");
  useEffect(() => {
      getUserInfo()
      .then(res => {
          
          // setuserid(res._id);
          setusername(res.username);
          setemail(res.email)
          setephone(res.phone);
          seteold(res.old)
          
          seteintro(res.intro)
      })
      
  })





  return (
    
    <div className="user-info" style={{ paddingLeft: '20px', paddingRight: '20px', fontFamily: 'Arial', backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
      <br/><br/>
      <img src={avatar} alt="User Avatar" style={{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto',display: "block"}} />
      <br/>
      <h5 style={{textAlign: 'center', color: '#3097D1', borderBottom: '1px solid #ddd', padding: '10px 0' }}><strong>User Information</strong></h5>
      <div style={{ padding: '20px' }}>
        <p ><strong>Name:</strong> <span style={{ color: '#3097D1' }}>{username}</span></p>
        <hr />
        <p><strong>Email:</strong> <span style={{ color: '#3097D1' }}>{email}</span></p>
        <hr />
        <p><strong>Phone:</strong> <span style={{ color: '#3097D1' }}>{phone}</span></p>
        <hr />
        <p><strong>Old:</strong> <span style={{ color: '#3097D1' }}>{old}</span></p>
        <hr />
        <p><strong>Introduction:</strong> <span style={{ color: '#3097D1' }}>{intro}</span></p>
      </div>
    </div>
    );
}
export default User_info;