import React, { useState} from 'react';
import './PopupForNotes.css'
import { useFirebase } from "../context/Firebase";

function PopupForNotes() {
  const [Post_textarea, setPost_textarea] = useState("");
  const TxtChange = (event) => {
    setPost_textarea(event.target.value);
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

    var currentTime = year + month + day + hour + minute + second;

    if (((Post_txtTitle || Post_textarea) === '')) {
      alert("Please Fill all ");
      if (window.confirm) {
        window.location.reload()
      }
    } else {
      firebase.putData(`Notes/note${currentTime}`, {
        title: Post_txtTitle,
        description: Post_textarea,
        postuploadedon: formattedDate,
        key:`note${currentTime}`
      })
    }
    window.location.reload();

  }

  return (
    <>
            <>
                <textarea
                  name="newNoteTitle"
                  placeholder="Title"
                  id="newNoteTitle"
                  onChange={TxtTitle}
                ></textarea>
                <textarea
                  name="newNotePara"
                  placeholder="Type something here..."
                  id="newNotePara"
                  onChange={TxtChange}
                ></textarea>
                <div className="home_saveBtn" onClick={postDatas} >Save</div>
            </>
      


    </>
  )
}

export default PopupForNotes
