import React from 'react';

const UserFilter = ({
    selectedRoles,
    setSelectedRoles,
    selectedStatuses,
    setSelectedStatuses,
    handleSearchChange,
    applyFilters,
    searchBarRef
}) => {
    const handleRoleFilterChange = (role) => {
        const updatedRoles = selectedRoles.includes(role)
            ? selectedRoles.filter(r => r !== role)
            : [...selectedRoles, role];

        setSelectedRoles(updatedRoles);
        applyFilters(updatedRoles, selectedStatuses);
    };

    const handleStatusFilterChange = (statusValue) => {
        const updatedStatuses = selectedStatuses.includes(statusValue)
            ? selectedStatuses.filter(s => s !== statusValue)
            : [...selectedStatuses, statusValue];

        setSelectedStatuses(updatedStatuses);
        applyFilters(selectedRoles, updatedStatuses);
    };

    return (
        <div className="home_filters">
            <input
                type="text"
                placeholder="Search by name"
                ref={searchBarRef}
                onChange={handleSearchChange}
            />
            <label>
                <input
                    type="checkbox"
                    value="Admin"
                    onChange={() => handleRoleFilterChange("Admin")}
                    checked={selectedRoles.includes("Admin")}
                />
                Admin
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Editor"
                    onChange={() => handleRoleFilterChange("Editor")}
                    checked={selectedRoles.includes("Editor")}
                />
                Editor
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Viewer"
                    onChange={() => handleRoleFilterChange("Viewer")}
                    checked={selectedRoles.includes("Viewer")}
                />
                Viewer
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Active"
                    onChange={() => handleStatusFilterChange("Active")}
                    checked={selectedStatuses.includes("Active")}
                />
                Active
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Inactive"
                    onChange={() => handleStatusFilterChange("Inactive")}
                    checked={selectedStatuses.includes("Inactive")}
                />
                Inactive
            </label>
        </div>
    );
};

export default UserFilter;
