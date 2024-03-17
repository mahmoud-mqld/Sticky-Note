import React, { useState } from "react";
import "./Note.scss";
import axios from "axios";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Roll } from "react-awesome-reveal";


export default function Note({note,  getUserNote}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  let noteForm = useFormik({
    initialValues: {
      title: `${note.title}`,
      content: `${note.content}`,
    },
    onSubmit: updateNote,
  });

  function updateNote(val) {

    console.log(`3b8ny__${localStorage.getItem("token")}`);
    axios
      .put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, val, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        getUserNote()

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  }

  function removeNote() {

    console.log(`3b8ny__${localStorage.getItem("token")}`);
    axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        getUserNote()

      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>getUserNote())
    
  }

  return (
    <>
    <Roll>   <li>
      <div className="  col-md-6 p-3">
       
    <div className=" position-relative" >
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  <div className="icons position-absolute bottom-0">
            <i
            onClick={handleShow}
              className="fa-solid fa-pen-to-square me-3 py-2 fs-4 "
              variant="primary"
            ></i>
            <i   onClick={removeNote} className="fa-solid fa-trash py-2 fs-4"></i>
          </div> 
    
{/* 
        <div className="book position-relative">
          <p className="p-3">Note Content</p>
         
          <div className="cover">
            <p>NoteTitle</p>
          </div>
        </div> */}
      </div>
</li></Roll>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="submit" onSubmit={noteForm.handleSubmit}>
            <input
              onChange={noteForm.handleChange}
              value={noteForm.values.title}
              className="form-control"
              name="title"
              id="title"
              type="text"
              placeholder="Note Title"
            />
            <textarea
              onChange={noteForm.handleChange}
              value={noteForm.values.content}
              className="form-control"
              name="content"
              id="content"
              cols="30"
              rows="5"
              placeholder="Enter Note Content"></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={noteForm.submitForm}>
            update Note
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
