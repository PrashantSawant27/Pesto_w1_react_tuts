import React from 'react';
import { Col,Row, Card } from 'react-bootstrap';

export default class Reminder extends React.Component {
    
    render(){
        return (
                <Card className="m-3">
                    <Card.Body>
                        <Row>
                            <Col md="auto" className="p-4" >
                                <img className="reminderLogo"
                                src="../reminder.png" alt="text"/>
                            </Col>
                            <Col className="text-left">
                                <h3>{this.props.title}</h3>
                                <p>{this.props.dateTime}</p>
                            </Col>
                            
                        </Row>
                    </Card.Body>
                </Card>
            
        );
    }
}
