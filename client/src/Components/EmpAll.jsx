import React, { useEffect, useState } from "react";
import "./Emp.css";
import { toast } from "react-toastify";
import { Add } from "./Add.jsx";
import { Update } from "./Update.jsx";
import { Delete } from "./Delete.jsx";
import { useNavigate } from "react-router-dom";

export const EmpAll = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  let navigate = useNavigate();
  const [empData, setEmpData] = useState({
    emps: [],
    pagination: {
      totalEmployees: 0,
      currentPage: 1,
      totalPages: 1,
      pageSize: 5,
    },
  });

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH EMPLOYEES =================
  const fetchEmp = async (searchText = "", pageNo = 1, limit = 5) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/get-emp?limit=${limit}&page=${pageNo}&search=${searchText}`,
      );

      const data = await res.json();

      if (data.success) {
        setEmpData({
          emps: data.emps,
          pagination: data.pagination,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server error");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    fetchEmp(search, page);
  }, [search, page]);

  // ================= UI =================
  return (
    <div className="container">
      <h2>Employee Management App</h2>

      <div className="top-bar">
        <Add></Add>

        <input
          type="text"
          placeholder="Search Employees..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : empData.emps.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          ) : (
            empData.emps.map((emp) => (
              <tr key={emp._id}>
                <td
                  className="emp-name"
                  onClick={() => navigate(`/employee/${emp._id}`)}
                >
                  {emp.name}
                </td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td className="actions">
                  <Update emp={emp} setEmpData={setEmpData}></Update>{" "}
                </td>
                <td className="actions">
                  {" "}
                  <Delete emp={emp} setEmpData={setEmpData}></Delete>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="footer">
        <span className="page-info">
          Page {empData.pagination.currentPage} of{" "}
          {empData.pagination.totalPages}
        </span>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>

          <button className="active">{page}</button>

          <button
            disabled={page === empData.pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
