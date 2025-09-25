import { useState, useMemo } from "react";
import { getUsers } from "../services/api";
import "./UsersTable.css";

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (err) {
            setError(err.message || "Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    // Generate avatar initials and color
    const getAvatarData = (name) => {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        ];
        const colorIndex = name.charCodeAt(0) % colors.length;
        return { initials, gradient: colors[colorIndex] };
    };

    // Filter and sort users
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];
            
            if (sortField === 'createdAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [users, searchTerm, sortField, sortDirection]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const exportToCSV = () => {
        const csvContent = [
            ['Name', 'Email', 'Age', 'Created At'],
            ...filteredAndSortedUsers.map(user => [
                user.name,
                user.email,
                user.age,
                new Date(user.createdAt).toLocaleString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (users.length === 0 && !loading && !error) {
        return (
            <div className="users-container">
                <div className="users-header">
                    <div className="header-actions">
                        <button className="btn btn-primary" onClick={fetchUsers}>
                            <span className="btn-icon">👥</span>
                            Load Users
                        </button>
                    </div>
                </div>
                
                <div className="empty-state">
                    <div className="empty-illustration">
                        <div className="floating-icons">
                            <span className="icon-1">👤</span>
                            <span className="icon-2">📊</span>
                            <span className="icon-3">✨</span>
                        </div>
                    </div>
                    <h3 className="empty-title">No Users Loaded</h3>
                    <p className="empty-description">Click the button above to fetch user data from the API</p>
                </div>
            </div>
        );
    }

    return (
        <div className="users-container">
            {/* Header with Controls */}
            <div className="users-header">
                <div className="header-controls">
                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                    
                    <div className="view-toggle">
                        <button
                            className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
                            onClick={() => setViewMode('cards')}
                        >
                            ⊞
                        </button>
                        <button
                            className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                            onClick={() => setViewMode('table')}
                        >
                            ☰
                        </button>
                    </div>
                </div>
                
                <div className="header-actions">
                    <button className="btn btn-secondary" onClick={fetchUsers} disabled={loading}>
                        <span className="btn-icon">🔄</span>
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                    {users.length > 0 && (
                        <button className="btn btn-secondary" onClick={exportToCSV}>
                            <span className="btn-icon">📊</span>
                            Export CSV
                        </button>
                    )}
                </div>
            </div>

            {/* Stats */}
            {users.length > 0 && (
                <div className="users-stats">
                    <div className="stat-item">
                        <span className="stat-value">{filteredAndSortedUsers.length}</span>
                        <span className="stat-label">Users Found</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{users.length}</span>
                        <span className="stat-label">Total Users</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{Math.round(users.reduce((acc, u) => acc + u.age, 0) / users.length)}</span>
                        <span className="stat-label">Avg Age</span>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner-large"></div>
                    <p className="loading-text">Fetching users from the mothership...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3 className="error-title">Oops! Something went wrong</h3>
                    <p className="error-message">{error}</p>
                    <button className="btn btn-primary" onClick={fetchUsers}>
                        Try Again
                    </button>
                </div>
            )}

            {/* Users Content */}
            {users.length > 0 && !loading && (
                <>
                    {viewMode === 'cards' ? (
                        <div className="users-grid">
                            {filteredAndSortedUsers.map((user, index) => {
                                const avatarData = getAvatarData(user.name);
                                return (
                                    <div 
                                        key={user._id} 
                                        className="user-card"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className="user-avatar" style={{ background: avatarData.gradient }}>
                                            {avatarData.initials}
                                        </div>
                                        <div className="user-info">
                                            <h3 className="user-name">{user.name}</h3>
                                            <p className="user-email">{user.email}</p>
                                            <div className="user-meta">
                                                <span className="user-chip age-chip">
                                                    <span className="chip-icon">🎂</span>
                                                    {user.age} years
                                                </span>
                                                <span className="user-chip date-chip">
                                                    <span className="chip-icon">📅</span>
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="user-actions">
                                            <button className="action-btn">✏️</button>
                                            <button className="action-btn">👁️</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="users-table-container">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('name')} className="sortable">
                                            Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th onClick={() => handleSort('email')} className="sortable">
                                            Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th onClick={() => handleSort('age')} className="sortable">
                                            Age {sortField === 'age' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th onClick={() => handleSort('createdAt')} className="sortable">
                                            Created {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedUsers.map((user, index) => {
                                        const avatarData = getAvatarData(user.name);
                                        return (
                                            <tr 
                                                key={user._id} 
                                                className="user-row"
                                                style={{ animationDelay: `${index * 0.03}s` }}
                                            >
                                                <td>
                                                    <div className="user-cell">
                                                        <div className="user-avatar-small" style={{ background: avatarData.gradient }}>
                                                            {avatarData.initials}
                                                        </div>
                                                        <span className="user-name-text">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="user-email-text">{user.email}</td>
                                                <td>
                                                    <span className="age-badge">{user.age}</span>
                                                </td>
                                                <td className="date-text">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="action-btn">✏️</button>
                                                        <button className="action-btn">👁️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default UsersTable;
