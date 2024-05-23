import React, { useState } from 'react';
import './PopupForTodo.css'
import {useFirebase } from "../context/Firebase";
import 'firebase/storage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

function PopupForTodo(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [triggerTime, settriggerTime] = useState(false)
  const [trigerDate, settrigerDate] = useState(false)

  const handleDateClick = () => {
    settrigerDate(true)
  };

  const handleTimeClick = () => {
    settriggerTime(true)
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const [Post_txtTitle, setPost_txtTile] = useState("");
  const TxtTitle = (event) => {
    setPost_txtTile(event.target.value);
  };

  const firebase = useFirebase();

  const postDatas = async () => {
    let ccurrentDate = new Date();
    let monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    let monthIndex = ccurrentDate.getMonth();
    let monthName = monthNames[monthIndex];
    let dday = ccurrentDate.getDate();
    let dyear = ccurrentDate.getFullYear();
    dday = dday < 10 ? '0' + dday : dday;
    let formattedDate = `${dday} ${monthName} ${dyear.toString().slice(-2)}`;

    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); 
    var day = ('0' + currentDate.getDate()).slice(-2);
    var hour = ('0' + currentDate.getHours()).slice(-2);
    var minute = ('0' + currentDate.getMinutes()).slice(-2);
    var second = ('0' + currentDate.getSeconds()).slice(-2);

    // Concatenate components into desired format
    var currentTime = year + month + day + hour + minute + second;

    if (Post_txtTitle === '') {
      alert("Please Fill all ");
      if (window.confirm) {
        window.location.reload()
      }
    } else {
      // incrementCount();
      firebase.putData(`Todo/todos${currentTime}`, {
        title: Post_txtTitle,
        postuploadedon: formattedDate,
        date:selectedDate.toDateString(),
        time:selectedTime,
        key: `todos${currentTime}`
      }).then(()=>{
        window.location.reload();

      })
    }

  }

  return (
    <>
      <textarea
        name="newNoteTitle"
        placeholder="Todo Name"
        id="newNoteTitlee"
        onChange={TxtTitle}
      ></textarea>
      <div className="calender">
        <div className="cakenderLogo"><img src="./calender.svg" alt="" /></div>
        <div className="todoWrapper">
          <div className="todoDate" onClick={handleDateClick}>{selectedDate ? selectedDate.toDateString() : 'Select Date'}</div>
          <div className="todoDivider"></div>
          <div className="todoTime" onClick={handleTimeClick}>{selectedTime || 'Select Time'}</div>
        </div>
      </div>
      <div className="home_saveBtn" onClick={postDatas}>Save</div>
      {/* <div className="home_deleteBtn">Delete</div> */}

      {/* Date Picker */}
      {trigerDate &&
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Date"
          style={{ display: 'none' }} // Hidden initially
        />
      }


      {/* Time Picker */}
      {triggerTime &&
        <TimePicker
          value={selectedTime}
          onChange={handleTimeChange}
          disableClock={true}
          format="hh:mm a"
          placeholder="Select Time"
          style={{ display: 'none' }} // Hidden initially
        />
      }

    </>
  )
}

export default PopupForTodo
