var userReps = document.querySelector("#stored-reps");
var userWeight = document.querySelector("#stored-weight");
var userSets = document.querySelector("#stored-sets");
var userExercise = document.querySelector("#stored-exercise");
var logDate = document.querySelector("#stored-date0");
var currentDateObj = moment().add(0, "days").format("MM-DD-YYYY");
var locations = {};
var APIKEY = "c40640150c1127abc9a3c2b1334f2b13";

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
	//var storedate = currentDateObj;
	userReps.textContent = storedReps;
	userWeight.textContent = storedWeight;
	userSets.textContent = storedSets;
	userExercise.textContent = storedExercise;
	logDate.textContent = currentDateObj;
	console.log(currentDateObj);
	// starting function to refactor log so it can take multiple exercises
	// 	function getAllItems()
	// {
	//     for (i = 0; i <= localStorage.length-1; i++)
	//     {
	//         key = sessionStorage.key(i);
	//         val = sessionStorage.getItem(key);
	//     }
	// }
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

//BMR Calculator

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var spanclose = document.getElementsByClassName("save")[0];

let info = [];

//example

const addInfo = (ev) => {
	ev.preventDefault(); // to stop the form submitting
	let user = {
		name: document.getElementById("Mname").value,
		email: document.getElementById("email").value,
		city: document.getElementById("location").value,
	};
	info.push(user);
	// document.forms[0].reset(); //to clear the form for the next entries

	//saving to local storage
	localStorage.setItem("UserList", JSON.stringify(info));
	console.log(user.city);

	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + user.city + "&units=imperial&appid=" + APIKEY;

	// make a get request to url
	var apiInfo = fetch(apiUrl)
		.then(function (response) {
			// request was successful
			if (response.ok) {
				response.json().then(function (data) {
					apiInfo = data;

					//captures icon code
					var icon = apiInfo.weather[0].icon;
					$("#currentLocation").html("<h2 class='center'>Weather forecast for " + user.city + "</h2>");
					$("#cityofinterest").html("<h3>" + currentDateObj + "</h3>");
					$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
					//displayRepos(data, user);

					//captures longitude and latitude
					var longitude = apiInfo.coord.lon;
					var latitude = apiInfo.coord.lat;

					var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKEY;

					$("#current-temp").html("<p>Temp: " + apiInfo.main.temp + " °F</p>");
					$("#current-wind").html("<p>Wind: " + apiInfo.wind.speed + " MPH</p>");
					$("#current-humid").html("<p>Humidity: " + apiInfo.main.humidity + "%</p>");

					if (apiInfo.main.temp >= 80) {
						$("#currentWeatherReccomendation").html(
							"<p>It's looking pretty hot out, make sure to stay hydrated and exercise indoors if possible.</p>"
						);
					}
					if (apiInfo.main.temp < 80 && apiInfo.main.temp >= 65) {
						$("#currentWeatherReccomendation").html("<p>Temperatures are looking good for an outdoor exercise.</p>");
					}
					if (apiInfo.main.temp < 65) {
						$("#currentWeatherReccomendation").html("<p>It's looking pretty cold out, Plan to dress warm and exercise indoors if possible.</p>");
					}

					var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + user.city + "&units=imperial&appid=" + APIKEY;

					// make a get request to url
					var forecastInfo = fetch(apiForecastUrl).then(function (response) {
						// request was successful
						if (response.ok) {
							response.json().then(function (data) {
								forecastInfo = data;

								//day 1
								//captures icon code

								var icon = forecastInfo.list[4].weather[0].icon;
								var date1 = moment().add(1, "days").format("MM-DD-YYYY");
								$("#date1").html("<h3>" + date1 + "</h3>");
								$("#icon-1").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#temp-1").html("<p>Temp: " + forecastInfo.list[4].main.temp + " °F</p>");
								$("#wind-1").html("<p>Wind: " + forecastInfo.list[4].wind.speed + " MPH</p>");
								$("#humid-1").html("<p>Humidity: " + forecastInfo.list[4].main.humidity + "%</p>");
								if (forecastInfo.list[4].main.temp >= 80) {
									$("#weatherReccomendation1").html(
										"<p>It's looking pretty hot out, make sure to stay hydrated and exercise indoors if possible.</p>"
									);
								}
								if (forecastInfo.list[4].main.temp < 80 && forecastInfo.list[4].main.temp >= 65) {
									$("#weatherReccomendation1").html("<p>Temperatures are looking good for an outdoor exercise.</p>");
								}
								if (forecastInfo.list[4].main.temp < 65) {
									$("#weatherReccomendation1").html("<p>It's looking pretty cold out, Plan to dress warm and exercise indoors if possible.</p>");
								}

								//day 2
								var date2 = moment().add(2, "days").format("MM-DD-YYYY");
								//captures icon code
								var icon = forecastInfo.list[12].weather[0].icon;
								$("#date2").html("<h3>" + date2 + "</h3>");
								$("#icon-2").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#temp-2").html("<p>Temp: " + forecastInfo.list[12].main.temp + " °F</p>");
								$("#wind-2").html("<p>Wind: " + forecastInfo.list[12].wind.speed + " MPH</p>");
								$("#humid-2").html("<p>Humidity: " + forecastInfo.list[12].main.humidity + "%</p>");
								if (forecastInfo.list[12].main.temp >= 80) {
									$("#weatherReccomendation2").html(
										"<p>It's looking pretty hot out, make sure to stay hydrated and exercise indoors if possible.</p>"
									);
								}
								if (forecastInfo.list[12].main.temp < 80 && forecastInfo.list[12].main.temp >= 65) {
									$("#weatherReccomendation2").html("<p>Temperatures are looking good for an outdoor exercise.</p>");
								}
								if (forecastInfo.list[12].main.temp < 65) {
									$("#weatherReccomendation2").html("<p>It's looking pretty cold out, Plan to dress warm and exercise indoors if possible.</p>");
								}

								$("#hiddencard1").removeClass();
								$("#hiddencard1").addClass("col s4 card center block cardcss");
								$("#hiddencard2").removeClass();
								$("#hiddencard2").addClass("col s4 card center block cardcss");

								$("#todaysWeather").addClass("col s4 card center block cardcss");
							});
						}
					});
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})

		//captures longitude and lattitude

		.catch(function (error) {
			alert("Unable to find location");
		});

	// formSubmitHandler();//weather generator
};

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("btn").addEventListener("click", addInfo);
});

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".modal");
	var instances = M.Modal.init(elems);
});

var userFormEl = document.querySelector("#user-form");
// var nameInputEl = document.querySelector("#username");
var currentDateObj = moment().format("(MM/DD/YYYY)");
var locations = {};
var APIKEY = "c40640150c1127abc9a3c2b1334f2b13";

// var saveTasks = function () {
// 	localStorage.setItem("locations", JSON.stringify(nameInputEl.value));
// };

var formSubmitHandler = function () {
	// prevent page from refreshing
	// event.preventDefault();

	var nameInputEl = localStorage.getItem("city");
	console.log(nameInputEl.value);
	// get value from input element
	var username = nameInputEl;

	if (username) {
		currentWeather(username);
		console.log(username);
		saveTasks(username.value);

		// clear old content
		//repoContainerEl.textContent = "";
		//nameInputEl.value = "";
	} else {
		alert("Please enter a GitHub username");
	}
};
