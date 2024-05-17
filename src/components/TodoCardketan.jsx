
import './TodoCard.css'
import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, push, onValue, remove, update } from 'firebase/database';
import { child, get } from "firebase/database";
import './PopupForTodo.css'

import { database, useFirebase } from '../context/Firebase';


const TodoCard = () => {
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

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [whichnotekey, setwhichnotekey] = useState({})
    const [whichnotepara, setwhichnotepara] = useState('')
    const [whichnotetitle, setwhichnotetitle] = useState('')
    const popupRef = useRef(null); // Initialize with null
    const openPopup = (post, postData) => {
        // console.log('Whichnotekey', Object.keys(post.key))
        // setwhichnotekey(post.key);
        // setwhichnotepara(post.description);
        // setwhichnotetitle(post.title);
        setIsPopupOpen(true);
    };
    // console.log('Whichnote', );
    const [postData, setpostData] = useState([]);

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

    }, []);
    // console.log(postData);
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
                description: whichnotepara,
                postuploadedon: formattedDate,
                key: whichnotekey
            })
        }
        window.location.reload();
    }

    const deleteNote = () => {
        const delNodeRef = ref(database, `Notes/${whichnotekey}`)
        remove(delNodeRef).then(() => {
            alert('Node deleted successfully');
        })
            .catch((error) => {
                alert('Error deleting node:', error);
            });
        window.location.reload();

    }

    const [Post_textarea, setPost_textarea] = useState("");
    const TxtChange = (event) => {
        setwhichnotepara(event.target.value);
    };

    const [Post_txtTitle, setPost_txtTile] = useState("");
    const TxtTitle = (event) => {
        setwhichnotetitle(event.target.value);
    };


    return (
        <>
            <div className="home_seperation">
                <div className='home_sperationLine'></div>
            </div>
            <div className={`home_popup ${isPopupOpen ? 'acticehome_popup' : ''}`}>
                <section ref={popupRef} className="home_popupForNotes">
                    <textarea
                        name="newNoteTitle"
                        placeholder="Todo Name"
                        id="newNoteTitle"
                        onChange={(e) => setEditTaskName(e.target.value)}

                        value={whichnotetitle}
                    ></textarea>
                    <div className="calender">
                        <div className="cakenderLogo"><img src="./calender.svg" alt="" /></div>
                        <div className="todoWrapper">
                            <div className="todoDate">asdf</div>
                            <div className="todoDivider"></div>
                            <div className="todoTime">10.10 am</div>
                        </div>

                    </div>
                    <div className="home_saveBtn" onClick={postDatas} >Save</div>
                    <div className="home_deleteBtn" onClick={deleteNote}>Delete</div>
                </section>

            </div>
            <div className="home_TodoContainer" onClick={() => openPopup()}>
                <div className="home_Todoheading">TO DO</div>
                <div className="home_TodoListContainer">

                    {tasks.map(task => (
                        <div key={task.id} className="home_TodoList" onClick={() => handleEditMode(task.id, task.name)}>
                            <div className="home_TodoHeading">
                                {task.editMode ? (
                                    <input
                                        type="text"
                                        value={editTaskName}
                                        onChange={(e) => setEditTaskName(e.target.value)}
                                        onBlur={() => handleEditTask(task.id)}
                                        autoFocus
                                    />
                                ) : (
                                    <div className="home_TodoName">{task.name}</div>
                                )}
                                <div className="home_TodoEditLogo" >
                                    <img src="./edit.svg" alt="" />
                                </div>
                            </div>
                            <div className="home_TodoPara">{task.date}</div>
                            <button className='rm_btn' onClick={() => handleRemoveTask(task.id)}>Remove</button>
                        </div>
                    ))}
                    <div className="home_TodoListAdd" onClick={() => setShowAddForm(!showAddForm)}>
                        <img src='./addTask.svg' alt="Add Task" className="plus_icon" /> </div>

                    {showAddForm && (<div className='home_AddTaskForm'>
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            placeholder="Enter task name"
                        />
                        <textarea
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            placeholder="Enter task description"
                        />
                        <div className='add-task_btn'>
                            <button onClick={handleAddTask}>Add Task</button>
                        </div>
                    </div>)}

                </div>
            </div>
        </>
    )
}

export default TodoCard