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
      .then(async (response) => {
        if (!response.data) {
          console.error("No data in response from instance API");
          return;
        }

        const instancesWithStatsPromises = response.data.map(
          async (instance) => {
            try {
              const statsResponse = await axios.get(
                `http://localhost:3001/results/instances/${instance.ID}/questions-answers`,
                { withCredentials: true }
              );
              if (!statsResponse.data) {
                console.error(
                  `No data in stats response for instance ID ${instance.ID}`
                );
                instance.stats = { error: true };
              } else {
                instance.stats = statsResponse.data;
              }
            } catch (error) {
              console.error(
                `Error fetching question and answer statistics for instance ID ${instance.ID}:`,
                error
              );
              instance.stats = { error: true };
            }
            return instance;
          }
        );

        try {
          const instanceWithStats = await Promise.all(
            instancesWithStatsPromises
          );
          setListOfInstances(instanceWithStats);
        } catch (error) {
          console.error(
            "Error resolving instances with stats promises:",
            error
          );
        }
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

                        {instance.stats ? (
                          <div>
                            <div className="requirement_stats">
                              Número de Perguntas:{" "}
                              {instance.stats.totalQuestions}
                              <br />
                              Respondidas: {instance.stats.totalAnswered}
                              <br />
                              Não Respondidas: {instance.stats.totalUnanswered}
                            </div>

                            {instance.stats.totalQuestions > 0 && (
                              <div className="bar-container">
                                <div
                                  className="bar yes"
                                  style={{
                                    width: `${
                                      (instance.stats.answerCounts.Yes /
                                        instance.stats.totalQuestions) *
                                      100
                                    }%`,
                                  }}
                                >
                                  {instance.stats.answerCounts.Yes > 0 &&
                                    `Sim: ${instance.stats.answerCounts.Yes}`}
                                </div>
                                <div
                                  className="bar no"
                                  style={{
                                    width: `${
                                      (instance.stats.answerCounts.No /
                                        instance.stats.totalQuestions) *
                                      100
                                    }%`,
                                  }}
                                >
                                  {instance.stats.answerCounts.No > 0 &&
                                    `Não: ${instance.stats.answerCounts.No}`}
                                </div>
                                <div
                                  className="bar dont-apply"
                                  style={{
                                    width: `${
                                      (instance.stats.answerCounts[
                                        "Don't Apply"
                                      ] /
                                        instance.stats.totalQuestions) *
                                      100
                                    }%`,
                                  }}
                                >
                                  {instance.stats.answerCounts["Don't Apply"] >
                                    0 &&
                                    `Não se Aplica: ${instance.stats.answerCounts["Don't Apply"]}`}
                                </div>
                                <div
                                  className="bar unanswered"
                                  style={{
                                    width: `${
                                      (instance.stats.totalUnanswered /
                                        instance.stats.totalQuestions) *
                                      100
                                    }%`,
                                  }}
                                >
                                  {instance.stats.totalUnanswered > 0 &&
                                    `Não respondidas: ${instance.stats.totalUnanswered}`}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="requirement_stats error">
                            Error retrieving statistics
                          </div>
                        )}
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
        </div>
      )}
    </div>
  );
}

export default Home;
