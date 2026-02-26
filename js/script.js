let dataList = {};
function getItem(city = "Cairo") {
  if (city.length == 0) return getItem();
  if (city.length < 3) return;
  let http = new XMLHttpRequest();
  http.open(
    "get",
    `https://api.weatherapi.com/v1/forecast.json?key=d1041b32a2424c6a9eb140631250307&q=${city}&days=3`
  );
  http.send();
  http.responseType = "json";
  http.addEventListener("load", function () {
    if (http.status >= 200 && http.status < 300) {
      dataList = http.response;
      console.log(dataList);
      displayWeather(dataList.forecast.forecastday);
    }
  });
}
let pato = document.querySelector(".pato");

//////////////////////////////////DISPLAY Cards
function displayWeather(arr) {
  console.log(arr);
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    const { weekday, day, month } = getDate(arr[i].date);
    console.log(weekday, day, month);
    cartona += `
  <div class="col-md-4">
            <div class="card-special ">
              <div class="uppery d-flex justify-content-between">
              ${
                i == 0
                  ? `<span>${weekday}</span> <span>${day}${month}</span>`
                  : `<span class="mx-auto">${weekday}</span>`
              }
                
              </div>

              <div class="content px-3 py-4 text-start ${
                i !== 0 ? "text-center" : ""
              }">
              ${
                i == 0
                  ? ` <p class="text-capitalize fs-4 mb-0">${dataList.location.name}</p>`
                  : ``
              }
               ${
                 i == 0
                   ? `
                 <h1 class="text-white">${dataList.current.temp_c}<sup>o</sup>C</h1>
                <div class="icon">
                  <img src=${dataList.current.condition.icon} alt="${dataList.current.condition.text}"/>
                </div>
                `
                   : `<img src=${dataList.forecast.forecastday[i].day.condition.icon} alt=${dataList.forecast.forecastday[i].day.condition.text}/>
                <p class="fs-3 fw-bolder text-white text-center">${dataList.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</p>
                <p class="fw-bolder text-white fs-5 text-center">${dataList.forecast.forecastday[i].day.mintemp_c}<sup>o</sup></p>
                `
               }



                <p class="text-capitalize mb-3 pato">
                ${
                  i === 0
                    ? `${dataList.current.condition.text}`
                    : `${dataList.forecast.forecastday[i].day.condition.text}`
                }</p>

                <div class="icon-fix d-flex justify-content-around">
                  ${
                    i === 0
                      ? `<div class="icont me-3">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>${dataList.forecast.forecastday[0].day.daily_will_it_rain}%</span>
                  </div>

                  <div class="icont me-3">
                    <i class="fa-solid fa-wind"></i>
                    <span>${dataList.current.wind_kph}km/h</span>
                  </div>

                  <div class="icont me-3">
                    <i class="fa-solid fa-compass"></i>
                    <span>${dataList.current.wind_dir}</span>
                  </div>`
                      : ``
                  }
                </div>
              </div>
            </div>
          </div>`;
  }
  document.querySelector("header .row").innerHTML = cartona;
}

/////////////////////////////GetDate
function getDate(x) {
  const date = new Date(x);
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.toLocaleString("en-US", {
    day: "numeric",
  });
  const month = date.toLocaleString("en-US", {
    month: "long",
  });
  return { weekday, day, month };
}

////////////////////////// input search
let inputSearch = document.querySelector(".search");
inputSearch.addEventListener("input", function (e) {
  let text = e.target.value;
  getItem(text);
});

//////////////////////////////GET LOCATION
window.navigator.geolocation.getCurrentPosition(
  function (success) {
    getItem(`${success.coords.latitude},${success.coords.longitude}`);
  },
  function () {
    getItem();
  }
);
