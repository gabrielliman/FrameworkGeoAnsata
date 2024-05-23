import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SubSection() {
  let { subsection_id } = useParams();
  let navigate = useNavigate();

  const [subsectionObject, setSubSectionObject] = useState({});
  const [instanceID, setInstanceId] = useState("");
  const [listOfRequirement, setListOfRequirement] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedInstanceId = sessionStorage.getItem("selectedInstanceID");
    if (storedInstanceId) {
      setInstanceId(storedInstanceId);
    } else {
      console.error("error");
    }
  }, [navigate]);

  useEffect(() => {
    if (instanceID && !loaded) {
      axios
        .get(`http://localhost:3001/subsections/byId/${subsection_id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setSubSectionObject(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setLoaded(true);
    }
  }, [instanceID, loaded, subsection_id]);

  useEffect(() => {
    if (instanceID && loaded) {
      axios
        .get(`http://localhost:3001/requirements/${subsection_id}`, {
          withCredentials: true,
        })
        .then(async (response) => {
          const requirementsWithStatsPromises = response.data.map(
            async (requirement) => {
              try {
                const statsResponse = await axios.get(
                  `http://localhost:3001/results/requirements/${requirement.ID}/instances/${instanceID}/questions-answers`,
                  {
                    withCredentials: true,
                  }
                );
                requirement.stats = statsResponse.data;
              } catch (error) {
                console.error(
                  "Error fetching question and answer statistics:",
                  error
                );
                requirement.stats = { error: true };
              }
              return requirement;
            }
          );

          const requirementsWithStats = await Promise.all(
            requirementsWithStatsPromises
          );

          // Filter requirements based on subrequirements class
          const filteredRequirements = requirementsWithStats.filter(
            (requirement) => {
              if (
                requirement.stats &&
                requirement.stats.totalSubRequirements > 0
              ) {
                return true;
              }
              return false;
            }
          );

          setListOfRequirement(filteredRequirements);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [instanceID, loaded, subsection_id]);

  const handleReturn = () => {
    navigate("/section/" + subsectionObject["SectionID"]);
  };

  return (
    <div>
      <div className="solo_SubSection">
        <div className="subsection_page_title">
          SubSeção: {subsectionObject.Title}
        </div>
        <div className="subsection_page_body">
          {subsectionObject.Description}
        </div>
      </div>
      <div>
        <div className="sub_type">Requisitos:</div>
        {listOfRequirement.map((value, key) => {
          return (
            <div
              className="Requirement"
              key={value.ID}
              onClick={() => {
                navigate(`/requirement/${value.ID}`);
              }}
            >
              <div className="requirement_title">{value.Title}</div>
              <div className="requirement_body">{value.OriginalText}</div>
              {value.stats ? (
                <div className="requirement_stats">
                  Número de SubRequisitos: {value.stats.totalSubRequirements}
                  <br />
                  Número de Perguntas: {value.stats.totalQuestions}
                  <br />
                  Respondidas: {value.stats.totalAnswered}
                  <br />
                  Não Respondidas: {value.stats.totalUnanswered}
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
                          `Não Respondidas: ${value.stats.totalUnanswered}`}
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

export default SubSection;
