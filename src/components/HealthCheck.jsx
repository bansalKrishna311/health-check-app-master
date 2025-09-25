import { getHealth } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import "./HealthCheck.css";

function HealthCheck() {
  const { data, loading, error } = useFetch(getHealth);

  if (loading) {
    return (
      <div className="health-container">
        <div className="health-banner loading">
          <div className="status-icon loading-icon">
            <div className="loading-spinner"></div>
          </div>
          <div className="status-content">
            <h3 className="status-title">Checking System Health...</h3>
            <p className="status-message">Running diagnostics</p>
          </div>
        </div>
        
        <div className="health-metrics loading-skeleton">
          <div className="metric-card">
            <div className="skeleton-bar"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="metric-card">
            <div className="skeleton-bar"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="metric-card">
            <div className="skeleton-bar"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="health-container">
        <div className="health-banner error">
          <div className="status-icon error-icon">
            <span>⚠️</span>
          </div>
          <div className="status-content">
            <h3 className="status-title">System Offline</h3>
            <p className="status-message">{error}</p>
          </div>
          <div className="status-actions">
            <button className="btn btn-secondary" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
        
        <div className="health-metrics error-state">
          <div className="metric-card">
            <div className="metric-icon">📊</div>
            <div className="metric-content">
              <div className="metric-value">--</div>
              <div className="metric-label">Response Time</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🔄</div>
            <div className="metric-content">
              <div className="metric-value">--</div>
              <div className="metric-label">Requests/min</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⚡</div>
            <div className="metric-content">
              <div className="metric-value">--</div>
              <div className="metric-label">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="health-container">
      <div className="health-banner healthy">
        <div className="status-icon healthy-icon">
          <span>✨</span>
        </div>
        <div className="status-content">
          <h3 className="status-title">All Systems Operational</h3>
          <p className="status-message">{data.status} • Everything looks amazing! 🎉</p>
        </div>
        <div className="status-badge">
          <span className="uptime-badge">99.9% Uptime</span>
        </div>
      </div>
      
      <div className="health-metrics">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-value" data-value="45">45ms</div>
            <div className="metric-label">Avg Response</div>
            <div className="metric-trend positive">↗ +12%</div>
          </div>
          <div className="metric-sparkline">
            <div className="sparkline-bar" style={{height: '60%'}}></div>
            <div className="sparkline-bar" style={{height: '75%'}}></div>
            <div className="sparkline-bar" style={{height: '45%'}}></div>
            <div className="sparkline-bar" style={{height: '85%'}}></div>
            <div className="sparkline-bar" style={{height: '65%'}}></div>
            <div className="sparkline-bar" style={{height: '90%'}}></div>
            <div className="sparkline-bar" style={{height: '70%'}}></div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">🔄</div>
          <div className="metric-content">
            <div className="metric-value" data-value="1247">1.2k</div>
            <div className="metric-label">Requests/min</div>
            <div className="metric-trend positive">↗ +8%</div>
          </div>
          <div className="metric-sparkline">
            <div className="sparkline-bar" style={{height: '70%'}}></div>
            <div className="sparkline-bar" style={{height: '55%'}}></div>
            <div className="sparkline-bar" style={{height: '80%'}}></div>
            <div className="sparkline-bar" style={{height: '75%'}}></div>
            <div className="sparkline-bar" style={{height: '95%'}}></div>
            <div className="sparkline-bar" style={{height: '85%'}}></div>
            <div className="sparkline-bar" style={{height: '90%'}}></div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <div className="metric-value" data-value="72">72h</div>
            <div className="metric-label">Uptime</div>
            <div className="metric-trend stable">→ Stable</div>
          </div>
          <div className="metric-sparkline">
            <div className="sparkline-bar" style={{height: '100%'}}></div>
            <div className="sparkline-bar" style={{height: '100%'}}></div>
            <div className="sparkline-bar" style={{height: '100%'}}></div>
            <div className="sparkline-bar" style={{height: '100%'}}></div>
            <div className="sparkline-bar" style={{height: '100%'}}></div>
            <div className="sparkline-bar" style={{height: '100%'}}></div>
            <div className="sparkline-bar" style={{height: '100%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthCheck;
