import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
        </div>
    );
}

export default SearchBar;
