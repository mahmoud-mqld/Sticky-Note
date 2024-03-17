import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { NoteState } from "../context/NoteAtom";


export default function Sidebar() {
    let [noteCounter,setNoteCounter]=useRecoilState(NoteState)


  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    navigate("login");
  }

  return (
    <>
      <div>
        <div className="p-0 ">
          <ul>
            <li className=" pe-lg-2 d-flex my-3 ">
              <i className="fa-regular fa-note-sticky text-info fs-2"></i>
              <p className="p2 position-relative fs-4">Notes</p><span className=" top-0 start-100 badge bg-primary  position-absolute fs-3 p-1"> {noteCounter}</span>
            </li>

            <li className=" pe-lg-5 ">
              <Link
                to={"/login"}
                onClick={logOut}
                className="nav-link px-0 px-lg-2">
              
                {/* <i className="bi bi-box-arrow-left"></i> */}
                <span className=" ms-1d-lg-inline d-flex">
                  Logout  <i class="fa-solid fa-right-from-bracket px-2"></i>  
                </span>
                          </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
