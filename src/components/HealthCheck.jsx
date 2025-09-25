import { getHealth } from "../services/api";
import { useFetch } from "../hooks/useFetch";

function HealthCheck() {
  const { data, loading, error } = useFetch(getHealth);

  if (loading) return <p>⏳ Checking health...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return <p>✅ {data.status}</p>;
}

export default HealthCheck;
