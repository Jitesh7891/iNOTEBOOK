import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updatenote } = props;
  return (
    <div className="col-md-4" >
      <div className="card my-2" style={{border:'1px solid black'}}>
                    <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0',
                        height:'1.7rem',
                        margin:'4px'
                    }}
                    > 
                        <span className="badge mx-1   " style={{fontWeight:'300',color:'blue',backgroundColor:'yellow',border:"1px solid black"}}> {note.tag?note.tag:'No Tag'} </span>
                    </div>
        <div className="card-body my-2">


          <div className="d-flex align-items-center">
            <h4 className="card-title"><u>{note.title}</u></h4>
            <i className="fa-regular fa-pen-to-square mx-1" style={{ color: "#b732dc", }}
              onClick={() => { updatenote(note) }} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-dismiss="#exampleModal" ></i>
              
            <i className="fa-solid fa-trash mx-1" onClick={() => {
              deleteNote(note._id);
              props.showAlert('Deleted Note', 'danger')
            }} style={{ color: "red", }}></i>
          </div>
          <p style={{fontSize:'1.2rem'}}className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
