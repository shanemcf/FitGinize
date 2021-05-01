// Wger APi

// var wLog = document.getElementById("Develop-1-row");

//name functions for api
// function workoutLog() {

//fetch workout
// fetch (
//     `https://wger.de/api/v2/workoutlog/`
// )

// .then(function(logResponse) {
//     return logResponse.json();
// })
// console.log(logResponse);

//.then
// take in user information

// }

const postWorkout = async () => {
  const data = {
    username: "test",
    password: "workout",
    workout: "workout input",
  };

  const result = await fetch("api/newApiEndpoint", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const data1 = result.json();

  return data1;
};

const storedWorkoutInfo = () => {

}

document.querySelector("#submit").addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event.target)
  storedWorkoutInfo();
});
  // document.querySelector('#submit').addEventListener('click', postWorkout)

  // possible change for form submission
  // function logSubmit(event) {
  //     log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
  //     event.preventDefault();
  //   }

  //   const form = document.getElementById('form');
  //   const log = document.getElementById('log');
  //   form.addEventListener('submit', logSubmit);


//  <script>
// var obj = {
//     method: "GET",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Token " + "22cf1decb1a1c1f8492379d41682e3345b0dec74",
//         Origin: "",
//     },
// };
// fetch(" https://wger.de/api/v2/workoutlog", obj)
//     .then((res) => res.json())
//     .then((data) => console.log("data: ", data));

let data = {
  reps: [1],
  weight: [20],
  date: ["wed"],
  exercise: ["curl"],
  workout: [1],
};

let newObj = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Token " + "22cf1decb1a1c1f8492379d41682e3345b0dec74",
    Origin: "",
  },
  body: JSON.stringify(data),
};

//POst Route
fetch(" https://wger.de/api/v2/workoutlog", newObj)
  .then((res) => {
    console.log(res);
    res.json();
  })
  .then((data) => console.log("data: ", data));

//data needed back( in array?)
// {
//     "reps": [
//         "This field is required."
//     ],
//     "weight": [
//         "This field is required."
//     ],
//     "date": [
//         "This field is required."
//     ],
//     "exercise": [
//         "This field is required."
//     ],
//     "workout": [
//         "This field is required."
//     ]
// }

/* </script> */

//practice for drop-down list of excersizes

async function getEx() {
  let url = "https://wger.de/api/v2/exercise/?format=json";
  const array = [];

  while (url) {
    const res = await fetch(url);
    data = await res.json();
    for (const item of data.results) {
      //   console.log(item.name);
      array.push(item.name);
    }
    url = data.next;
  }
  //   console.log(array);
  return array;
}

getEx().then((data) => {
  console.log(data);
         //populate drop down with data
  var select = document.getElementById("exerciseList");

  for (let i = 0; i < data.length; i++) {
    var opt = data[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
});
