// src/components/Profile.js
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth0} from "../react-auth0-spa";

const SurveysDone = () => {

  const [survey, setSurvey] = useState([])

  useEffect(() => {
    const fetchItems = () => {
      let localStorageEmail = localStorage.getItem('userEmail');
      axios.get(`http://localhost:5000/${localStorageEmail}/surveys`)
      .then(res => {
        console.log(res)
        setSurvey(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    fetchItems();
  }, [])

  return (
    <div>
        {survey.map((individualSurvey, index) => {
          return(
            <ul key={index}>
              <li>{JSON.stringify(individualSurvey)}</li>
            </ul>
          )
        })}
    </div>
  );
};

export default SurveysDone;