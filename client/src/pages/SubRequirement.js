import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubRequirement() {
  let navigate = useNavigate();
  let { subrequirement_id } = useParams();
  let location = useLocation();

  const [subrequirementObject, setSubRequirementObject] = useState({});
  const [listOfReferenceQuestion, setListOfReferenceQuestion] = useState([]);
  const [answers, setAnswers] = useState({});
  const [warning, setWarning] = useState("");
  const [instanceId, setInstanceId] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    const storedInstanceId = sessionStorage.getItem("selectedInstanceID");
    if (storedInstanceId) {
      setInstanceId(storedInstanceId);
    } else {
      navigate("/"); // Redirect to home page if instance ID is not stored
    }

    const { listOfSubRequirement, currentIndex } = location.state;
    setCurrentIndex(currentIndex);
    const currentSubRequirement = listOfSubRequirement[currentIndex];

    axios
      .get(
        `http://localhost:3001/subrequirements/byId/${currentSubRequirement.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setSubRequirementObject(response.data);
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
      .get(`http://localhost:3001/questions/${currentSubRequirement.ID}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.length > 0) {
          axios
            .post(
              "http://localhost:3001/referencequestions/byIds",
              response.data,
              {
                withCredentials: true,
              }
            )
            .then((response) => {
              setListOfReferenceQuestion(response.data);
              // Initialize answers state with default values
              const initialAnswers = {};
              response.data.forEach((question) => {
                initialAnswers[question.ID] = ""; // Default answer is empty string
              });
              setAnswers(initialAnswers);
            });
        } else {
          // No reference questions available for this sub-requirement
          setListOfReferenceQuestion([]); // Clear the list of reference questions
          setAnswers({}); // Clear the answers
        }
      });

    // Verifique se o botão "Previous" deve ser mostrado
    if (currentIndex > 0) {
      setShowPreviousButton(true);
    } else {
      setShowPreviousButton(false);
    }

    // Verifique se o botão "Next" deve ser mostrado
    if (currentIndex < location.state.listOfSubRequirement.length - 1) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  }, [subrequirement_id, navigate, location.state]);

  // Handler to update answers state when selector changes
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Handler to submit answers
  const handleSubmit = () => {
    // Check if any answer is empty
    const isEmpty = Object.values(answers).some((answer) => answer === "");
    if (isEmpty) {
      setWarning("Please fill in all the answers before submitting.");
    } else {
      setWarning("");
      // Construct submission JSON with required field names
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

  // Rest of your code

  return (
    <div>
      <div className="solo_SubRequirement">
        <div className="subrequirement_page_title">SubRequirement: {subrequirementObject.Title}</div>
        <div className="subrequirement_page_body">
          {subrequirementObject.OriginalQuestion}
        </div>
      </div>
      <div className="sub_type">Questions:</div>
      <div>
        {listOfReferenceQuestion.map((value, key) => {
          return (
            <div className="Question" key={value.ID}>
              <div className="question_body">{value.Text}</div>
              <select
                value={answers[value.ID]}
                onChange={(e) => handleAnswerChange(value.ID, e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Don't Apply">Don't Apply</option>
              </select>
            </div>
          );
        })}
      </div>
      {listOfReferenceQuestion.length > 0 && (
        <div className="submit-container">
          <button className="submit-button" onClick={handleSubmit}>
            Submit Response
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
          Previous
        </button>
        <button className="return-button" onClick={handleReturn}>
          Return
        </button>
        <button
          className="next-button"
          onClick={goToNextSubRequirement}
          style={{ visibility: showNextButton ? "visible" : "hidden" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SubRequirement;
