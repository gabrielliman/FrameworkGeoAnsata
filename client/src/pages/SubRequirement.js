import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SubRequirement() {
  let navigate = useNavigate();

  let { subrequirement_id } = useParams();

  const [subrequirementObject, setSubRequirementObject] = useState({});
  const [listOfReferenceQuestion, setListOfReferenceQuestion] = useState([]);
  const [answers, setAnswers] = useState({});
  const [warning, setWarning] = useState("");
  const [instanceId, setInstanceId] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Fetch InstanceID from session storage on component mount
  useEffect(() => {
    const storedInstanceId = sessionStorage.getItem("selectedInstanceID");
    if (storedInstanceId) {
      setInstanceId(storedInstanceId);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/subrequirements/byId/${subrequirement_id}`, {
        withCredentials: true,
      })
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
      .get(`http://localhost:3001/questions/${subrequirement_id}`, {
        withCredentials: true,
      })
      .then((response) => {if (response.data.length > 0) {
        axios
          .post("http://localhost:3001/referencequestions/byIds", response.data)
          .then((response) => {
            setListOfReferenceQuestion(response.data);
            // Initialize answers state with default values
            const initialAnswers = {};
            response.data.forEach((question) => {
              initialAnswers[question.ID] = ""; // Default answer is empty string
            });
            setAnswers(initialAnswers);
          });
  }});
  }, [subrequirement_id]);

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
        .post("http://localhost:3001/answers", submission)
        .then((response) => {
          setConfirmationMessage("Submission successful!");
          // Optionally, do something with the response, like showing a success message
        })
        .catch((error) => {
          console.error("Error submitting answers:", error);
          // Optionally, handle errors, show error message, etc.
          setWarning("Error submitting answers. Please try again.");
        });
    }
  };

  return (
    <div>
      <div className="solo_SubRequirement">
        <div className="subrequirement_title">{subrequirementObject.Title}</div>
        <div className="subrequirement_body">{subrequirementObject.OriginalQuestion}</div>
      </div>
      <div>
        {listOfReferenceQuestion.map((value, key) => {
          return (
            <div className="Question" key={value.ID}>
              <div className="Question_body">{value.Text}</div>
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
        <button className="submit-button" onClick={handleSubmit}>
          Submit Response
        </button>
      )}
      {confirmationMessage && (
        <div className="confirmation">{confirmationMessage}</div>
      )}
      {warning && <div className="warning">{warning}</div>}
    </div>
  );
  
}

export default SubRequirement;
