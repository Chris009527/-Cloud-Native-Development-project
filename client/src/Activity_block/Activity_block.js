import React,{useState} from "react"
import { Button, Modal, Container, Row, Col, ModalHeader, ModalTitle, ModalBody } from "react-bootstrap"
import axios from 'axios'

const join_activity = async (userid, activity) => {
    try
    {   
        const participate = {
            userid : userid,
            actname : activity.title
        };
        const type = activity.title.substring(0, activity.title.indexOf(":"));
        await axios.post("http://localhost:5001/"+type+"/check_participate", {title:activity.title});
        const response = await axios.post("http://localhost:5002/participate/update", participate);
        await axios.post("http://localhost:5001/"+type+"/participate", {title:activity.title});
    }
    catch(error)
    {
        alert(error.response.data.error);
    }
}

function Activity_Block(props){
    const [showModal, setShowModal] = useState(false);

    const showDetail = () => {
        setShowModal(true);
    }
    const hideDetail = () => {
        setShowModal(false);
    }

    const handleClose = () =>{
        setShowModal(false);
    }

    const handleAdd = () => {       
        join_activity(props.userid, props.info);
        setShowModal(false);
    }
    const isClosedToDeadline = () => {
        const now = new Date();
        const to = new Date(props.info.to)
        if (to < now)
        {
            return (<span style={{color : '#CE0000'}}>This activity is out of date. QAQ</span>)
        }
        if (to-now < (1000*3600*24))
        {
            return (<span style={{color : '#CE0000'}}>This activity is about to finish!</span>)
        }
    }
    return (
        <Container>
            <Row className="my-4">
                <Col ><h3><strong>{props.info.title}</strong></h3></Col>
                <Col   className="d-flex justify-content-end">
                    {isClosedToDeadline()}
                    <Button variant="outline-secondary" onClick={showDetail}>More Detail...</Button>
                    
                </Col>
            </Row>
            <Row>
                <Col xs={3}><h5><strong>Hoster: </strong>{props.info.hostname}</h5></Col>
            </Row>
            <Row>
                    <div><strong>Duration: </strong>{props.info.from} ~ {props.info.to}</div>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <div><strong>Participate: </strong>{props.info.attendence}/{props.info.headcount}</div>
                </Col>
            </Row>
            <hr className="my-4" style={{ borderTop: '1px solid #4F4F4F', borderBottom: '1px solid #4F4F4F' }} />

            <Modal size='lg' show={showModal} onHide={hideDetail}>
                <ModalHeader className="modal-header-color">
                    <ModalTitle className="px-3">
                    <strong>{props.info.title}</strong>
                        <h6>{props.info._id}</h6>
                    </ModalTitle>
                </ModalHeader>
                
                <ModalBody className="modal-body-color">
                    <h4 className="text-center">Information</h4>
                    <Row className="my-2 mb-3 px-3">
                        <Col xs={9}><div><strong>Hoster:</strong> {props.info.hostname}</div></Col>
                        <Col className="d-flex justify-content-end"><div><strong>Headcount:</strong> {props.info.attendence}/{props.info.headcount}</div></Col>
                    </Row>
                    <Row className="my-2 mb-3 px-3">
                        <Col xs={9}><div><strong>Duration:</strong> {props.info.from} ~ {props.info.to}</div></Col>
                    </Row>
                    <hr />
                    <Row className="my-2 mb-3 px-3">
                        <h4 className="text-center mb-3 px-3">Introduction</h4>
                        <Col xs={9}><p>{props.info.introduction}</p></Col>
                    </Row>
                   
                </ModalBody>
                <Modal.Footer className="modal-header-color">
                        {isClosedToDeadline()}
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={handleAdd}>Join</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
export default Activity_Block;
