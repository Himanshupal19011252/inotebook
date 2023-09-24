import React, { useState,useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote } = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2><br /><br />
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label><br />
                    <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange} aria-describedby="emailHelp" placeholder="title must be atleast 5 characters" minLength={5} required />
                </div><br />
                <div className="form-group">
                    <label htmlFor="description">Description</label><br />
                    <input type="text" className="form-control" id="description" value={note.description}  name="description" onChange={onChange}  placeholder="description must be atleast 5 characters" minLength={5} required />
                </div><br />
                <div className="form-group">
                    <label htmlFor="tag">Tag</label><br />
                    <input type="text" className="form-control" id="tag"value={note.tag} name="tag" onChange={onChange}/>
                </div><br />
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form><br />
        </div>
    )
}

export default AddNote
