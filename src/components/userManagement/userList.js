import React from 'react';

function UserList({ filteredUsers, loading, openPopup }) {
    return (
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
    );
}

export default UserList;
