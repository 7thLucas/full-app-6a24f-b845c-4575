import { useConfigurables } from "~/modules/configurables";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function IndexPage() {
  const { config, loading } = useConfigurables();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      navigate("/admin/dashboard");
    }
  }, [loading, navigate]);

  if (loading) {
    return (
      <div style={{ fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
        <h1>Loading {config.appName || "Music School Manager"}...</h1>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>{config.appName || "Music School Manager"}</h1>
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
