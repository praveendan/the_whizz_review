import { dbInstance } from './../utils/firebaseConfig';

var foodItems = [];

dbInstance.collection("food_items").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    let foodItem = doc.data();
    if(foodItem) {
      foodItems.push({
        value: doc.id,
        text:foodItem.name
      })
    }
  });
  foodItems.sort((a, b) => a.text.localeCompare(b.text));
});

export var json = {
  pages: [
    {
      questions: [
        {
          type: "matrix",
          name: "quality",
          title: "Please rate our service",
          isRequired: true,
          columns: [
            {
              value: 1,
              text: "Bad"
            }, {
              value: 2,
              text: "Should improve"
            }, {
              value: 3,
              text: "Neutral"
            }, {
              value: 4,
              text: "Ok"
            }, {
              value: 5,
              text: "Really good"
            }
          ],
          rows: [
            {
              value: "Cleanliness",
              text: "Cleanliness"
            }, {
              value: "Staff service",
              text: "Staff service"
            }, {
              value: "Food taste",
              text: "Food taste"
            }, {
              value: "Order arrival time",
              text: "Order arrival time"
            }
          ]
        }, {
          type: "rating",
          name: "satisfaction",
          title: "How satisfied are you with Whizz?",
          isRequired: true,
          mininumRateDescription: "Not Satisfied",
          maximumRateDescription: "Completely satisfied"
        }, {
          type: "rating",
          name: "recommendFriends",
        //  visibleIf: "{satisfaction} > 3",
          title: "How likely are you to recommend the Whizz to a friend or co-worker?",
          mininumRateDescription: "Will not recommend",
          maximumRateDescription: "I will recommend"
        }, {
          type: "dropdown",
          name: "foodItem0",
          title: "What did you buy?",
          colCount: 0,
          choices: foodItems
        }, {
          type: "rating",
          name: "satisfactionfoodItem0",
          title: "How satisfied are you with it?",
          mininumRateDescription: "Not Satisfied",
          maximumRateDescription: "Completely satisfied"
        }, {
          type: "boolean",
          name: `addMore1`,
          title: "Add more?",
          label: "Add more?",
        }, {
          type: "dropdown",
          name: `foodItem1`,
          visibleIf: `{addMore1} == true`,
          title: "What else did you buy?",
          colCount: 0,
          choices: foodItems
        }, {
          type: "rating",
          name: "satisfactionfoodItem1",
          title: "How satisfied are you with it?",
          visibleIf: `{addMore1} == true`,
          mininumRateDescription: "Not Satisfied",
          maximumRateDescription: "Completely satisfied"
        }
      ]
    }, {
      questions: [
        {
          type: "comment",
          name: "suggestions",
          title: "Any improvement/complaints/other?"
        },
        {
          type: "text",
          name: "email",
          title: "Thank you for taking our survey. Your survey is almost complete, please enter your email address and/or phone number then press the 'Submit' button."
        },
        {
          type: "text",
          name: "phone",
          title: "Phone number"
        }
      ]
    }
  ]
};

for(var i = 2; i < 10; i++){
  json.pages[0].questions.push({
    type: "boolean",
    name: `addMore${i}`,
    visibleIf: `{addMore${i-1}} == true`,
    title: "Add more?",
    label: "Add more?",
  }, {
    type: "dropdown",
    name: `foodItem${i}`,
    visibleIf: `{addMore${i}} == true`,
    title: "What else did you buy?",
    colCount: 0,
    choices: foodItems
  }, {
    type: "rating",
    name: `satisfactionfoodItem${i}`,
    title: "How satisfied are you with it?",
    visibleIf: `{addMore${i}} == true`,
    mininumRateDescription: "Not Satisfied",
    maximumRateDescription: "Completely satisfied"
  })
}

