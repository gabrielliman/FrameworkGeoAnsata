import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Section() {
  let { section_id } = useParams();
  let navigate = useNavigate();

  const [sectionObject, setSectionObject] = useState({});
  const [listOfSubSection, setListOfSubSection] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/sections/byId/${section_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setSectionObject(response.data);
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
      .get(`http://localhost:3001/subsections/${section_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setListOfSubSection(response.data);
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
  }, [section_id]);

  const handleReturn = () => {
    navigate("/framework/" + sectionObject["FrameworkID"]);
  };

  return (
    <div>
      <div className="solo_Section">
        <div className="section_title">{sectionObject.Title}</div>
        <div className="section_body">{sectionObject.Description}</div>
      </div>
      <div>
        {listOfSubSection.map((value, key) => {
          return (
            <div
              className="SubSection"
              key={value.ID}
              onClick={() => {
                navigate(`/subsection/${value.ID}`);
              }}
            >
              <div className="SubSection_title">{value.Title}</div>
              <div className="SubSection_body">{value.Description}</div>
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

export default Section;
