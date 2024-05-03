import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Requirement() {
  let { requirement_id } = useParams();
  let navigate = useNavigate();

  const enumValues = {
    Exploration: 1,
    Resource: 2,
    Reserve: 3,
  };

  const [requirementObject, setRequirementObject] = useState({});
  const [listOfSubRequirement, setListOfSubRequirement] = useState([]);

  useEffect(() => {
    const storedInstanceId = sessionStorage.getItem("selectedInstanceID");
    if (storedInstanceId) {
      axios
        .get(`http://localhost:3001/instance/byId/${storedInstanceId}`, {
          withCredentials: true,
        })
        .then((res) => {
          axios
            .get(`http://localhost:3001/subrequirements/${requirement_id}`, {
              withCredentials: true,
            })
            .then((response) => {
              const filteredSubRequirements = response.data.filter(
                (subRequirement) =>
                  enumValues[subRequirement.Class] <=
                  enumValues[res.data["Class"]]
              );
              setListOfSubRequirement(filteredSubRequirements);
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                navigate("/login");
              } else {
                console.error(error);
              }
            });
        })
        .catch((error) => {
          console.error("Error fetching instance:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }

    axios
      .get(`http://localhost:3001/requirements/byId/${requirement_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setRequirementObject(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error(error);
        }
      });
  }, [requirement_id]);

  const handleReturn = () => {
    navigate("/subsection/"+requirementObject["SubSectionID"])
  };

  return (
    <div>
      <div className="solo_Requirement">
        <div className="requirement_title">{requirementObject.Title}</div>
        <div className="requirement_body">{requirementObject.OriginalText}</div>
      </div>
      <div>
        {listOfSubRequirement.map((value, key) => {
          return (
            <div
              className="SubRequirement"
              key={value.ID}
              onClick={() => {
                navigate(`/subrequirement/${value.ID}`);
              }}
            >
              <div className="SubRequirement_title">{value.Title}</div>
              <div className="SubRequirement_body">
                {value.OriginalQuestion}
              </div>
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

export default Requirement;
