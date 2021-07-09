import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import { Card,Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Reminder from './components/reminder.js';
import  {getReminders,setReminders} from './StorageHelper';

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import { toast,ToastContainer } from 'react-toastify';
import moment from 'moment';
import Notify from './components/Notify.js';

export class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.interval=null;
    this.state={ reminders:[],title:"",dateTime:new Date(),openSnack:false};
    this.addReminder=this.addReminder.bind(this);
    this.setDateTime=this.setDateTime.bind(this);
    this.setTitle=this.setTitle.bind(this);
    // this.setRemindersFromStorage=this.setRemindersFromStorage(this);
    // this.checkRemindersTime=this.checkRemindersTime(this);
  }
  componentDidMount(){
    document.title = "Reminder App";
    this.setRemindersFromStorage();
  }

  setRemindersFromStorage(){
    this.setState({reminders:getReminders()});
  }

  checkRemindersTime(){
    let me=this;
    console.log("called");
    
    // let reminders=me.state.reminders.filter((ele)=>{ return moment(ele.dateTime).format("DD-MM-YYYY HH:mm:ss A")===moment(date).add(5, 'seconds').format("DD-MM-YYYY HH:mm:ss A") });
    // if(reminders.length>0){
    //   this.setState({interval:null});
    //   clearInterval(this.state.interval);
    // }
    // if(this.state.interval!=null){
      
     
      this.interval=
          setInterval(function() {
            // console.log(moment(new Date()).isSame(moment(new Date())));
            
            
            let date=new Date();
            let ori=me.state.reminders;
            let reminders=me.state.reminders.filter((ele)=>{ 
              return (moment(ele.dateTime).format("DD-MM-YYYY HH:mm:ss A")===moment(date).format("DD-MM-YYYY HH:mm:ss A") && ele.isCompleted!==true) 
            });

            if(reminders.length>0){
              console.log(reminders.length);
              let noti="";
              reminders.forEach( ele => {
                noti+="<br>-"+ele.title;
                let obj=ori.find(c=> c.id===ele.id);
                obj.isCompleted=true;

              });

              me.showToast("Reminder For: "+noti,"i");
              
              reminders=me.state.reminders.filter((ele)=>{ 
                return (moment(ele.dateTime).format("DD-MM-YYYY HH:mm:ss A")===moment(date).format("DD-MM-YYYY HH:mm:ss A") && ele.isCompleted!==true) 
              });
              
              me.setState({reminders:ori});
              setReminders(ori);
            }
            else{
              // console.log(date);
              clearInterval(this.interval);
            }

            
          },1000);
    
    
  }
  render() {
    // if(this.state.interval!=null){
    //   this.setState({interval:null});
    //   clearInterval(this.state.interval);
    // }

    this.checkRemindersTime();
    return (
      <div className="App">
        <header className="App-header">
            <p>I'll Remind you everything on time</p>
        </header>
        <Card>
          <Card.Body>
          <Row>
          <Col md="5" xs="12" sm="12" >
          <Stack spacing={2} className="mt-2 mb-2">
          <TextField id="outlined-basic" label="What do you want to remember" variant="outlined" value={this.state.title} onChange={this.setTitle} />
          </Stack>
          </Col>
          <Col md="5" xs="12" sm="12" >
            {/* <input className="form-control" value={this.state.dateTime} onChange={this.setDateTime} placeholder="HH"></input>
            <input className="form-control" value={this.state.dateTime} onChange={this.setDateTime} placeholder="MM"></input>
            <input className="form-control" value={this.state.dateTime} onChange={this.setDateTime} placeholder="SS"></input>
            <select className="form-control">
              <option>AM</option>
              <option>PM</option>
            </select> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={2} className="mt-2 mb-2">
                <TimePicker
                            ampm={true}
                            openTo="hours"
                            views={['hours', 'minutes', 'seconds']}
                            inputFormat="HH:mm:ss"
                            mask="__:__:__"
                            label="Enter Time With seconds"
                            value={this.state.dateTime}
                            onChange={(newValue) => {
                              this.setState({dateTime:newValue});
                            }}
                            renderInput={(params) => <TextField {...params} />}
                  />
                
                </Stack>
              </LocalizationProvider>
            
          </Col>
          <Col md="auto" xs="12" sm="12" >
          <Stack > 
            <Button className="mt-2 pt-3 pb-3 pl-4 pr-4" onClick={this.addReminder} variant="contained">Add Now</Button>
           </Stack>
          </Col>
          </Row>
          </Card.Body>
        </Card>
        {this.state.reminders.length===0?
            "No reminders"
            :
            this.state.reminders.reverse().map((item)=>{
              return (
                <Reminder key={item.id} isCompleted={item.isCompleted}  title={item.title} dateTime={item.dateTime}></Reminder>
              )
            })
        }

         
<ToastContainer
       autoClose={5000}
       />
      </div>
    );

    
  }
  
  setTitle(val){
    // console.log(val);
    this.setState({title:val.target.value});
  }
  setDateTime(val){
    // console.log(val);
    this.setState({dateTime:val.target.value});
  }

  addReminder(){
    if(this.state.title!==""){
        const reminder={
                      id:this.state.reminders.length+1,
                      title:this.state.title,
                      dateTime:this.state.dateTime,
                      isCompleted:false
                    };
        
        const reminders=this.state.reminders;
        reminders.push(reminder);
        
        this.setState({reminders:reminders});
        setReminders(this.state.reminders);
    }
    else{
      this.showToast("Title is required","e");
    }

  }
  showToast(msg,type){
    if(type==="s"){
     return toast.success(msg, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    if(type==="e"){
      return toast.error(msg, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    if(type==="i"){
      return toast.info(<Notify msg={msg} />, {
        position: toast.POSITION.TOP_CENTER,
        
      });
    }
  }
}

export default App;
