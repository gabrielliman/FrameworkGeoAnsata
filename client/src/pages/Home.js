import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {

    const [listOfFrameworks, setListOfFrameworks] = useState([]);
    let navigate=useNavigate()


    useEffect(() => {
        axios.get("http://localhost:3001/frameworks",{ withCredentials: true }).then((response) => {
            setListOfFrameworks(response.data)
        })
        .catch(error =>{
            if (error.response && error.response.status === 401) {
              console.log("got here")
              // Token validation error, redirect to another page
              navigate('/login'); // Redirect to login page or any other page
          } else {
              // Other errors, handle as needed
              console.error(error);
          }
          });
    }, []);

    return (
        <div>
            {listOfFrameworks.map((value, key) => {
                return (
                    <div className="Framework" key={value.ID} onClick={()=>{navigate(`/framework/${value.ID}`)}}>
                        <div className="title">{value.Title}</div>
                        <div className="body">{value.Description}</div>
                        <div className="footer">{value.createdAt}</div>
                    </div>
                );
            })}
        </div>
    )
}

export default Home
