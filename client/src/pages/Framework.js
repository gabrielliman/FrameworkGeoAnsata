import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Framework() {
  let { framework_id } = useParams();
  let navigate = useNavigate();
  const [frameworkObject, setFrameworkObject] = useState({});
  const [listOfSections, setListOfSections] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/frameworks/byId/${framework_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setFrameworkObject(response.data);
      });

    axios
      .get(`http://localhost:3001/sections/${framework_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setListOfSections(response.data);
      });

  }, [framework_id]);

  return (
    <div>
      <div className="solo_Framework">
        <div className="framework_title">{frameworkObject.Title}</div>
        <div className="framework_body">{frameworkObject.Description}</div>
      </div>
      <div>
        {listOfSections.map((value, key) => {
          return (
            <div
              className="Section"
              key={value.ID}
              onClick={() => {
                navigate(`/section/${value.ID}`);
              }}
            >
              <div className="section_title">{value.Title}</div>
              <div className="section_body">{value.Description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Framework;
