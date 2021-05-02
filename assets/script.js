var userReps = document.querySelector("#stored-reps");
var userWeight = document.querySelector("#stored-weight");
var userSets = document.querySelector("#stored-sets");
var userExercise = document.querySelector("#stored-exercise");

const postWorkout = async () => {
  const data = {
    username: "test",
    password: "workout",
    workout: "workout input",
  };

  const result = await fetch("api/workoutlog", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const data1 = result.json();

  return data1;
};

const storedWorkoutInfo = () => {};

document.querySelector("#submit").addEventListener("click", (event) => {
  event.preventDefault();
  console.log(event.target);
  storedWorkoutInfo();
});

async function getEx() {
  let url = "https://wger.de/api/v2/exercise/?format=json";
  const array = [];

  while (url) {
    const res = await fetch(url);
    data = await res.json();
    for (const item of data.results) {
      array.push(item.name);
    }
    url = data.next;
  }
  return array;
}

getEx().then((data) => {
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
//  getting the data after submission
document.querySelector("#submit").addEventListener("click", (event) => {
  event.preventDefault();
  data = {};
  data.reps = document.getElementById("reps").value;
  data.weight = document.getElementById("weight").value;
  data.sets = document.getElementById("sets").value;
  data.exercise1 = document.getElementById("exerciseList").value;
  // storing data to Local
  localStorage.setItem("reps", data.reps);
  localStorage.setItem("weight", data.weight);
  localStorage.setItem("sets", data.sets);
  localStorage.setItem("exercise", data.exercise1);

  // retrieving stored data
  // document.getElementById("result").innerHTML = localStorage.getItem("reps");
  var storedReps = localStorage.getItem("reps");
  var storedWeight = localStorage.getItem("weight");
  var storedSets = localStorage.getItem("sets");
  var storedExercise = localStorage.getItem("exercise");
  userReps.textContent = storedReps;
  userWeight.textContent = storedWeight;
  userSets.textContent = storedSets;
  userExercise.textContent = storedExercise;
});

//Next Steps for Wger Api handling
// add info for exercise so that user can see instructions on how to do
//add body part integration so user can choose body part then have it filtered out
//add days of week into log so that they can take the exercise and put it into 'journal'
//add A.I. responsiveness where they can choose between size, strength, endurance
//A.I. would then be able to give estimated workout with weights and reps



// possible change for form submission
// function logSubmit(event) {
//     log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
//     event.preventDefault();
//   }

//   const form = document.getElementById('form');
//   const log = document.getElementById('log');
//   form.addEventListener('submit', logSubmit);

//Get Method for workout Log not pulling the right data
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

//hard-coded method to look at data for POST
// let data = {
//   reps: [1],
//   weight: [20],
//   date: ["wed"],
//   exercise: ["curl"],
//   workout: [1],
// };
// POST method having issues at this endpoint
// let newObj = {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Token " + "22cf1decb1a1c1f8492379d41682e3345b0dec74",
//     Origin: "",
//   },
//   body: JSON.stringify(data),
// };

//POST Route, also having issues possibly due to endpoint
// fetch(" https://wger.de/api/v2/workoutlog", newObj)
//   .then((res) => {
//     console.log(res);
//     res.json();
//   })
//   .then((data) => console.log("data: ", data));
