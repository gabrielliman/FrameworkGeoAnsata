import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfFrameworks, setListOfFrameworks] = useState([]);
  const [listOfInstances, setListOfInstances] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/frameworks", { withCredentials: true })
      .then((response) => {
        setListOfFrameworks(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Token validation error, redirect to another page
          navigate("/login"); // Redirect to login page or any other page
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

  }, [navigate]);

  const handleClickFramework = (frameworkId) => {
    setSelectedFramework(frameworkId);

    axios
      .get(`http://localhost:3001/instance/${frameworkId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setListOfInstances(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instances:", error);
      });
  };

  const handleClickInstance = (frameworkId, instanceID) => {
    sessionStorage.setItem("selectedInstanceID", instanceID);
    navigate(`/framework/${frameworkId}`);
  };

  const handleClickCreate = (frameworkId) => {
    navigate(`/createinstance/${frameworkId}`);
  };

  return (
    <div>
      <div className="home_page">Página Inicial</div>
      <div className="sub_type">Frameworks:</div>
      {listOfFrameworks.map((value, key) => {
        return (
          <div
            className="Framework"
            key={value.ID}
            onClick={() => handleClickFramework(value.ID)}
          >
            <div className="framework_title">{value.Title}</div>
            <div className="framework_body">{value.Description}</div>
            <div className="framework_footer">{value.createdAt}</div>
            {selectedFramework === value.ID && (
              <div>
                {listOfInstances.map(
                  (instance) =>
                    // Check if the instance's frameworkId matches the selected frameworkId
                    instance.FrameworkID === value.ID && (
                      <div
                        key={instance.ID}
                        className="instanceContainer"
                        onClick={() =>
                          handleClickInstance(value.ID, instance.ID)
                        }
                      >
                        <div className="instanceTitle">{instance.Title}</div>
                        <div className="instanceDescription">
                          Descrição: {instance.Description}
                        </div>
                        <div className="instanceClass">
                          Classe: {instance.Class}
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
            {selectedFramework === value.ID && (
              <div
                className="createContainer"
                onClick={() => handleClickCreate(value.ID)}
              >
                <div className="createInstance">+ Criar nova instância</div>
              </div>
            )}
          </div>
        );
      })}
        {isAdmin && (
        <div>
          <div
            className="createContainer"
            onClick={() => navigate(`/createframework`)}
          >
            + Framework
          </div>
        </div>)}
    </div>
  );
}

export default Home;
