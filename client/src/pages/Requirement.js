import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Requirement() {
  let { requirement_id } = useParams();
  let navigate = useNavigate();

  const [requirementObject, setRequirementObject] = useState({});
  const [instanceID, setInstanceId] = useState("");
  const [listOfSubRequirement, setListOfSubRequirement] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedInstanceId = sessionStorage.getItem("selectedInstanceID");
    if (storedInstanceId) {
      setInstanceId(storedInstanceId);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (instanceID && !loaded) {
      axios
        .get(`http://localhost:3001/requirements/byId/${requirement_id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setRequirementObject(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setLoaded(true);
    }
  }, [instanceID, loaded, requirement_id]);

  useEffect(() => {
    const enumValues = {
      Exploration: 1,
      Resource: 2,
      Reserve: 3,
    };

    if (instanceID && loaded) {
      axios
        .get(`http://localhost:3001/instance/byId/${instanceID}`, {
          withCredentials: true,
        })
        .then((res) => {
          axios
            .get(`http://localhost:3001/subrequirements/${requirement_id}`, {
              withCredentials: true,
            })
            .then(async (response) => {
              const filteredSubRequirements = response.data.filter(
                (subRequirement) =>
                  enumValues[subRequirement.Class] <=
                  enumValues[res.data["Class"]]
              );
              const subrequirementsWithStatsPromises =
                filteredSubRequirements.map(async (subrequirement) => {
                  try {
                    const statsResponse = await axios.get(
                      `http://localhost:3001/results/subrequirements/${subrequirement.ID}/instances/${instanceID}/questions-answers`,
                      {
                        withCredentials: true,
                      }
                    );
                    subrequirement.stats = statsResponse.data;
                  } catch (error) {
                    console.error(
                      "Error fetching question and answer statistics:",
                      error
                    );
                    subrequirement.stats = { error: true };
                  }
                  return subrequirement;
                });
              const subrequirementsWithStats = await Promise.all(
                subrequirementsWithStatsPromises
              );
              const filteredSubRequirementsWithStats =
                subrequirementsWithStats.filter((subrequirement) => {
                  if (subrequirement.stats) {
                    return true;
                  }
                  return false;
                });
              setListOfSubRequirement(filteredSubRequirementsWithStats);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error("Error fetching instance:", error);
          navigate("/");
        });
    } else {
      //navigate("/");
    }
  }, [instanceID, loaded, requirement_id, navigate]);

  const handleReturn = () => {
    navigate("/subsection/" + requirementObject["SubSectionID"]);
  };

  return (
    <div>
      <div className="solo_Requirement">
        <div className="requirement_page_title">
          Requisito: {requirementObject.Title}
        </div>
        <div className="requirement_page_body">
          {requirementObject.OriginalText}
        </div>
      </div>
      <div className="sub_type">SubRequisito:</div>
      <div>
        {listOfSubRequirement.map((value, key) => {
          return (
            <div
              className="SubRequirement"
              key={value.ID}
              onClick={() => {
                navigate(`/subrequirement/${value.ID}`, {
                  state: { listOfSubRequirement, currentIndex: key },
                });
              }}
            >
              <div className="subrequirement_title">{value.Title}</div>
              <div className="subrequirement_body">
                {value.OriginalQuestion}
              </div>
              {value.stats ? (
                <div>
                  <div className="requirement_stats">
                    Número de Perguntas: {value.stats.totalQuestions}
                    <br />
                    Respondidas: {value.stats.totalAnswered}
                    <br />
                    Não Respondidas: {value.stats.totalUnanswered}
                  </div>

                  {value.stats.totalQuestions > 0 && (
                    <div className="bar-container">
                      <div
                        className="bar yes"
                        style={{
                          width: `${
                            (value.stats.answerCounts.Yes /
                              value.stats.totalQuestions) *
                            100
                          }%`,
                        }}
                      >
                        {value.stats.answerCounts.Yes > 0 &&
                          `Sim: ${value.stats.answerCounts.Yes}`}
                      </div>
                      <div
                        className="bar no"
                        style={{
                          width: `${
                            (value.stats.answerCounts.No /
                              value.stats.totalQuestions) *
                            100
                          }%`,
                        }}
                      >
                        {value.stats.answerCounts.No > 0 &&
                          `Não: ${value.stats.answerCounts.No}`}
                      </div>
                      <div
                        className="bar dont-apply"
                        style={{
                          width: `${
                            (value.stats.answerCounts["Don't Apply"] /
                              value.stats.totalQuestions) *
                            100
                          }%`,
                        }}
                      >
                        {value.stats.answerCounts["Don't Apply"] > 0 &&
                          `Não se Aplica: ${value.stats.answerCounts["Don't Apply"]}`}
                      </div>
                      <div
                        className="bar unanswered"
                        style={{
                          width: `${
                            (value.stats.totalUnanswered /
                              value.stats.totalQuestions) *
                            100
                          }%`,
                        }}
                      >
                        {value.stats.totalUnanswered > 0 &&
                          `Não respondidas: ${value.stats.totalUnanswered}`}
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
