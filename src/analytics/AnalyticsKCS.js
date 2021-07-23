import React, { useState, useEffect } from "react";
//import SurveyAnalytics from "../SurveyAnalytics";
import { dbInstance } from '../utils/firebaseConfig';
import "./style.css";

export function KcsAnalyticsPage() {
  const [qualityObject, setQualityObject] = useState({});
  const [bedroomObject, setBedroomObject] = useState({});
  const [satisfactionObject, setSatisfactionObject] = useState({});
  const [recommendObject, setRecommendObject] = useState({});
  const [foodRatings, setFoodRatings] = useState({});

  useEffect(() => {
    
    dbInstance.collection("kcs_responses").get().then((querySnapshot) => {
      //array of 5: total, 1,2,3,4,5
      let tempQualityObject = {};
      let tempBedroomObject = {};
      let satisfactionObject = {
        totalResponses: 0,
        accumulatedRating: 0
      };
      let recommendObject = {
        totalResponses: 0,
        accumulatedRating: 0
      };
      let foodObject = {}

      querySnapshot.forEach((doc) => {
        let qualitySnap = doc.data()["quality"];
        if (qualitySnap) {
          Object.keys(qualitySnap).forEach(elem => {
            if (tempQualityObject[elem]) {
              let rating = qualitySnap[elem];
              tempQualityObject[elem].ratings[rating]++;
              tempQualityObject[elem].ratings[0]++;
            } else {
              tempQualityObject[elem] = {};
              tempQualityObject[elem].ratings = new Array(6).fill(0);
              let rating = qualitySnap[elem];
              tempQualityObject[elem].ratings[rating]++;
              tempQualityObject[elem].ratings[0]++;
            }
          })
        }

        let beroomSnap = doc.data()["bedroom"];
        if (beroomSnap) {
          Object.keys(beroomSnap).forEach(elem => {
            if (tempBedroomObject[elem]) {
              let rating = beroomSnap[elem];
              tempBedroomObject[elem].ratings[rating]++;
              tempBedroomObject[elem].ratings[0]++;
            } else {
              tempBedroomObject[elem] = {};
              tempBedroomObject[elem].ratings = new Array(6).fill(0);
              let rating = beroomSnap[elem];
              tempBedroomObject[elem].ratings[rating]++;
              tempBedroomObject[elem].ratings[0]++;
            }
          })
        }

      });

      Object.keys(tempQualityObject).forEach(elem => {
        let totalNumberofRecords = tempQualityObject[elem].ratings[0];
        let averageRating = (tempQualityObject[elem].ratings[1] +
          tempQualityObject[elem].ratings[2] * 2 +
          tempQualityObject[elem].ratings[3] * 3 +
          tempQualityObject[elem].ratings[4] * 4 +
          tempQualityObject[elem].ratings[5] * 5) / totalNumberofRecords;
        tempQualityObject[elem].averageRating = averageRating;
      })

      Object.keys(tempBedroomObject).forEach(elem => {
        let totalNumberofRecords = tempBedroomObject[elem].ratings[0];
        let averageRating = (tempBedroomObject[elem].ratings[1] +
          tempBedroomObject[elem].ratings[2] * 2 +
          tempBedroomObject[elem].ratings[3] * 3 +
          tempBedroomObject[elem].ratings[4] * 4 +
          tempBedroomObject[elem].ratings[5] * 5) / totalNumberofRecords;
        tempBedroomObject[elem].averageRating = averageRating;
      })

      
      setQualityObject(tempQualityObject);
      setBedroomObject(tempBedroomObject);
    
    });
  }, [])

  return (
    <div className="container">
      <h2>Survey results - KCS</h2>
      <div className="analyticsContainer">
        <div className="sa-question__content">
          <h3 className="sa-question__title sa-question__title">
            Quality ratings
          </h3>
          {
            Object.keys(qualityObject).map((elem, key) =>
              <React.Fragment key={key}>
                <strong>{elem}</strong>
                <p>Average rating: {qualityObject[elem].averageRating.toFixed(2)}</p>
                <p>Total responses: {qualityObject[elem].ratings[0]}</p>
              </React.Fragment>
            )
          }
        </div>

        <div className="sa-question__content">
          <h3 className="sa-question__title sa-question__title">
            Bedroom quality ratings
          </h3>
          {
            Object.keys(bedroomObject).map((elem, key) =>
              <React.Fragment key={key}>
                <strong>{elem}</strong>
                <p>Average rating: {bedroomObject[elem].averageRating.toFixed(2)}</p>
                <p>Total responses: {bedroomObject[elem].ratings[0]}</p>
              </React.Fragment>
            )
          }
        </div>
        
      </div>

      {/* <SurveyAnalytics /> */}
    </div>
  );
}
