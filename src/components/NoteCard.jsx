import React, { useState, useRef, useEffect } from 'react';
import './NoteCard.css'
import { child, get, ref, remove } from "firebase/database";
import { database } from "../context/Firebase";
import { useFirebase } from "../context/Firebase";

import './NoteCard.css';

function NoteCard() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [whichnotekey, setWhichnotekey] = useState('');
    const [whichnotepara, setWhichnotepara] = useState('');
    const [whichnotetitle, setWhichnotetitle] = useState('');
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);
    const popupRef = useRef(null);

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

    const openPopup = (post) => {
        setWhichnotekey(post.key);
        setWhichnotepara(post.description);
        setWhichnotetitle(post.title);
        setIsPopupOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(child(ref(database), 'Notes'));
                const data = snapshot.val();
                if (data) {
                    setPostData(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTxtChange = (event) => {
        setWhichnotepara(event.target.value);
    };

    const handleTxtTitleChange = (event) => {
        setWhichnotetitle(event.target.value);
    };

    const firebase = useFirebase();

    const postDatas = async () => {
        const ccurrentDate = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[ccurrentDate.getMonth()];
        const dday = (`0${ccurrentDate.getDate()}`).slice(-2);
        const formattedDate = `${dday} ${monthName} ${ccurrentDate.getFullYear().toString().slice(-2)}`;

        if (!whichnotetitle || !whichnotepara) {
            alert("Please Fill all fields");
            return;
        }

        await firebase.putData(`Notes/${whichnotekey}`, {
            title: whichnotetitle,
            description: whichnotepara,
            postuploadedon: formattedDate,
            key: whichnotekey
        });

        window.location.reload();
    };

    const deleteNote = async () => {
        const delNodeRef = ref(database, `Notes/${whichnotekey}`);
        try {
            await remove(delNodeRef);
            alert('Note deleted successfully');
            window.location.reload();
        } catch (error) {
            alert('Error deleting note:', error);
        }
    };

    return (
        <>
            <div className={`home_popup ${isPopupOpen ? 'acticehome_popup' : ''}`} >
                <section ref={popupRef} className="home_popupForNotes">
                    <textarea
                        name="newNoteTitle"
                        placeholder="Title"
                        id="newNoteTitle"
                        onChange={handleTxtTitleChange}
                        value={whichnotetitle}
                    ></textarea>
                    <textarea
                        name="newNotePara"
                        placeholder="Type something here..."
                        id="newNotePara"
                        onChange={handleTxtChange}
                        value={whichnotepara}
                    ></textarea>
                    <div className="home_saveBtn" onClick={postDatas}>Save</div>
                    <div className="home_deleteBtn" onClick={deleteNote}>Delete</div>
                </section>
            </div>
            <div className="home_notesContainer">

            {loading ? (
                <h1>Loading...</h1>
            ) : (
                Object.keys(postData).length === 0 ? (
                    <h1>No data found</h1>
                ) : (
                    Object.entries(postData).map(([key, post]) => (
                            <div className="home_notesList" onClick={() => openPopup(post)} key={key}>
                                <div className="home_noteHeading">
                                    <div className="home_noteName">{post.title}</div>
                                    <div className="home_noteEditLogo">
                                        <img src="./edit.svg" alt="" />
                                    </div>
                                </div>
                                <div className="home_notePara">{post.description}</div>
                            </div>
                    ))
                )
            )}
                        </div>

        </>
    );
}

export default NoteCard;
