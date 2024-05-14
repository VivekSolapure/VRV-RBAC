import React, { useState, useRef, useEffect } from 'react';
import './Home.css';

function Home() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (!popupRef.current.contains(event.target)) setIsPopupOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const inputFileRef = useRef(null);
  console.log(inputFileRef.value);
  const triggerFileInputClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  const [fileName, setfileName] = useState(null)
  const handleFileChange = () => {
    const files = inputFileRef.current.files;
    // Do something with the selected files
    console.log(files);
    const names = [...files].map(file => file.name).join(", ");
    setfileName(names)
  };

  return (
    <>
      <div className={`home_popup ${isPopupOpen ? 'acticehome_popup' : ''}`}>
        <section ref={popupRef} className="home_popupForNotes">
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
          <div className="newNoteDropFile" onClick={triggerFileInputClick}>
            <label htmlFor="input-file">
              <div id="img-view">
                <input type="file" ref={inputFileRef} onChange={handleFileChange} hidden multiple />
                <img src="" alt="" />
                <span>{fileName || 'DropFile'}</span>
              </div>
                <span>{fileName}</span>
            </label>
          </div>
        </section>
      </div>
      <div className="home_main">
        <div className="home_container">
          <div className="home_heading">
            <div className="home_headName">Notes Master</div>
            <div className="home_createBtn">Create</div>
          </div>
          <div className="home_notesContainer">
            <div className="home_notesList" onClick={openPopup}>
              <div className="home_noteHeading">
                <div className="home_noteName">Web Design</div>
                <div className="home_noteEditLogo">
                  <img src="./edit.svg" alt="" />
                </div>
              </div>
              <div className="home_notePara">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt harum cupiditate officiis. Atque numquam sint nesciunt neque facilis accusamus. Fuga officiis sed alias reprehenderit deserunt repellendus suscipit veniam quidem voluptatum. From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>
            <div className="home_notesList">
              <div className="home_noteHeading">
                <div className="home_noteName">Web Design</div>
                <div className="home_noteEditLogo">
                  <img src="./edit.svg" alt="" />
                </div>
              </div>
              <div className="home_notePara">From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>
            <div className="home_notesList">
              <div className="home_noteHeading">
                <div className="home_noteName">Web Design</div>
                <div className="home_noteEditLogo">
                  <img src="./edit.svg" alt="" />
                </div>
              </div>
              <div className="home_notePara">From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>
            <div className="home_notesList">
              <div className="home_noteHeading">
                <div className="home_noteName">Web Design</div>
                <div className="home_noteEditLogo">
                  <img src="./edit.svg" alt="" />
                </div>
              </div>
              <div className="home_notePara">From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>
            <div className="home_notesList">
              <div className="home_noteHeading">
                <div className="home_noteName">Web Design</div>
                <div className="home_noteEditLogo">
                  <img src="./edit.svg" alt="" />
                </div>
              </div>
              <div className="home_notePara">From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>
            <div className="home_notesList">
              <div className="home_noteHeading">
                <div className="home_noteName">Web Design</div>
                <div className="home_noteEditLogo">
                  <img src="./edit.svg" alt="" />
                </div>
              </div>
              <div className="home_notePara">From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>
            <div className="home_notesList">
              <div className="home_noteHeading">
                <div className="home_noteName">Web Design</div>
                <div className="home_noteEditLogo">
                  <img src="./edit.svg" alt="" />
                </div>
              </div>
              <div className="home_notePara">From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>
            <div className="home_notesList">
              <div className="home_noteHeading">
                <div className="home_noteName">Web Design</div>
                <div className="home_noteEditLogo">
                  <img src="./edit.svg" alt="" />
                </div>
              </div>
              <div className="home_notePara">From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>

          </div>
          <div className="home_seperation"><div className='home_sperationLine'></div></div>
          <div className="home_TodoContainer">
            <div className="home_Todoheading">TO DO</div>
            <div className="home_TodoListContainer">
              <div className="home_TodoList">
                <div className="home_TodoHeading">
                  <div className="home_TodoName">Web Design</div>
                  <div className="home_TodoEditLogo">
                    <img src="./edit.svg" alt="" />
                  </div>
                </div>
                <div className="home_TodoPara">10 Apr 2024 | 10 pm</div>
              </div>
              <div className="home_TodoListAdd">
                <div className="home_TodoListAddLogo"><img src="./addTask.svg" alt="" /></div>
                <div className="home_TodoListAddTxt">Add Task</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home