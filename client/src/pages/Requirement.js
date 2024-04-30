import React,{useEffect, useState}  from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

function Requirement() {
    let{ requirement_id } = useParams()
    let navigate=useNavigate()

    const [requirementObject, setRequirementObject] = useState({});
    
    const [listOfSubRequirement, setListOfSubRequirement] = useState([]);


    useEffect(() => {
      axios.get(`http://localhost:3001/requirements/byId/${requirement_id}`,{ withCredentials: true }).then((response) => {
          setRequirementObject(response.data)
      });

      axios.get(`http://localhost:3001/subrequirements/${requirement_id}`,{ withCredentials: true }).then((response) => {
        setListOfSubRequirement(response.data)
      });


  }, [requirement_id]);

    
  return (
  <div>
    <div className="solo_Requirement">
      <div className="requirement_title">{requirementObject.Title}</div>
      <div className="requirement_body">{requirementObject.OriginalText}</div>
    </div>
    <div>
        {listOfSubRequirement.map((value, key) => {
            return (
                <div className="SubRequirement" key={value.ID} onClick={()=>{navigate(`/subrequirement/${value.ID}`)}}>
                    <div className="SubRequirement_title">{value.Title}</div>
                    <div className="SubRequirement_body">{value.OriginalQuestion}</div>
                </div>
            );
        })}
    </div>
  </div>
)
}

export default Requirement;
