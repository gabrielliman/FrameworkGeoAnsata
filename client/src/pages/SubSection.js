import React,{useEffect, useState}  from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

function SubSection() {
    let{ subsection_id } = useParams()
    let navigate=useNavigate()

    const [subsectionObject, setSubSectionObject] = useState({});
    const [listOfRequirement, setListOfRequirement] = useState([]);


    useEffect(() => {
      axios.get(`http://localhost:3001/subsections/byId/${subsection_id}`,{ withCredentials: true }).then((response) => {
          setSubSectionObject(response.data)
      });

      axios.get(`http://localhost:3001/requirements/${subsection_id}`,{ withCredentials: true }).then((response) => {
        setListOfRequirement(response.data)
      });


  }, [subsection_id]);

    
  return (
  <div>
    <div className="solo_SubSection">
      <div className="subsection_title">{subsectionObject.Title}</div>
      <div className="subsection_body">{subsectionObject.Description}</div>
    </div>
    <div>
        {listOfRequirement.map((value, key) => {
            return (
                <div className="Requirement" key={value.ID} onClick={()=>{navigate(`/requirement/${value.ID}`)}}>
                    <div className="Requirement_title">{value.Title}</div>
                    <div className="Requirement_body">{value.OriginalText}</div>
                </div>
            );
        })}
    </div>
  </div>
)
}

export default SubSection;
