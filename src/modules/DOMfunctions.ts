import APIFunctions from "./APIFunctions";
import { format } from "date-fns";

export interface Data {
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
  base: string;
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

const DOMFunc = () => {
  const api = APIFunctions();

  const searchLoad = (() => {
    const input: HTMLInputElement = document.querySelector("#location");
    input.addEventListener("keypress", async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const data = (await api.getCurrDayData(
          api.createLocationUrl(input.value)
        )) as Data;
        renderPage(data, "celsius");
        input.value = "";
      }
    });
  })();

  const renderPage = (data: Data, metric: string) => {
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

  const onload = (async () => {
    const data = (await api.getCurrDayData(
      api.createLocationUrl("Golaghat")
    )) as Data;
    renderPage(data, "celsius");
  })();
};

export default DOMFunc;
