import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [username, setUsername] = useState("");

  //getAllNotes
  const getNotes = async () => {
    //API calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }
  //Add a Note
  const addNote = async (title, description, tag) => {

    //API calls
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json)
    let newnote = json
    setNotes(notes.concat(newnote))

  }

  //Delete a Note
  const deleteNote = async (id) => {
    //API calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
    console.log(response.json)

  }


  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const json = response.json();
    console.log(json)

    //creating copy of notes to edit them as we cant directly change notes in React
    let newNotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit in client 

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes)

  }

  const getusername = async () => {
    //API calls
    if (localStorage.getItem('token')) {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      let res = await response.json();
      setUsername(res.name)
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, username, getusername }} >
      {/* <NoteContext.Provider value={{state,update}} > */}
      {/* above lines means below lines in modern JS syntax  */}
      {/* <NoteContext.Provider value={{state:state,update:update}} > */}
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;
