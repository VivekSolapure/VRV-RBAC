import React, { useState } from 'react';
import './HowItWorks.css';

const Guide = () => {
    const [selectedSection, setSelectedSection] = useState('Introduction');

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    return (
        <div className="guide-container">
            <div className="side-pane">
                <h1>User Guide</h1>
                <h2>Contents</h2>
                <ul className='list-items'>
                    <li onClick={() => handleSectionClick('Introduction')}>Introduction</li>
                    <li onClick={() => handleSectionClick('Getting Started')}>Getting Started</li>
                    <li onClick={() => handleSectionClick('Features And Functionality')}>Features And Functionality</li>
                    <li onClick={() => handleSectionClick('Task Management')}>Task Management</li>
                    <li onClick={() => handleSectionClick('Reminder')}>Reminder</li>
                    <li onClick={() => handleSectionClick('TroubleShooting')}>TroubleShooting</li>
                </ul>
            </div>
            <div className="main-content">
                <h1>{selectedSection}</h1>
                {selectedSection === 'Introduction' && (
                    <div>
                        <h2>Introduction</h2>
                        <p>Welcome to User Master, your user-friendly web platform designed to simplify User-taking and task management. <br />This guide will help you get started with User Master and make the most out of its features.</p>
                    </div>
                )}
                {selectedSection === 'Getting Started' && (
                    <div>
                        <h2>Getting Started</h2>
                        <p>Logging In<br />
                            1.Visit the User Master website.<br />
                            2. Click on the "Login" button.<br />
                            3.Enter your username and password.<br />
                            4.Click "Login" to access your account.<br />
                        </p>
                        <p id='two'>
                            Creating an Account <br />
                            1.If you're a new user, click on the "Sign Up" button.<br />
                            2.Fill out the registration form with your details.<br />
                            3.Click "Sign Up" to create your account.<br />
                        </p>
                    </div>
                )}
                {selectedSection === 'Features And Functionality' && (
                    <div>
                        <h2>Features And Functionality</h2>
                        <p>Text Users <br />
                            Creating a User <br />
                            Click on the "Text Users" interface. <br />
                            Click the "+" button to create a new User. <br />
                            Enter your User title and content. <br />
                            Click "Save" to save your User. <br />
                        </p>
                        <p id='two'>
                            Organizing Users <br />
                            To organize your Users, use the sidebar to create folders. <br />
                            Drag and drop Users into the desired folders for organization. <br />
                        </p>
                    </div>
                )}
                {selectedSection === 'Task Management' && (
                    <div>
                        <h2>Task Management</h2>
                        <p>Adding Tasks <br />
                            1.Navigate to the "Task Management" interface.<br />
                            2.Click the "+" button to add a new task.<br />
                            3.Enter the task details, including title, description, deadline, and associated Users.<br />
                            4.Click "Save" to add the task.</p>
                        <p id='two'>
                            Organizing Tasks <br />
                            Use the drag and drop feature to prioritize tasks.<br />
                            Assign tasks to different categories for better organization.<br />
                        </p>
                    </div>
                )}
                {selectedSection === 'Reminder' && (
                    <div>
                        <h2>Reminder</h2>
                        <p>Setting Reminders <br />
                            1.Click on the "Reminders" icon. <br />
                            2.Choose the task or User you want to set a reminder for. <br />
                            3.Select the date and time for the reminder.  <br />
                            4.Click "Set Reminder" to schedule the reminder.</p>
                    </div>
                )}
                {selectedSection === 'TroubleShooting' && (
                    <div>
                        <h2>TroubleShooting</h2>
                        <p>Common Issues <br />
                            Forgot Password <br />
                            If you forget your password: <br />
                            Click on the "Forgot Password" link on the login page.<br />
                            Enter your email address. <br />
                            Follow the instructions in the email to reset your password.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Guide;
