import React from "react";
import * as Survey from "survey-react";
import * as widgets from "surveyjs-widgets";
import "survey-react/survey.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "pretty-checkbox/dist/pretty-checkbox.css";
import { json } from "./res/whizz_survey_question.js";

import { dbInstance } from './utils/firebaseConfig';

//import { json } from "./survey_json.js";

//import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
//require("icheck");

export { MyQuestion } from "./toremove/MyQuestion";

Survey.StylesManager.applyTheme("default");

window.survey = new Survey.Model(json);

export function SurveyPage() {
  const dbCollectionInstance = dbInstance.collection("responses");
  var model = new Survey.Model(json);

  function onValueChanged(result) {
    // not implemented yet
  }
  
  function onComplete(sender, options) {
    let dataObject = sender.data;
    let tempObject = {
      foodItemRating: { }
    }
    Object.keys(dataObject).forEach(key => {
      if(key.includes("foodItem")){
        let index = key.substring(8);
        if(dataObject[`satisfactionfoodItem${index}`]){
          tempObject.foodItemRating[dataObject[key]] = dataObject[`satisfactionfoodItem${index}`]
          delete dataObject[`satisfactionfoodItem${index}`];
        }
        if(dataObject[`addMore${index}`]) delete dataObject[`addMore${index}`]
        delete dataObject[key]   
      }
    })

    dataObject = {foodItemRating: tempObject.foodItemRating, ...dataObject}
    console.log(dataObject);
    dbCollectionInstance.add(dataObject)
    .then((_docRef) => {
      options.showDataSavingSuccess()
     })
    .catch((error) => {
      console.log(error)
      options.showDataSavingError();
    });
  }


  return (
    <div className="container">
      <h2>Satisfaction survey</h2>
      <Survey.Survey
        model={model}
        onComplete={onComplete}
        onValueChanged={onValueChanged}
      />
    </div>
  );
}
