//NOT IMPLEMENTED YET

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const InstanceDetailsTable = () => {
  let { instance_id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/results/instance-details/${instance_id}`, { withCredentials: true });
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, [instance_id]);

  if (error) {
    return <div>Error fetching data</div>;
  }
  //ta com problema no map nao sei pq
  return (
    <table>
      <thead>
        <tr>
          <th>Instance Title</th>
          <th>Section Title</th>
          <th>Subsection Title</th>
          <th>Requirement Title</th>
          <th>Subrequirement Title</th>
          <th>Question Text</th>
          <th>Reference Question Text</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody>
        {data && data.Framework && data.Framework.Sections.map(section => (
          section.SubSections.map(subsection => (
            subsection.Requirements.map(requirement => (
              requirement.Subrequirements.map(subrequirement => (
                subrequirement.Questions.map(question => (
                  <tr key={question.id}>
                    <td>{data.Title}</td>
                    <td>{section.Title}</td>
                    <td>{subsection.Title}</td>
                    <td>{requirement.Title}</td>
                    <td>{subrequirement.Title}</td>
                    <td>{question.Text}</td>
                    <td>{question.ReferenceQuestion ? question.ReferenceQuestion.Text : ''}</td>
                    <td>{question.Answers.length > 0 ? question.Answers[0].Answer : ''}</td>
                  </tr>
                ))
              ))
            ))
          ))
        ))}
      </tbody>
    </table>
  );
};

export default InstanceDetailsTable;
