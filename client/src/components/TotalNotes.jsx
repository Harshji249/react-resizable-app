import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
const TotalNotes = () => {
    const baseURL = 'https://react-resizable-app.onrender.com/api/note/getnote'
    const [allNotes, setAllNotes] = useState ([])
    const fetchMyNotes = async () => {
        try {
            const response = await axios.get(baseURL);
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMyNotes();
                setAllNotes(data.note)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
    
        fetchData();
    },[allNotes]);
  return (
    <div style={{display:'flex'}}>
       <h1>
         Total No of Times Add is called : 
        </h1>
      <h1> {allNotes.length}</h1>
    </div>
  )
}

export default TotalNotes
