import React, {useState} from "react";
import { Button, Modal, Row, Col, ModalHeader, ModalTitle, ModalBody } from "react-bootstrap";
import axios from 'axios'

const withdraw_activity = async (userid, acttitle) => {
    try
    {
        const participate = {
            userid : userid,
            actname : acttitle
        }

        const type = acttitle.substring(0, acttitle.indexOf(":"));

        const response = await axios.post("http://localhost:5002/participate/withdraw", participate);
        await axios.post("http://localhost:5001/"+type+"/withdraw", {title:acttitle});
        console.log(response.data);
    }
    catch(error)
    {
        alert(error.response.data.error);
    }
}

function Joined_event(props)
{
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

    const handlewithdraw = () => {
        //將個資傳到後端取消活動
        withdraw_activity(props.userid, props.info.title);
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
        <div className="col-12 p-1 text-left">
            <hr style={{ borderTop: '1px solid #4F4F4F'}} />
            <Row>
                <Col xs={9}><h6>{props.info.title}</h6></Col>
                <Col xs={3}>
                    <Button variant="outline-info" onClick={showDetail}>detail </Button>
                </Col>
            
            </Row>
            <Row>
                {isClosedToDeadline()}
            </Row>
        
            <Modal size='lg' show={showModal} onHide={hideDetail}>
                <ModalHeader closeButton className="modal-header-color">
                    <ModalTitle className="px-3">
                        <h4 className="text-primary"><strong>{props.info.title}</strong></h4>
                        <h6 className="text-muted">{props.info.id}</h6>
                    </ModalTitle>
                </ModalHeader>

                <ModalBody className="modal-body-color">
                    <h5 className="text-center mb-3">Information</h5>
                    <Row className="mb-3 px-3">
                        <Col xs={12} md={6}><div><strong>Hoster:</strong> {props.info.hostname}</div></Col>
                        <Col xs={12} md={6}><div className="text-md-end"><strong>Participate:</strong> {props.info.attendence}/{props.info.headcount}</div></Col>
                    </Row>
                    <Row className="mb-3 px-3">
                        <Col><div><strong>Duration:</strong> {props.info.from} ~ {props.info.to}</div></Col>
                    </Row>
                    <hr />
                    <h5 className="text-center mb-3">Introduction</h5>
                    <Row className="px-3">
                        <Col><p>{props.info.introduction}</p></Col>
                    </Row>
                    <hr />
                    <h5 className="text-center mb-3">Comments</h5>
                    <Row className="px-3">
                        <Col><p>{props.info.comments}</p></Col>
                    </Row>
                </ModalBody>
                
                <Modal.Footer className="modal-header-color">
                    {isClosedToDeadline()}
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="outline-danger" onClick={handlewithdraw}>Withdraw</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Joined_event;