import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const AddNote = () => {
    const baseURL = 'https://react-resizable-app.onrender.com/api/note/addnote'
    const [formData, setFormData] = useState({
        title: '',
desc: '',
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        addData(formData)
        setFormData({
            title: '',
            desc: '',
        });
    }
    const addData = async (data)=>{
        try {
            const response = await axios.post(baseURL,data);
            return response?.data;
        }
        catch (error) {
            console.log(error);
return error;
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Todo List</h1>
            <div>
            <h3>Title</h3>
            <input style={{marginBottom:10, width:200, height:30, fontSize:'22px'}} type="text" name="title" value={formData.title} onChange={(e)=>handleChange(e)}/>
            </div>

            <div>
                <h3>Description</h3>
                <input style={{marginBottom:10, width:200, height:30, fontSize:'22px'}} type="text" name="desc" value={formData.desc} onChange={(e)=>handleChange(e)}/>
            </div>

            <div style={{marginTop:'20px'}}>
                <button style={{fontSize:'18px',backgroundColor:'white', width:'100px', height:'40px', borderRadius: '10px'}} type='submit'>Add item</button>
            </div>
            </form>
            </div>
      
  )
}

export default AddNote
