import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'



function Create_activity(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState(
      {
        title : '',
        from:'',
        to:'',
        actType:'travels',
        headcount : 0,
        introduction:''
      }
    )
    
    const handleFormData = (e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
          title : formData.title,
          hostid : "1234",
          from : Date(formData.from),
          to : Date(formData.to),
          headcount : Number(formData.headcount),
          introduction : formData.introduction,
          attendence : 1
        }
        console.log(data);
        axios.post('http://localhost:5001/'+formData.actType+'/add', data)
          .then(res => console.log(res.data))
          .then(() => {
            axios.post('http://localhost:5002/participate/update', {userid:props.userInfo._id, actname:formData.actType + ":" + formData.title})
            .then(res => console.log(res.data));
          })
          .catch(err => alert(err.response.data.error));

        handleClose();
    };

    return (
      <div style={{'text-align':'right', 'color':'#2184F6'}}>
        <Button variant="Light" onClick={handleShow}>
          <text style={{'text-align':'right', 'color':'#2184F6'}}>Create activity...</text>
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="Control">
                <Form.Label>Title</Form.Label>
                <Form.Control as="textarea" name='title' value={formData.title} onChange={handleFormData}/>
                
                <Form.Label>From</Form.Label>
                <Form.Control type="datetime-local" name='from' value={formData.from} onChange={handleFormData}/>

                <Form.Label>To</Form.Label>
                <Form.Control type="datetime-local" name='to' value={formData.to} onChange={handleFormData}/>

                <Form.Label>Headcount</Form.Label>
                <Form.Control type="int" name='headcount' value={formData.headcount} onChange={handleFormData}/>

                <Form.Label>Type</Form.Label>
                <Form.Select name='actType' value={formData.actType} onChange={handleFormData}>
                  <option selected value='travels' >Travel</option>
                  <option value='sports'>Sports</option>
                  <option value='car_pools'>Car pool</option>
                  <option value='shoppings'>Shopping</option>
                </Form.Select>

              </Form.Group>
              
              <Form.Group controlId="ControlIntroduction">
                <Form.Label>Introduction</Form.Label>
                <Form.Control as="textarea" rows={3} name='introduction' value={formData.introduction} onChange={handleFormData}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
  export default Create_activity;
  