import React, { useState, useEffect, useMemo } from 'react';
import { child, get, ref } from "firebase/database";
import { database } from "../context/Firebase";
import SearchBar from './userManagement/SearchBar';
import Filters from './userManagement/userFilter';
import UserList from './userManagement/userList';
import PopupForUsers from './PopupForUsers';
import './UserCard.css';

function UserCard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [whichUserkey, setWhichUserkey] = useState('');
    const [whichUsertitle, setWhichUsertitle] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [postData, setPostData] = useState({});
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Users Effect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(child(ref(database), 'Users'));
                const data = snapshot.val() || {};
                setPostData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtered Users
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

    const openPopup = (post) => {
        setWhichUserkey(post.key);
        setWhichUsertitle(post.title);
        setSelectedRole(post.role || '');
        setIsPopupOpen(true);
    };

    return (
        <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Filters 
                selectedRoles={selectedRoles} 
                setSelectedRoles={setSelectedRoles}
                selectedStatuses={selectedStatuses}
                setSelectedStatuses={setSelectedStatuses}
            />
            <UserList 
                filteredUsers={filteredUsers} 
                loading={loading} 
                openPopup={openPopup}
            />
            {isPopupOpen && (
                <PopupForUsers 
                    isOpen={isPopupOpen}
                    setIsPopupOpen={setIsPopupOpen}
                    whichUserkey={whichUserkey}
                    whichUsertitle={whichUsertitle}
                    selectedRole={selectedRole}
                />
            )}
        </>
    );
}

export default UserCard;
