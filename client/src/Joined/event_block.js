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
        const response = await axios.post("http://localhost:5002/participate/withdraw", participate);
        console.log(response.data);
    }
    catch(error)
    {
        console.error(error);
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
    return (

        <div className="col-12 p-1 text-left">
         <hr style={{ borderTop: '1px solid #4F4F4F'}} />
        <Row>
            <Col xs={9}><h6>{props.info.title}</h6></Col>
            <Col xs={3}>
                <Button variant="outline-info" onClick={showDetail}>detail </Button>
            </Col>
        
        </Row>
        
        <Modal size='lg' show={showModal} onHide={hideDetail}>
                <ModalHeader>
                    <ModalTitle>
                        {props.info.title}
                        <h6>{props.info.id}</h6>
                    </ModalTitle>
                </ModalHeader>
                
                <ModalBody>
                    <h4 className="text-center">Information</h4>
                    <Row className="my-2">
                        <Col xs={9}>{/* 編號區塊，佔據一半的寬度，並向右對齊 */}
                            <div>Hoster: {props.info.hostname}</div>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <div>Headcount: {props.info.headcount}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}>{/* 編號區塊，佔據一半的寬度，並向右對齊 */}
                            <div>Duration: {props.info.from} ~ {props.info.to}</div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <h4 className="text-center">Introduction</h4>
                        <Col xs={9}>{/* 編號區塊，佔據一半的寬度，並向右對齊 */}
                            <p>{props.info.introduction}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <h4 className="text-center">Comments</h4>
                        <Col xs={9}>{/* 編號區塊，佔據一半的寬度，並向右對齊 */}
                            <p>{props.info.comments}</p>
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Cancel
                        </Button>

                        <Button variant="outline-secondary" onClick={handlewithdraw}>
                        withdraw
                        </Button>
                    </Modal.Footer>
                </ModalBody>
            </Modal>
        
       
        </div>
    )
}
export default Joined_event;