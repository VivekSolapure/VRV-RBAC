import React, { useState, useRef, useEffect } from 'react';
import PopupForNotes from './PopupForTodo';
import { child, get, ref, remove } from "firebase/database";
import { database } from "../context/Firebase";
import { FirebaseProvider, db, storage, useFirebase } from "../context/Firebase";

import './NoteCard.css'


function NoteCard() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [whichnotekey, setwhichnotekey] = useState({})
    const [whichnotepara, setwhichnotepara] = useState('')
    const [whichnotetitle, setwhichnotetitle] = useState('')
    const popupRef = useRef(null); // Initialize with null
    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const openPopup = (post, postData) => {
        console.log('Whichnotekey', Object.keys(post.key))
        setwhichnotekey(post.key);
        setwhichnotepara(post.description);
        setwhichnotetitle(post.title);
        setIsPopupOpen(true);
    };
    // console.log('Whichnote', );
    const [postData, setpostData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                get(child(ref(database), 'Notes')).then(snapshot => {
                    const data = snapshot.val();
                    if (data) {
                        setpostData(data);
                    }
                })
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 5 seconds

        return () => clearTimeout(timer);

    }, []);
    console.log(postData);

    const [Post_textarea, setPost_textarea] = useState("");
    const TxtChange = (event) => {
        setwhichnotepara(event.target.value);
    };

    const [Post_txtTitle, setPost_txtTile] = useState("");
    const TxtTitle = (event) => {
        setwhichnotetitle(event.target.value);
    };

    const firebase = useFirebase();

    const triggerFileInputClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }
    let count = 0
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
        let time = Date.now();

        // Get current date and time
        var currentDate = new Date();

        // Extract individual components
        var year = currentDate.getFullYear();
        var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month since it is zero-based
        var day = ('0' + currentDate.getDate()).slice(-2);
        var hour = ('0' + currentDate.getHours()).slice(-2);
        var minute = ('0' + currentDate.getMinutes()).slice(-2);
        var second = ('0' + currentDate.getSeconds()).slice(-2);

        // Concatenate components into desired format
        var currentTime = year + month + day + hour + minute + second;

        if (((whichnotetitle || whichnotepara) === '')) {
            alert("Please Fill all ");
            if (window.confirm) {
                window.location.reload()
            }
        } else {
            firebase.putData(`Notes/${whichnotekey}`, {
                title: whichnotetitle,
                postuploadedon: formattedDate,
                key: whichnotekey
            })
        }
        window.location.reload();
    }

    const deleteNote = () => {
        const delNodeRef = ref(database, `Notes/${whichnotekey}`)
        remove(delNodeRef).then(() => {
            alert('Note deleted successfully');
        })
            .catch((error) => {
                alert('Error deleting node:', error);
            });
        window.location.reload();

    }

    return (
        <>
            {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        Object.values(postData).length === 0 ? (
                            <h1>No data found</h1>
                        ) : (
                    Object.values(postData).map((post, id) => (
                        <>
                            <div className={`home_popup ${isPopupOpen ? 'acticehome_popup' : ''}`} key={id}>
                                <section ref={popupRef} className="home_popupForNotes">
                                    <textarea
                                        name="newNoteTitle"
                                        placeholder="Title"
                                        id="newNoteTitle"
                                        onChange={TxtTitle}
                                        key={id}
                                        value={whichnotetitle}
                                    ></textarea>
                                    <textarea
                                        name="newNotePara"
                                        placeholder="Type something here..."
                                        id="newNotePara"
                                        onChange={TxtChange}
                                        key={id}
                                        value={whichnotepara}
                                    ></textarea>
                                    <div className="home_saveBtn" onClick={postDatas} >Save</div>
                                    <div className="home_deleteBtn" onClick={deleteNote}>Delete</div>
                                </section>

                            </div>
                            <div className="home_notesList" onClick={() => openPopup(post, postData)} key={id}>
                                <div className="home_noteHeading">
                                    <div className="home_noteName">{post.title}</div>
                                    <div className="home_noteEditLogo">
                                        <img src="./edit.svg" alt="" />
                                    </div>
                                </div>
                                <div className="home_notePara">{post.description}</div>
                            </div>

                        </>
                    )))
                )
            }

        </>
    )
}

export default NoteCard