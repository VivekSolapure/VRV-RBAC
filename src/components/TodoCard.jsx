import './TodoCard.css'
import './PopupForTodo.css'
import React, { useState, useRef, useEffect } from 'react';
import { child, get, ref, remove } from "firebase/database";
import { database } from "../context/Firebase";
import { useFirebase } from "../context/Firebase";
import PopupForTodo from './PopupForTodo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';


function TodoCard() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
    const [whichnotekey, setwhichnotekey] = useState('')
    const [whichnotedate, setwhichnotedate] = useState('')
    const [whichnotetime, setwhichnotetime] = useState('')
    const [whichnotepara, setwhichnotepara] = useState('')
    const [whichnotetitle, setwhichnotetitle] = useState('')
    const popupRef = useRef(null);
    const CreatepopupRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target) && !CreatepopupRef.current.contains(event.target)) {
                setIsPopupOpen(false);
                setIsCreatePopupOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const openPopup = (post, postData) => {
        setwhichnotekey(post.key);
        setwhichnotepara(post.description);
        setwhichnotetitle(post.title);
        setwhichnotedate(post.date)
        setwhichnotetime(post.time)
        setIsPopupOpen(true);
    };

    const openCreatePopup = () => {
        setIsCreatePopupOpen(true)
    }

    const [postData, setpostData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                get(child(ref(database), 'Todo')).then(snapshot => {
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

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [triggerTime, settriggerTime] = useState(false)
    const [trigerDate, settrigerDate] = useState(false)
    // const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';
    // const formattedTime = selectedTime ? format(selectedTime, 'hh:mm a') : '';

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
    const firebase=useFirebase();

    const postDatas = async () => {
        // let formattedDate = `${selectedDate} ${selectedTime}`;
        if ((whichnotetitle || whichnotepara) === '') {
            alert("Please fill all fields");
            return;
        }
        try {
            firebase.putData(`Todo/${whichnotekey}`,{
                title: whichnotetitle,
                postuploadedon: new Date().toISOString(),
                date: selectedDate.toDateString(),
                time: selectedTime,
                key: whichnotekey
            });
            window.location.reload();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const deleteNote = () => {
        const delNodeRef = ref(database, `Todo/${whichnotekey}`);
        remove(delNodeRef)
            .then(() => {
                alert('Task deleted successfully');
                window.location.reload();
            })
            .catch((error) => {
                alert('Error deleting node:', error);
            });
    };
    const TxtTitle = (event) => {
        setwhichnotetitle(event.target.value);
    };
    return (
        <>
            <div className={`home_popup ${isCreatePopupOpen ? 'acticehome_popup' : ''}`}>
                <section ref={CreatepopupRef} className="home_popupForNotess">
                    <PopupForTodo></PopupForTodo>
                </section>
            </div>
            <div className={`home_popup ${isPopupOpen ? 'acticehome_popup' : ''}`}>
                <section ref={popupRef} className="home_popupForNotess">
                    <textarea
                        name="newNoteTitle"
                        placeholder="Todo Name"
                        id="newNoteTitlee"
                        onChange={TxtTitle}
                        value={whichnotetitle}
                    ></textarea>
                    <div className="calender">
                        <div className="cakenderLogo"><img src="./calender.svg" alt="" /></div>
                        <div className="todoWrapper">
                            <div className="todoDate" onClick={handleDateClick}>{selectedDate ? selectedDate.toDateString(): whichnotedate}</div>
                            <div className="todoDivider"></div>
                            <div className="todoTime" onClick={handleTimeClick}>{selectedTime ? selectedTime: whichnotetime}</div>
                        </div>
                    </div>
                    <div className="home_saveBtn" onClick={postDatas}>Save</div>
                    <div className="home_deleteBtn" onClick={deleteNote}>Delete</div>

                    {trigerDate &&
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Date"
                            style={{ display: 'none' }}
                        />
                    }

                    {triggerTime &&
                        <TimePicker
                            value={selectedTime}
                            onChange={handleTimeChange}
                            disableClock={true}
                            format="hh:mm a"
                            placeholder="Select Time"
                            style={{ display: 'none' }}
                        />
                    }
                </section>
            </div>
            <div className="home_TodoContainer" >
                <div className="home_Todoheading">TO DO</div>
                <div className="home_TodoListContainer">
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        Object.values(postData).length === 0 ? (
                            <h1>No data found</h1>
                        ) : (
                            Object.values(postData).map((post, id) => (
                                <div className="home_TodoList" onClick={() => openPopup(post, postData)} key={id}>
                                    <div className="home_TodoHeading">
                                        <div className="home_TodoName">{post.title}</div>
                                        <div className="home_TodoEditLogo">
                                            <img src="./edit.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="home_TodoPara">{post.date} | {post.time}</div>
                                </div>
                            ))
                        )
                    )}
                    <div className="home_TodoListAdd" onClick={() => openCreatePopup()}>
                        <div className="home_TodoListAddLogo"><img src="./addTask.svg" alt="" /></div>
                        <div className="home_TodoListAddTxt">Add Task</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoCard;
