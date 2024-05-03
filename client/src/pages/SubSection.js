import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SubSection() {
  let { subsection_id } = useParams();
  let navigate = useNavigate();

  const [subsectionObject, setSubSectionObject] = useState({});
  const [listOfRequirement, setListOfRequirement] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/subsections/byId/${subsection_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setSubSectionObject(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Token validation error, redirect to login page
          navigate("/login");
        } else {
          // Other errors, handle as needed
          console.error(error);
        }
      });

    axios
      .get(`http://localhost:3001/requirements/${subsection_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setListOfRequirement(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Token validation error, redirect to login page
          navigate("/login");
        } else {
          // Other errors, handle as needed
          console.error(error);
        }
      });
  }, [subsection_id]);

  const handleReturn = () => {
    navigate("/section/" + subsectionObject["SectionID"]);
  };

  return (
    <div>
      <div className="solo_SubSection">
        <div className="subsection_title">{subsectionObject.Title}</div>
        <div className="subsection_body">{subsectionObject.Description}</div>
      </div>
      <div>
        {listOfRequirement.map((value, key) => {
          return (
            <div
              className="Requirement"
              key={value.ID}
              onClick={() => {
                navigate(`/requirement/${value.ID}`);
              }}
            >
              <div className="Requirement_title">{value.Title}</div>
              <div className="Requirement_body">{value.OriginalText}</div>
            </div>
          );
        })}
      </div>
      <div>
        <button className="return-button" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
}

export default SubSection;
