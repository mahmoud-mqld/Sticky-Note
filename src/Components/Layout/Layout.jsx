import React from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { NoteState } from '../context/NoteAtom'


export default function Layout() {
  let [noteCounter,setNoteCounter]=useRecoilState(NoteState)
  return (
    <>
   <Outlet/>
    </>
  )
}
