import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
export const Update = ({ emp, setEmpData }) => {
  const [show, setShow] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleClose = () => {
    setShow(false);
    setImage(null);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleShow = () => {
    setName(emp.name);
    setEmail(emp.email);
    setPhone(emp.phone);
    setDepartment(emp.department);
    setSalary(emp.salary);
    setPreview(emp.url || null);
    setShow(true);
  };
  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("department", department);
    formData.append("salary", salary);

    if (image) {
      formData.append("file", image);
    }
    const res = await fetch(`${API_URL}/v1/update-emp/${emp._id}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      setEmpData((prev) => ({
        ...prev,
        emps: prev.emps.map((item) =>
          item._id === emp._id ? data.updatedEmp : item,
        ),
      }));

      toast.success(data.message);
      handleClose();
    } else {
      toast.warning(data.message);
    }
  }

  return (
    <>
      <Button onClick={handleShow}>Update</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className="mb-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label>Phone</label>
              <input
                type="number"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* DEPARTMENT */}
            <div className="mb-2">
              <label>Department</label>
              <input
                type="text"
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>

            {/* SALARY */}
            <div className="mb-2">
              <label>Salary</label>
              <input
                type="number"
                className="form-control"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <div className="text-center mb-3">
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <Button type="submit" variant="primary" className={`w-100`}>
              Save Employee
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
