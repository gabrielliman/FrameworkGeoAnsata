import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Framework() {
  let { framework_id } = useParams();
  let navigate = useNavigate();
  const [frameworkObject, setFrameworkObject] = useState({});
  const [listOfSection, setlistOfSection] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/frameworks/byId/${framework_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setFrameworkObject(response.data);
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
      .get(`http://localhost:3001/sections/${framework_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setlistOfSection(response.data);
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
      .get(`http://localhost:3001/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsAdmin(response.data.IsAdministrator); // Assuming the response includes the admin status
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

  }, [framework_id, navigate]);

/*   const handleReturn = () => {
    navigate("/");
  }; */

  return (
    <div>
      <div className="solo_Framework">
        <div className="framework_page_title">Framework: {frameworkObject.Title}</div>
        <div className="framework_page_body">{frameworkObject.Description}</div>
      </div>
      <div>
        <div className="sub_type">Seções:</div>
        {listOfSection.map((value, key) => {
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
      <div>{isAdmin}</div> 
      {isAdmin && (
        <div>
          <div
            className="createContainer"
            onClick={() => navigate(`/createsection/${framework_id}`)}
          >
            + Section
          </div>
        </div>
      )}
      </div>
      <div>
{/*         <button className="return-button" onClick={handleReturn}>
          Return
        </button> */}
      </div>
    </div>
  );
}

export default Framework;
