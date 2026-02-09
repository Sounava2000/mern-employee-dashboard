import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
export const Delete = ({ emp, setEmpData }) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  function handelClick() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${API_URL}/del-emp/${emp._id}`, {
          method: "POST",
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setEmpData(prev => ({
    ...prev,
    emps: prev.emps.filter(item => item._id !== emp._id)
  }));

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire("Error!", data.message, "error");
        }
      }
    });
  }
  return (
    <div>
      <Button variant="danger" onClick={() => handelClick()}>
        Delete
      </Button>
    </div>
  );
};
