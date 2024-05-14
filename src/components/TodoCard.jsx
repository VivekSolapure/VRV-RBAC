import React from 'react'
import './TodoCard.css'

function TodoCard() {
    return (
        <>
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
        </>
    )
}

export default TodoCard