import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext"
import NoteItem from "./NoteItem"
import AddNote from './AddNote';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Notes(props) {
  let navigate = useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  //to serve notes in reverse order , in this way notes added recently are shown first
  let reversenotes = [...notes].reverse();


  const [note, setNote] = useState({ id: "", edittitle: "", editdescription: "", edittag: "" })


  useEffect(() => {

    if (localStorage.getItem('token')) {

      getNotes()
    }
    else {
      navigate("/login")
    }
    // eslint-disable-next-line 
  }, [])

  const updatenote = (currentnote) => {
    // ref.current.click();
    setNote({
      id: currentnote._id,
      edittitle: currentnote.title,
      editdescription: currentnote.description,
      edittag: currentnote.tag
    });

  }


  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
  }

  const handleClick = (event) => {
    event.preventDefault();
    editNote(note.id, note.edittitle, note.editdescription, note.edittag);
    props.showAlert('Updated note successfully!', 'primary')
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* <button ref={ref}  type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" >
        Launch demo modal
      </button> */}

{/* Modal to edit note opens when we click on edit icon */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>

            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3" >
                  <label htmlFor="title" className="form-label">Tite</label>
                  <input style={{ backgroundColor: "#dfebf3" }} type="text" value={note.edittitle} className="form-control" id="edittitle" name="edittitle" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3" >
                  <label htmlFor="description" className="form-label">Description</label>
                  <input style={{ backgroundColor: "#dfebf3" }} value={note.editdescription} type="text" className="form-control" id="editdescription" onChange={onChange} name="editdescription" />
                </div>
                <div className="mb-3" >
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input style={{ backgroundColor: "#dfebf3" }} value={note.edittag} type="text" className="form-control" id="edittag" onChange={onChange} name="edittag" />
                  <div className='mx-3 my-3'>Enter minimum 3 characters in title and 5 characters description</div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss='modal' >Close</button>
              <button disabled={note.edittitle.length < 3 || note.editdescription.length < 5} type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">

        <h1 style={{color:"green"}}>Your Notes</h1>
        {notes.length === 0 && <div className='container mx-1'>No Notes to Display</div>}

        {reversenotes.map((note) => {
          return <NoteItem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert} />;
        })}
      </div>
    </>
  )
}
