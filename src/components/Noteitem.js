import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote}=context;
    const { note,updateNote} = props;
    return (
        <div className="col-md-3">
            <div className="card my-3 shadow p-3 mb-5 rounded" style={{backgroundColor:"#8dbcd3"}}>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <h6 className="card-text">{note.tag}</h6>
                        <p className="card-text">{note.description}</p>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
