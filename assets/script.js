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
    const payload = {
        username: "test",
        password: "workout",
        workout: "workout input"
    }
    const result = await
    fetch('api/workout', {method: 'POST', body: JSON.stringify(payload)});
    const data = result.json();
    return data
}
document.querySelector('#submit').addEventListener('click', () => {postWorkout();
})

//  <script>
var obj = {
    method: "GET",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + "22cf1decb1a1c1f8492379d41682e3345b0dec74",
        Origin: "",
    },
};
fetch(" https://wger.de/api/v2/workoutlog", obj)
    .then((res) => res.json())
    .then((data) => console.log("Data: ", data));

fetch(" https://wger.de/api/v2/schedule", obj)
    .then((res) => res.json())
    .then((data) => console.log("Data: ", data));

    /* </script> */
    