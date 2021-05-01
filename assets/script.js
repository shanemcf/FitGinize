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
console.log(postWorkout);

document.querySelector('#submit').addEventListener('click', () => {postWorkout();

    // document.querySelector('#submit').addEventListener('click', postWorkout)

    // possible change for form submission
    // function logSubmit(event) {
    //     log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    //     event.preventDefault();
    //   }
      
    //   const form = document.getElementById('form');
    //   const log = document.getElementById('log');
    //   form.addEventListener('submit', logSubmit);
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
    

    //practice for drop-down list of excersizes

    // async function getEx() {
    //     let url = 'https://wger.de/api/v2/exercise/?format=json'
    //     const array = [];
  
    //     while (url) {
    //       const res = await fetch(url)
    //       data = await res.json()
    //       for (const item of data.results) {
    //           console.log(item.name)
    //           array.push(item.name);
    //       }
    //       url = data.next
    //   }
    //   return array;
    //   }
    //   $(function() {
    //     let tags = [];
    //     getEx().then(res => {
    //       $( "#tags" ).autocomplete({
    //       source: res
    //     });
    //     });
    //   } );