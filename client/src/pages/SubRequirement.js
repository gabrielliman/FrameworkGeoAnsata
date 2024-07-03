import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubRequirement() {
  let navigate = useNavigate();
  let { subrequirement_id } = useParams();
  let location = useLocation();

  const [subrequirementObject, setSubRequirementObject] = useState({});
  const [listOfQuestion, setListOfQuestion] = useState([]);

  const [answers, setAnswers] = useState({});
  const [warning, setWarning] = useState("");
  const [instanceId, setInstanceId] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {const fetchData = async () => {
    try {
      const storedInstanceId = sessionStorage.getItem("selectedInstanceID");
      if (storedInstanceId) {
        setInstanceId(storedInstanceId);
      } else {
        navigate("/");
      }

      const { listOfSubRequirement, currentIndex } = location.state;
      setCurrentIndex(currentIndex);
      const currentSubRequirement = listOfSubRequirement[currentIndex];

      const subRequirementResponse = await axios.get(
        `http://localhost:3001/subrequirements/byId/${currentSubRequirement.ID}`,
        { withCredentials: true }
      );
      setSubRequirementObject(subRequirementResponse.data);

      const questionsResponse = await axios.get(
        `http://localhost:3001/questions/${currentSubRequirement.ID}`,
        { withCredentials: true }
      );
      const questions = questionsResponse.data;

      const initialAnswers = {};
      questions.forEach((question) => {
        initialAnswers[question.ID] = "";
      });
      setAnswers(initialAnswers);

      for (const question of questions) {
        const referenceResponse = await axios.post(
          "http://localhost:3001/referencequestions/byIds",
          [question],
          { withCredentials: true }
        );
        const referenceQuestion = referenceResponse.data[0];
        question.reference = referenceQuestion;
      }

      setListOfQuestion(questions);

    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  fetchData();

  if (currentIndex > 0) {
    setShowPreviousButton(true);
  } else {
    setShowPreviousButton(false);
  }

  if (currentIndex < location.state.listOfSubRequirement.length - 1) {
    setShowNextButton(true);
  } else {
    setShowNextButton(false);
  }
  }, [subrequirement_id, navigate, location.state, currentIndex]);

  // Handler to update answers state when selector changes
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Handler to submit answers
  const handleSubmit = () => {
    const isEmpty = Object.values(answers).some((answer) => answer === "");
    if (isEmpty) {
      setWarning("Please fill in all the answers before submitting.");
    } else {
      setWarning("");
      const submission = Object.entries(answers).map(
        ([questionId, answer]) => ({
          QuestionID: questionId,
          Answer: answer,
          InstanceID: instanceId,
        })
      );
      // Send the submission data to the server
      axios
        .post("http://localhost:3001/answers", submission, {
          withCredentials: true,
        })
        .then((response) => {
          setConfirmationMessage("Submission successful!");
        })
        .catch((error) => {
          console.error("Error submitting answers:", error);
          setWarning("Error submitting answers. Please try again.");
        });
    }
  };

  const handleReturn = () => {
    navigate("/requirement/" + subrequirementObject["RequirementID"]);
  };

  // Handler to navigate to the previous sub-requirement
  const goToPreviousSubRequirement = () => {
    const { listOfSubRequirement } = location.state;
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
      navigate(`/subrequirement/${listOfSubRequirement[newIndex].ID}`, {
        state: { listOfSubRequirement, currentIndex: newIndex },
      });
    }
  };

  // Handler to navigate to the next sub-requirement
  const goToNextSubRequirement = () => {
    const { listOfSubRequirement } = location.state;
    const newIndex = currentIndex + 1;
    if (newIndex < listOfSubRequirement.length) {
      setCurrentIndex(newIndex);
      navigate(`/subrequirement/${listOfSubRequirement[newIndex].ID}`, {
        state: { listOfSubRequirement, currentIndex: newIndex },
      });
    }
  };

    return (
    <div>
      <div className="solo_SubRequirement">
        <div>Essa página não é mais necessária na nova definição do projeto</div>
        <div>Na nova implementação um requisito deve redirecionar direto para as perguntas</div>
        <div className="subrequirement_page_title">SubRequisito: {subrequirementObject.Title}</div>
        <div className="subrequirement_page_body">
          {subrequirementObject.OriginalQuestion}
        </div>
      </div>
      <div className="sub_type">Perguntas:</div>
      <div>
        {listOfQuestion.map((value, key) => {
          return (
            <div className="Question" key={value.ID}>
              <div className="question_body">{value.reference.Text}</div>
              <select
                value={answers[value.ID]}
                onChange={(e) => handleAnswerChange(value.ID, e.target.value)}
              >
                <option value="">Selecione uma opção</option>
                <option value="Yes">Sim</option>
                <option value="No">Não</option>
                <option value="Don't Apply">Não se Aplica</option>
              </select>
            </div>
          );
        })}
      </div>
      {listOfQuestion.length > 0 && (
        <div className="submit-container">
          <button className="submit-button" onClick={handleSubmit}>
            Enviar Resposta
          </button>
        </div>
      )}
      {confirmationMessage && (
        <div className="confirmation">{confirmationMessage}</div>
      )}
      {warning && <div className="warning">{warning}</div>}
      <div className="button-container">
        <button
          className="previous-button"
          onClick={goToPreviousSubRequirement}
          style={{ visibility: showPreviousButton ? "visible" : "hidden" }}
        >
          Anterior
        </button>
        <button className="return-button" onClick={handleReturn}>
          Return
        </button>
        <button
          className="next-button"
          onClick={goToNextSubRequirement}
          style={{ visibility: showNextButton ? "visible" : "hidden" }}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default SubRequirement;
