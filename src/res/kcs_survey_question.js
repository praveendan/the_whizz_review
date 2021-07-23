export var json = {
  pages: [
    {
      questions: [
        {
          type: "matrix",
          name: "quality",
          title: "How was your stay?",
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
              value: "Staff service",
              text: "Staff service"
            }, {
              value: "Location of the property",
              text: "Location of the property"
            }, {
              value: "Value for money",
              text: "Value for money"
            }, {
              value: "Cleanliness of the common areas",
              text: "Cleanliness of the common areas"
            }
          ]
        }, {
          type: "matrix",
          name: "bedroom",
          title: "Bedroom",
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
              value: "Comfort of the bed",
              text: "Comfort of the bed"
            }, {
              value: "Cleanliness of the room",
              text: "Cleanliness of the room"
            }, {
              value: "Cleanliness of the bathroom",
              text: "Cleanliness of the bathroom"
            },  {
              value: "Cleanliness of the linens",
              text: "Cleanliness of the linens"
            }, {
              value: "WiFi",
              text: "WiFi"
            }, {
              value: "Fascilities of the room",
              text: "Fascilities of the room"
            }, {
              value: "Quietness of the room",
              text: "Quietness of the room"
            }, {
              value: "Overall Room rating",
              text: "Overall Room rating"
            }
          ]
        }, {
          type: "comment",
          name: "Suggestions",
          title: "Any improvement/complaints/other?"
        }
      ]
    }
  ]
};