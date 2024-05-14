import React, { useState, useRef, useEffect } from 'react';
import './PopupForNotes.css'

function PopupForNotes(props) {
  const inputFileRef = useRef(null);
  const popupRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  console.log(inputFileRef.value);
  const triggerFileInputClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  // const [fileName, setfileName] = useState(null)
  // const handleFileChange = () => {
  //   const files = inputFileRef.current.files;
  //   console.log(files);
  //   const names = [...files].map(file => file.name).join(", ");
  //   setfileName(names)
  // };
  return (
    <>
          <textarea
            name="newNoteTitle"
            placeholder="Title"
            id="newNoteTitle"
          ></textarea>
          <textarea
            name="newNotePara"
            placeholder="Type something here..."
            id="newNotePara"
          ></textarea>
          {/* <div className="newNoteDropFile" onClick={triggerFileInputClick}>
            <label htmlFor="input-file">
              <div id="img-view">
                <input type="file" ref={inputFileRef} onChange={handleFileChange} hidden multiple />
                <img src="" alt="" />
                <span>{fileName || 'DropFile'}</span>
              </div>
                <span>{fileName}</span>
            </label>
          </div> */}
          <div className="home_saveBtn">Save</div>
          <div className="home_deleteBtn">Delete</div>
    </>
  )
}

export default PopupForNotes