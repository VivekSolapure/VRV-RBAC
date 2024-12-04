import React, { useState } from 'react';
import './PopupForUsers.css'
import { useFirebase } from "../context/Firebase";

function PopupForUsers() {
  const [Post_textarea, setPost_textarea] = useState("");
  const [selectedRole, setSelectedRole] = useState('');
  const [status, setStatus] = useState(false);

  const TxtChange = (event) => {
    setPost_textarea(event.target.value);
  };

  const [Post_txtTitle, setPost_txtTile] = useState("");
  const TxtTitle = (event) => {
    setPost_txtTile(event.target.value);
  };

  const firebase = useFirebase();

  const openPopup = (post) => {
    setSelectedRole(post.role || ''); // Set role if available
  };


  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
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

    if ((Post_txtTitle && selectedRole) === '') {
      alert("Please Fill all ");
      if (window.confirm) {
        window.location.reload()
      }
    } else {
      firebase.putData(`Users/User${currentTime}`, {
        title: Post_txtTitle,
        role: selectedRole,
        status: status,
        postuploadedon: formattedDate,
        key: `User${currentTime}`
      })
    }
    window.location.reload();

  }

  return (
    <>
      <>
        <textarea
          name="newUserTitle"
          placeholder="Title"
          id="newUserTitle"
          onChange={TxtTitle}
        ></textarea>
        <div className="role-selection">
          <div
            className={`role-option ${selectedRole === "Admin" ? "selected" : ""}`}
            onClick={() => setSelectedRole("Admin")}
          >
            Admin
          </div>
          <div
            className={`role-option ${selectedRole === "Editor" ? "selected" : ""}`}
            onClick={() => setSelectedRole("Editor")}
          >
            Editor
          </div>
          <div
            className={`role-option ${selectedRole === "Viewer" ? "selected" : ""}`}
            onClick={() => setSelectedRole("Viewer")}
          >
            Viewer
          </div>
          <div
            className={`role-option ${status === true ? "selected" : ""}`}
            onClick={() => setStatus(true)}
          >
            Active
          </div>
        </div>
        <div className="home_saveBtn" onClick={postDatas} >Save</div>
      </>



    </>
  )
}

export default PopupForUsers