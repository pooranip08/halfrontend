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
    const res = await axios.get("https://hal-server.herokuapp.com/get_que");
    const x =
      res.data.data && res.data.data[0] && res.data.data[0].json
        ? res.data.data[0].json
        : {};
    var surveyJSON = JSON.parse(x);
    var surveyname = surveyJSON.title;
    setSurveyData(surveyJSON);
    setSurveyName(surveyname);
  }

  // const { user } = useAuth0();
  // localStorage.setItem("userEmail", user.email);

  const sendDataToServer = (survey) => {
    //send Ajax request to your web server.
    // JSON.stringify(survey.data);
    axios
      .post("https://halscreen-admin.herokuapp.com/post", {
        surveyResult: survey.data,
        //postId: Buffer.from(surveyname).toString('base64')
        postId: "10b55cd4-39bf-11eb-9e03-22000b8fc28c",
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
//survey.data["Email Address"]
    formData.append("email", "test1");
//added server url
    axios({
      method: "POST",
      url: "https://halscreen-admin.herokuapp.com/uploadFile",
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
