import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {

    const [listOfFrameworks, setListOfFrameworks] = useState([]);
    const [listOfInstances, setListOfInstances] = useState([]);
/*     const [selectedFrameworkId, setSelectedFrameworkId] = useState(); // Track the selected framework ID
 */    
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
    }, [navigate]);

    const handleClickFramework = (frameworkId) => {
        axios.get(`http://localhost:3001/instance/${frameworkId}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setListOfInstances(response.data);
            })
            .catch((error) => {
                console.log(frameworkId)
                console.error("Error fetching instances:", error);
            });
    };
    return (
        <div>
            {listOfFrameworks.map((value, key) => {
                return (
                    <div className="Framework" key={value.ID} onClick={() => handleClickFramework(value.ID)}>
                        <div className="title">{value.Title}</div>
                        <div className="body">{value.Description}</div>
                        <div className="footer">{value.createdAt}</div>
                        {listOfInstances.length > 0 && (
                        <div>
                            {listOfInstances.map((instance) => 
                                // Check if the instance's frameworkId matches the selected frameworkId
                                (instance.FrameworkID === value.ID && (
                                    <div key={instance.ID} className="instanceContainer">
                                        <div className= "instanceTitle">{instance.Title}</div>
                                        <div className= "instanceDescription">Descrição: {instance.Description}</div>
                                    <div className= "instanceClass">Classe: {instance.Class}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    </div>
                );
            })}

        </div>
    );
}

export default Home
