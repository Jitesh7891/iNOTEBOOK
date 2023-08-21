import React,{ useContext } from 'react'
import noteContext from "../context/notes/NoteContext"
import { useState } from 'react';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const[note,setNote]=useState({title:"",description:"",tag:""})

    const onChange=(event)=>{
        setNote({...note,[event.target.name]:event.target.value})
    }
    const handleClick=(event)=>{
        event.preventDefault();
        addNote(note.title,note.description,note.tag)
        props.showAlert('Added note successfully!','success')
        setNote({title:"",description:"",tag:""})
    }

  return (
    <div className="container my-5">
    <h1 style={{color:'purple'}}>Add a Note</h1>
    <form className="my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label" >Tite</label>
        <input value={note.title}  placeholder="Enter minimum 3 characters" type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp" minLength={3} isrequired />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input value={note.description} placeholder="Enter minimum 5 characters"  type="text" className="form-control" id="description" onChange={onChange} name="description" minLength={5} isrequired />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input value={note.tag} type="text" className="form-control" id="tag" onChange={onChange} name="tag" />
      </div>

      <button style={{background: 'linear-gradient(to right, #30CFD0 0%, blue 100%'}}disabled={note.title.length<3||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
  </div>
  )
}

export default AddNote
