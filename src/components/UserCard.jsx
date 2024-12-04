import React, { useState, useRef, useEffect, useMemo } from 'react';
import './UserCard.css';
import { child, get, ref, remove } from "firebase/database";
import { database } from "../context/Firebase";
import { useFirebase } from "../context/Firebase";
import PopupForUsers from './PopupForUsers';

function UserCard() {
    // State Management
    const [searchTerm, setSearchTerm] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [whichUserkey, setWhichUserkey] = useState('');
    const [whichUsertitle, setWhichUsertitle] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [postData, setPostData] = useState({});
    const [filteredData, setFilteredData] = useState({});
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const popupRef = useRef(null);

    const firebase = useFirebase();

    // Fetch Users Effect
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

        fetchData();
    }, []);

    // Comprehensive Filtering Function
    const filteredUsers = useMemo(() => {
        let result = Object.entries(postData);

        // Search Filter
        if (searchTerm) {
            result = result.filter(([, post]) => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Role Filter
        if (selectedRoles.length > 0) {
            result = result.filter(([, post]) => 
                selectedRoles.includes(post.role)
            );
        }

        // Status Filter
        if (selectedStatuses.length > 0) {
            result = result.filter(([, post]) => 
                selectedStatuses.includes(post.status ? 'Active' : 'Inactive')
            );
        }

        return Object.fromEntries(result);
    }, [postData, searchTerm, selectedRoles, selectedStatuses]);

    // Event Handlers
    const openPopup = (post) => {
        setWhichUserkey(post.key);
        setWhichUsertitle(post.title);
        setSelectedRole(post.role || '');
        setStatus(post.status || false);
        setIsPopupOpen(true);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRoleFilterChange = (role) => {
        setSelectedRoles(prev => 
            prev.includes(role) 
                ? prev.filter(r => r !== role) 
                : [...prev, role]
        );
    };

    const handleStatusFilterChange = (statusValue) => {
        setSelectedStatuses(prev => 
            prev.includes(statusValue)
                ? prev.filter(s => s !== statusValue)
                : [...prev, statusValue]
        );
    };

    // Rendering Components
    return (
        <>
            {/* Search Input */}
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {/* Filters */}
            <div className="home_filters">
                {/* Role Filters */}
                {['Admin', 'Editor', 'Viewer'].map(role => (
                    <label key={role}>
                        <input
                            type="checkbox"
                            value={role}
                            onChange={() => handleRoleFilterChange(role)}
                            checked={selectedRoles.includes(role)}
                        />
                        {role}
                    </label>
                ))}

                {/* Status Filters */}
                {['Active', 'Inactive'].map(status => (
                    <label key={status}>
                        <input
                            type="checkbox"
                            value={status}
                            onChange={() => handleStatusFilterChange(status)}
                            checked={selectedStatuses.includes(status)}
                        />
                        {status}
                    </label>
                ))}
            </div>

            {/* Rest of the component (popup, user list rendering) remains similar to previous implementation */}
            <div className="home_UsersContainer">
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    Object.keys(filteredUsers).length === 0 ? (
                        <h1>No users found</h1>
                    ) : (
                        Object.entries(filteredUsers).map(([key, post]) => (
                            <div className="home_UsersList" onClick={() => openPopup({...post, key})} key={key}>
                                <div className="home_UserHeading">
                                    <div className="home_UserName">{post.title}</div>
                                    <div className="home_UserEditLogo">
                                        <img src="./edit.svg" alt="" />
                                    </div>
                                </div>
                                <div className="home_UserPara">Role: {post.role || 'Not Assigned'}</div>
                                <div className="home_UserStatusContainer">
                                    <div className="home_UserStatus">
                                        {post.status ? "Active" : "Inactive"}
                                    </div>
                                    <div className="home_UserDate">
                                        {post.postuploadedon || 'No Date'}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>
        </>
    );
}

export default UserCard;