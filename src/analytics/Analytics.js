import React, { useState, useEffect } from "react";
//import SurveyAnalytics from "../SurveyAnalytics";
import { dbInstance } from '../utils/firebaseConfig';
import "./style.css";

export function AnalyticsPage() {
  const [qualityObject, setQualityObject] = useState({});
  const [satisfactionObject, setSatisfactionObject] = useState({});
  const [recommendObject, setRecommendObject] = useState({});
  const [foodRatings, setFoodRatings] = useState({});
  const [foodItems, setFoodItems] = useState({});

  useEffect(() => {
    dbInstance.collection("food_items").get().then((querySnapshot) => {
      let tempObj = {};
      querySnapshot.forEach((doc) => {
        tempObj[doc.id] = doc.data()
      });

      setFoodItems(tempObj);
    })
    dbInstance.collection("responses").get().then((querySnapshot) => {
      //array of 5: total, 1,2,3,4,5
      let tempQualityObject = {};
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

        let satisfactionSnap = doc.data()["satisfaction"];
        if (satisfactionSnap) {
          satisfactionObject.totalResponses++;
          satisfactionObject.accumulatedRating += satisfactionSnap;
        }

        let recommendSnap = doc.data()["recommendFriends"];
        if (recommendSnap) {
          recommendObject.totalResponses++;
          recommendObject.accumulatedRating += recommendSnap;
        }

        let foodSnap = doc.data().foodItemRating;
        if (foodSnap) {
          Object.keys(foodSnap).forEach(elem => {
            if (foodObject[elem]) {
              let rating = foodSnap[elem];
              foodObject[elem].ratings[rating]++;
              foodObject[elem].ratings[0]++;
            } else {
              foodObject[elem] = {};
              foodObject[elem].ratings = new Array(6).fill(0);
              let rating = foodSnap[elem];
              foodObject[elem].ratings[rating]++;
              foodObject[elem].ratings[0]++;
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

      Object.keys(foodObject).forEach(elem => {
        let totalNumberofRecords = foodObject[elem].ratings[0];
        let averageRating = (foodObject[elem].ratings[1] +
          foodObject[elem].ratings[2] * 2 +
          foodObject[elem].ratings[3] * 3 +
          foodObject[elem].ratings[4] * 4 +
          foodObject[elem].ratings[5] * 5) / totalNumberofRecords;
        foodObject[elem].averageRating = averageRating;
      })

      setQualityObject(tempQualityObject);
      setSatisfactionObject(satisfactionObject);
      setRecommendObject(recommendObject);

      setFoodRatings(foodObject);
    });
  }, [])

  return (
    <div className="container">
      <h2>Survey results - Whizz</h2>
      <div className="analyticsContainer">
        <div className="sa-question__content">
          <h3 className="sa-question__title sa-question__title">
            Satisfation ratings
          </h3>
          <p>Satisfaction rating: {(satisfactionObject.accumulatedRating / satisfactionObject.totalResponses).toFixed(2)}</p>
          <p>Total responses: {satisfactionObject.totalResponses}</p>
          <p>Rating of how likely to recommend the place : {(recommendObject.accumulatedRating / recommendObject.totalResponses).toFixed(2)}</p>
          <p>Total responses: {recommendObject.totalResponses}</p>
        </div>
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
            Food ratings
          </h3>
          {
            Object.keys(foodRatings).map((elem, key) =>
              <React.Fragment key={key}>
                {foodItems && foodItems[elem] &&
                  <React.Fragment>
                    <strong>{foodItems[elem].name}</strong>
                    <p>Average rating: {foodRatings[elem].averageRating.toFixed(2)}</p>
                    <p>Total responses: {foodRatings[elem].ratings[0]}</p>
                  </React.Fragment>
                }
              </React.Fragment>
            )
          }
        </div>
      </div>

      {/* <SurveyAnalytics /> */}
    </div>
  );
}
