import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import { Card,Button,Row, Col } from 'react-bootstrap';
import Reminder from './components/reminder.js';
import  {getReminders,setReminders} from './StorageHelper';
// import TimePicker from 'react-gradient-timepicker'; // or
// var TimePicker = require('react-gradient-timepicker');

// import Timekeeper from 'react-timekeeper';

export class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={ reminders:[],title:"",dateTime:""};
    this.addReminder=this.addReminder.bind(this);
    this.setDateTime=this.setDateTime.bind(this);
    this.setTitle=this.setTitle.bind(this);


  }
  componentDidMount(){
    document.title = "Reminder App";
    this.setRemindersFromStorage();
  }

  setRemindersFromStorage(){
    this.setState({reminders:getReminders()});
    // const upcoming =reminders.filter(ele =>{ return ele.dateTime>=new Date()});
    // this.setState({upcoming: upcoming});
    // const completed=reminders.filter(ele =>{ return ele.dateTime<=new Date()});
    // this.setState({completed: completed});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <p>I'll Remind you everything on time</p>
        </header>
        <Card>
          <Card.Body>
          <Row>
          <Col>
            <input className="form-control" value={this.state.title} onChange={this.setTitle} placeholder="What do you want to remember"></input>
          </Col>
          <Col>
          <input className="form-control" value={this.state.dateTime} onChange={this.setDateTime} placeholder="Time in hh:mm:ss"></input>
          
          </Col>
          <Col md="auto">
            <Button onClick={this.addReminder}>Remind me</Button>
          </Col>
          </Row>
          </Card.Body>
        </Card>
        {this.state.reminders.length===0?
            "No reminders"
            :
            this.state.reminders.map((item)=>{
              return (
                <Reminder key={item.id} title={item.title} dateTime={item.dateTime}></Reminder>
              )
            })
        }
        
      </div>
    );

    
  }
  setTitle(val){
    console.log(val);
    this.setState({title:val.target.value});
  }
  setDateTime(val){
    console.log(val);
    this.setState({dateTime:val.target.value});
  }

  addReminder(){
      const reminder={
                    reminder_id:this.state.reminders.length+1,
                    title:this.state.title!=null?this.state.title:"",
                    dateTime:this.state.dateTime!=null?this.state.dateTime:""
                  };
      const reminders=this.state.reminders;
      reminders.push(reminder);
      
      this.setState({reminders:reminders});
      setReminders(this.state.reminders);
      // this.state.title.value="";
      // this.state.dateTime.value="";
  }
  
}

export default App;
