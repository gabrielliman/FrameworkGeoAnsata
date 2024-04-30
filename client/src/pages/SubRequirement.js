import React,{useEffect, useState}  from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'

function SubRequirement() {
    let{ subrequirement_id } = useParams()

    const [subrequirementObject, setSubRequirementObject] = useState({});
    const [listOfReferenceQuestion, setListOfReferenceQuestion] = useState([]);



    useEffect(() => {
      axios.get(`http://localhost:3001/subrequirements/byId/${subrequirement_id}`,{ withCredentials: true }).then((response) => {
          setSubRequirementObject(response.data)
      });

      //com isso eu tenho as perguntas mas o texto esta na tabela reference question
      axios.get(`http://localhost:3001/questions/${subrequirement_id}`,{ withCredentials: true }).then((response) => {axios.post("http://localhost:3001/referencequestions/byIds", response.data).then((response) => {
        setListOfReferenceQuestion(response.data);
      });

    })


  }, [subrequirement_id]);

    
  return (
  <div>
    <div className="solo_SubRequirement">
      <div className="subrequirement_title">{subrequirementObject.Title}</div>
      <div className="subrequirement_body">{subrequirementObject.OriginalText}</div>
    </div>
    <div>
        {listOfReferenceQuestion.map((value, key) => {
            return (
                <div className="Question" key={value.ID}>
                    <div className="Question_body">{value.Text}</div>
                </div>
            );
        })}
    </div>
  </div>
)
}

export default SubRequirement;
