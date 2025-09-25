import { useState } from "react";
import { getUsers } from "../services/api";

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
                onClick={fetchUsers}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                }}
            >
                Load Users
            </button>

            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "red" }}> {error}</p>}

            {users.length > 0 && (
                <table
                    border="1"
                    cellPadding="10"
                    style={{ margin: "0 auto", borderCollapse: "collapse" }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#f0f0f0" }}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.age}</td>
                                <td>{new Date(u.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UsersTable;
