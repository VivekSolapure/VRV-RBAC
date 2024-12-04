import React from 'react';

function Filters({ selectedRoles, setSelectedRoles, selectedStatuses, setSelectedStatuses }) {
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

    return (
        <div className="home_filters">
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
    );
}

export default Filters;
