import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmpDetails.css";

export const EmpDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH EMP =================
  useEffect(() => {
    async function fetchEmp() {
      try {  
        const res = await fetch(`${API_URL}/v1/get-empId/${id}`);
        const data = await res.json();

        if (data.success) {
          setEmp(data.emp);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    }

    fetchEmp();
  }, [id]);

  // ================= UI STATES =================
  if (loading) {
    return <div className="center">Loading employee...</div>;
  }

  if (error) {
    return <div className="center error">{error}</div>;
  }

  return (
    <div className="details-container">
      <div className="card">
        <img
          src={emp.url}
          alt="employee"
          className="avatar"
        />

        <h2>{emp.name}</h2>
        <p className="email">{emp.email}</p>

        <div className="info">
          <div>
            <span>📞 Phone</span>
            <p>{emp.phone}</p>
          </div>

          <div>
            <span>🏢 Department</span>
            <p>{emp.department}</p>
          </div>

          <div>
            <span>💰 Salary</span>
            <p>₹ {emp.salary}</p>
          </div>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};
