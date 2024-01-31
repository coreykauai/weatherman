const myUrlMarine =
  "http://api.weatherapi.com/v1/marine.json?key=a0456f4d5b2f4d4497244209242401&q=Kapaa&days=7";

const cityInput = document.getElementById("City");

cityInput.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = cityInput.elements;
  let newCity = input[0].value;
  let myUrl =
    "http://api.weatherapi.com/v1/forecast.json?key=a0456f4d5b2f4d4497244209242401&q=" +
    newCity +
    "&days=7&aqi=no&alerts=yes";
  console.log(input[0].value);

  fetch(myUrl, {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      let days = data.forecast.forecastday;
      renderAllForecasts(days);
    })
    .catch((error) => console.error("Error:", error));

  function renderAllForecasts(forecasts) {
    const CONTENT = document.querySelector(".content");
    CONTENT.innerHTML = "";
    forecasts.forEach((element) => {
      console.log(element.date, element.day.condition.text, element);
      let datess = new Date();
      let dateString = datess.toString().substring(0, 15);
      renderDailyForecast(
        dateString,
        element.day.condition.text,
        element.day.condition.icon,
        element.astro.moon_phase
      );
    });
  }

  function renderDailyForecast(dateStuff, conditionStuff, icon, moon_phase) {
    let dayDiv = document.createElement("div");
    let contDiv = document.createElement("div");
    let dates = document.createElement("p");
    let conditions = document.createElement("p");
    let moon = document.createElement("div");
    let img = document.createElement("img");
    img.src = icon;
    img.alt = conditionStuff;

    let content = document.querySelector(".content");

    img.classList.add("icon");
    dayDiv.classList.add("theDay");
    contDiv.classList.add("dishDiv");
    dates.classList.add("date");
    conditions.classList.add("condish");
    moon.classList.add("moon");

    dates.innerText = dateStuff + "  " + input[0].value + ":";
    conditions.innerText = conditionStuff;
    moon.innerHTML = "Moon Phase: " + moon_phase;

    content.append(dayDiv);
    dayDiv.append(dates, contDiv);
    contDiv.append(conditions, img, moon);
    img.append(icon);
  }
});

//async function fetchData(myUrl) {
//   try {
//     const response = await fetch(myUrl);
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log("Error", error);
//   }
// }
