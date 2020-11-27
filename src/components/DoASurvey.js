// src/components/Profile.js
import React, {useEffect, useState} from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa";


//apply theme
Survey.StylesManager.applyTheme("darkblue");

// async function get_json() {
  
//   const res = await axios.get("http://localhost:5000/get_que")
  
//   // console.log(res.data)
//   // res = res.json();
//   return res.data.data && res.data.data[0] && res.data.data[0].json ? res.data.data[0].json : []; 

// }
const DoASurvey = () => {

  const [surveyData, setSurveyData] = useState({});

  useEffect(() => {
    get_json();
  }, []);

  async function get_json() {
  
    const res = await axios.get("http://localhost:5000/get_que")
    const x = res.data.data && res.data.data[0] && res.data.data[0].json ? res.data.data[0].json : {}; 
    var surveyJSON = JSON.parse(x);
    setSurveyData(surveyJSON);
  }


  const { user } = useAuth0();
  localStorage.setItem('userEmail', user.email)

  const sendDataToServer = (survey) => {
    //send Ajax request to your web server.
    // JSON.stringify(survey.data);
    axios.post("http://localhost:5000/doasurvey", {
      data: survey.data,
      email: user.email
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div>
      <Survey.Survey json={surveyData ? surveyData:{}} onComplete={sendDataToServer} />
    </div>
  );
};

export default DoASurvey;