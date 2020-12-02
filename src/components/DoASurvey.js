// src/components/Profile.js
import React, { useEffect, useState } from "react";
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
  const [surveyname, setSurveyName] = useState({});

  useEffect(() => {
    get_json();
  }, []);

  async function get_json() {
    const res = await axios.get("https://surveyjsserver.herokuapp.com/get_que");
    const x =
      res.data.data && res.data.data[0] && res.data.data[0].json
        ? res.data.data[0].json
        : {};
    var surveyJSON = JSON.parse(x);
    var surveyname = surveyJSON.title;
    setSurveyData(surveyJSON);
    setSurveyName(surveyname);
  }

  const { user } = useAuth0();
  localStorage.setItem("userEmail", user.email);

  const sendDataToServer = (survey) => {
    //send Ajax request to your web server.
    // JSON.stringify(survey.data);
    axios
      .post("https://surveyjsbackend.herokuapp.com/post", {
        surveyResult: survey.data,
        //postId: Buffer.from(surveyname).toString('base64')
        postId: 1,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var survey = new Survey.Model(surveyData);

  survey.onUploadFiles.add(function (survey, options) {
    var formData = new FormData();
    options.files.forEach(function (file) {
      formData.append(file.name, file);
    });

    formData.append("email", user.email);

    console.log(formData);
    axios({
      method: "POST",
      url: "https://surveyjsbackend.herokuapp.com/uploadFile",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      console.log(res.dta);
      options.callback(
        "success",
        options.files.map(function (file, index) {
          return {
            file: file,
            content: res.data[index].url,
          };
        })
      );
    });
  });

  return (
    <div>
      <Survey.Survey
        // json={surveyData ? surveyData : {}}
        model={survey}
        onComplete={sendDataToServer}
      />
    </div>
  );
};

export default DoASurvey;
