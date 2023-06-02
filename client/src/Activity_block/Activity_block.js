import React,{useState} from "react"
import { Button, Modal, Container, Row, Col, ModalHeader, ModalTitle, ModalBody } from "react-bootstrap"
import axios from 'axios'

const join_activity = async (userid, activity, type) => {
    try
    {   
        const participate = {
            userid : userid,
            actname : activity.title
        };
        await axios.post("http://localhost:5001/"+type+"/check_participate", {title:activity.title});
        const response = await axios.post("http://localhost:5002/participate/update", participate);
        await axios.post("http://localhost:5001/"+type+"/participate", {title:activity.title});
        console.log(response.data);
    }
    catch(error)
    {
        console.error(error);
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
        join_activity(props.userid, props.info, props.type);
        setShowModal(false);
    }
    return (
        <div >
            <Container>
                <Row className="my-4">
                    <Col>
                        <h3>{props.info.title}</h3>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="outline-secondary" onClick={showDetail}>More Detail...</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>{/* 名字區塊，佔據一半的寬度 */}
                        <h5>{props.info.hostid}</h5>
                    </Col>
                    
                </Row>
                <Row>
                    <Col xs={9}>{/* 編號區塊，佔據一半的寬度，並向右對齊 */}
                        <div>Duration: {props.info.from} ~ {props.info.to}</div>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <div>Participate: {props.info.attendence}/{props.info.headcount}</div>
                    </Col>
                </Row>
            </Container>
            <hr className="my-4" style={{ borderTop: '1px solid #4F4F4F', borderBottom: '1px solid #4F4F4F' }} />
            <Modal size='lg' show={showModal} onHide={hideDetail}>
                <ModalHeader>
                    <ModalTitle>
                        {props.info.title}
                        <h6>{props.info._id}</h6>
                    </ModalTitle>
                </ModalHeader>
                
                <ModalBody>
                    <h4 className="text-center">Information</h4>
                    <Row className="my-2">
                        <Col xs={9}>{/* 編號區塊，佔據一半的寬度，並向右對齊 */}
                            <div>Hoster: {props.info.hostid}</div>
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
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Cancel
                        </Button>

                        <Button variant="primary" onClick={handleAdd}>
                        Join
                        </Button>
                    </Modal.Footer>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Activity_Block;
