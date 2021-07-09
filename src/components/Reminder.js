import moment from 'moment';
import React from 'react';
import { Col,Row, Card } from 'react-bootstrap';

export default class Reminder extends React.Component {
    
    render(){
        return (
                <Card className="m-3">
                    <Card.Body>
                        <Row>
                            <Col md="auto"  className="p-4" >
                                <img className="reminderLogo"
                                src="../reminder.png" alt="text"/>
                            </Col>
                            <Col className="text-left">
                                <small>On {moment(this.props.dateTime).format("DD-MM-YYYY")}</small>
                                {this.props.isCompleted? <h3 className="strike">{this.props.title}</h3>:<h3>{this.props.title}</h3>}
                                <p>At {moment(this.props.dateTime).format("HH:mm:ss A")}</p>
                            </Col>
                            
                        </Row>
                    </Card.Body>
                </Card>
            
        );
    }
}
