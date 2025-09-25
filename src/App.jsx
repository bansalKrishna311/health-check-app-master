import React from "react";
import UsersTable from "./components/UsersTable";
import HealthCheck from "./components/HealthCheck";
import "./App.css";

function App() {
    return (
        <div className="app-container">
            {/* Floating Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo-container">
                        <div className="rocket-logo">🚀</div>
                        <div className="header-text">
                            <h1 className="header-title text-gradient">API Health Dashboard</h1>
                            <p className="header-subtitle">Ultra-Modern Monitoring Suite</p>
                        </div>
                    </div>
                    <div className="header-badge">
                        <span className="version-badge">v3.0</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Health Check Section */}
                <section className="health-section">
                    <div className="section-header">
                        <h2 className="section-title">System Health</h2>
                        <p className="section-subtitle">Real-time API monitoring and status</p>
                    </div>
                    <HealthCheck />
                </section>

                {/* User Management Section */}
                <section className="users-section">
                    <div className="section-header">
                        <h2 className="section-title">User Management</h2>
                        <p className="section-subtitle">Browse and manage user data</p>
                    </div>
                    <UsersTable />
                </section>
            </main>
        </div>
    );
}

export default App;
