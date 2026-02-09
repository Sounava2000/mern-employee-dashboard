import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
export const Add = ({}) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
const [loader,setLoader] =useState(false)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
setLoader(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("department", department);
    formData.append("salary", salary);
    formData.append("file", image);
for (let [key, value] of formData.entries()) {
  console.log([key, value]);
}
   console.log(formData.entries())
    try {
    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      body: formData,
      
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
       setLoader(false)
       toast.success(data.message)
    }
    else {
       toast.error(data.message)

    }
   
   
  } catch (error) {
    console.error(error);
    toast.error(error.message)

  } 
  finally {
    setLoader(false); 
  }
  };

  return (
    <>
      <Button onClick={handleShow}>ADD</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-2">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="mb-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PHONE */}
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

            {/* IMAGE PREVIEW */}
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

            <Button type="submit" variant="primary" className={`w-100   }`}>
              {loader ? "Saving..." : "Save Employee"}
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
