import React, { useState, useRef, useEffect } from 'react';
import './UserCard.css';
import { child, get, ref, remove } from "firebase/database";
import { database } from "../context/Firebase";
import { useFirebase } from "../context/Firebase";
import PopupForUsers from './PopupForUsers';
import UserFilter from './User Management/UserFilter';

function UserCard() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [whichUserkey, setWhichUserkey] = useState('');
    const [whichUsertitle, setWhichUsertitle] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [postData, setPostData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const popupRef = useRef(null);
    const searchBarRef = useRef(null);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
    const CreatepopupRef = useRef(null);

    const firebase = useFirebase();

    const openPopup = (post) => {
        setWhichUserkey(post.key);
        setWhichUsertitle(post.title);
        setSelectedRole(post.role || '');
        setStatus(post.status || false);
        setIsPopupOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(child(ref(database), 'Users'));
                const data = snapshot.val() || {};
                setPostData(data);
                setFilteredData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        function handleClickOutside(event) {
            if (popupRef.current && popupRef.current.contains(event.target)) {
                setIsPopupOpen(true);
            } else {
                setIsPopupOpen(false);
            }
            if (CreatepopupRef.current && CreatepopupRef.current.contains(event.target)) {
                setIsCreatePopupOpen(true);
            } else {
                setIsCreatePopupOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            fetchData();

            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    const applyFilters = (roles, statuses) => {
        if (roles.length === 0 && statuses.length === 0 && !searchBarRef.current.value) {
            setFilteredData(postData);
            return;
        }

        let filtered = Object.entries(postData);

        if (searchBarRef.current.value) {
            filtered = filtered.filter(([key, post]) => {
                const nameMatch = post.title && post.title.toLowerCase().includes(searchBarRef.current.value.toLowerCase());
                return nameMatch;
            });
        }

        filtered = filtered.filter(([key, post]) => {
            const roleMatch = roles.length === 0 || roles.includes(post.role);
            const statusMatch = statuses.length === 0 || statuses.includes(post.status ? 'Active' : 'Inactive');
            return roleMatch && statusMatch;
        });

        setFilteredData(Object.fromEntries(filtered));
    };


    const postDatas = async () => {
        const currentDate = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[currentDate.getMonth()];
        const day = (`0${currentDate.getDate()}`).slice(-2);
        const formattedDate = `${day} ${monthName} ${currentDate.getFullYear().toString().slice(-2)}`;

        // Validate required fields
        if (!whichUsertitle || !selectedRole) {
            alert("Please fill all fields");
            return;
        }

        try {
            await firebase.putData(`Users/${whichUserkey}`, {
                title: whichUsertitle,
                role: selectedRole,
                status: status, // Explicitly set boolean status
                postuploadedon: formattedDate,
                key: whichUserkey
            });

            alert("User saved successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error saving User:", error);
            alert("Failed to save user. Please try again.");
        }
    };

    const deleteUser = async () => {
        if (!whichUserkey) {
            alert("No user selected to delete");
            return;
        }

        const delNodeRef = ref(database, `Users/${whichUserkey}`);
        try {
            await remove(delNodeRef);
            alert('User deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error("Error deleting User:", error);
            alert("Failed to delete user. Please try again.");
        }
    };
    return (
        <>
            <UserFilter
                selectedRoles={selectedRoles}
                setSelectedRoles={setSelectedRoles}
                selectedStatuses={selectedStatuses}
                setSelectedStatuses={setSelectedStatuses}
                handleSearchChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filtered = Object.entries(postData).filter(([key, post]) => {
                        const nameMatch = post.title && post.title.toLowerCase().includes(searchTerm);
                        return nameMatch;
                    });
                    setFilteredData(Object.fromEntries(filtered));
                }}
                applyFilters={applyFilters}
                searchBarRef={searchBarRef}
            />

            {/* Existing popup and create popup components remain the same */}
            <div className={`home_popup ${isPopupOpen ? 'acticehome_popup' : ''}`}>
                <section ref={popupRef} className="home_popupForUsers">
                    <textarea
                        name="newUserTitle"
                        placeholder="Title"
                        id="newUserTitle"
                        onChange={(e)=>{setWhichUsertitle(e.target.value);}}
                        value={whichUsertitle}
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
                            className={`role-option ${status ? "selected" : ""}`}
                            onClick={() => setStatus(!status)}
                        >
                            {status ? "Active" : "Inactive"}
                        </div>
                    </div>

                    <div className="home_saveBtn" onClick={postDatas}>Save</div>
                    <div className="home_deleteBtn" onClick={deleteUser}>Delete</div>
                </section>
            </div>

            <div className="home_UsersContainer">
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    Object.keys(filteredData).length === 0 ? (
                        <h1>No data found</h1>
                    ) : (
                        Object.entries(filteredData).map(([key, post]) => (
                            <div className="home_UsersList" onClick={() => openPopup({ ...post, key })} key={key}>
                                <div className="home_UserHeading">
                                    <div className="home_UserName">{post.title}</div>
                                    <div className="home_UserEditLogo">
                                        <div className="home_UserStatus">
                                            {post.status ? "Active" : "Inactive"}
                                        </div>
                                    </div>
                                </div>
                                <div className="home_UserPara">Role: {post.role || 'Not Assigned'}</div>
                                <div className="home_UserStatusContainer">
                                    <div className="home_UserDate">
                                        {post.postuploadedon || 'No Date'}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                )}
                <div className="home_UsersList" onClick={()=>{setIsCreatePopupOpen(true);}}>
                    <div className="home_TodoListAddLogo"><img src="./addTask.svg" alt="" /></div>
                    <div className="home_TodoListAddTxt">Add User</div>
                </div>
            </div>

            <div className={`home_popup ${isCreatePopupOpen ? 'acticehome_popup' : ''}`}>
                <section ref={CreatepopupRef} className="home_popupForUsers">
                    <PopupForUsers></PopupForUsers>
                </section>
            </div>
        </>
    );
}

export default UserCard;