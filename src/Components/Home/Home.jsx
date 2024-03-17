import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Sidebar from "../Sidebar/Sidebar";
import { useFormik } from "formik";
import axios from "axios";
import { useRecoilState } from "recoil";
import { NoteState } from "../context/NoteAtom";
import Note from './../Note/Note';
import { Helmet } from "react-helmet";

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Notes, setNotes] = useState([]);

  let [noteCounter,setNoteCounter]=useRecoilState(NoteState)

useEffect(()=>{
  getUserNote()
},[])



  let noteForm = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNote,

  });

  function addNote(val) {


    console.log(`3b8ny__${localStorage.getItem("token")}`);
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", val, {
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
  function getUserNote() {
    console.log();

    console.log(`3b8ny__${localStorage.getItem("token")}`);
    axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNotes(res.data.notes)
        setNoteCounter(res.data.notes.length)

      })
      .catch((err) => {
        console.log(err);
      })
      
  }
  

  return (
    <>
    <Helmet>
    <title>Sticky Note</title>
    <link rel="icon" href="../../images/—Pngtree—to do list icon cartoon_5080528.png" />
    </Helmet>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-md-2">
            <div className=" my-3">
              <Sidebar />
            </div>
          </div>

          <div className="col-10  px-2">
            <div className="text-end me-2">
              <button
                className="btn fs-2 "
                variant="primary"
                onClick={handleShow}>
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            <div className="row noteCard ">
              <ul> {Notes?.map((note)=><Note key={note._id} note={note}   getUserNote={getUserNote} />)}</ul>
             
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className=" bg-primary px-2">New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onReset={noteForm.handleReset}  onSubmit={noteForm.handleSubmit}>
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
          <Button type='reset' variant="primary" onClick={noteForm.submitForm}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
