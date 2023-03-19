import APIFunctions from "./APIFunctions";
import { format } from "date-fns";

export interface Data {
  status: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  name: string;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

interface ForecastData {
  cod: number;
}

const DOMFunc = () => {
  const api = APIFunctions();

  const searchLoad = (() => {
    const input: HTMLInputElement = document.querySelector("#location");
    input.addEventListener("keypress", async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        getDataAndRender(input.value.trim());
        input.value = "";
        e.preventDefault();
      }
    });
  })();

  const renderPage = (data: Data, unit: string) => {
    const date = document.querySelector(".date");
    const location = document.querySelector(".location");
    const weather = document.querySelector(".weather");
    const temperature = document.querySelector(".temperature");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");

    const dateinfo: Array<String> = format(new Date(), `EEEE dd MMM yy`).split(
      " "
    );

    date.textContent = `${dateinfo[1]}${dateinfo[2]}\'${dateinfo[3]}`;
    location.textContent = data.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    temperature.textContent = `${data.main.temp.toString()}°`;
    weather.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity.toString()}`;
    wind.textContent = `${Math.round(data.wind.speed * 36) / 10}`;
    console.log(data);
  };

  const renderForecast = async (data: ForecastData, unit: string) => {
    console.log(data);
  };

  const getDataAndRender = async (location: string) => {
    const data = (await api.getData(
      api.createLocationUrl(`${location}`)
    )) as Data;

    if (data.status !== 404) {
      renderPage(data, "metric");
      closeError();
    } else {
      console.log("error occurred");
      openError();
    }
  };

  const closeError = () => {
    const error = document.querySelector(".error404");
    if (!error.classList.contains("hidden")) {
      error.classList.toggle("hidden");
    }
    const container = document.querySelector(".container");
    if (container.classList.contains("hidden")) {
      container.classList.toggle("hidden");
    }
  };

  const openError = () => {
    const error = document.querySelector(".error404");
    if (error.classList.contains("hidden")) {
      error.classList.toggle("hidden");
    }
    const container = document.querySelector(".container");
    if (!container.classList.contains("hidden")) {
      container.classList.toggle("hidden");
    }
  };

  const onload = (async () => {
    getDataAndRender("Golaghat");
    closeError();
  })();
};

export default DOMFunc;
