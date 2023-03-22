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

const DOMFunc = () => {
  const api = APIFunctions();
  let _location: string = "";
  let _metric: boolean = true;

  const searchLoad = (() => {
    const input: HTMLInputElement = document.querySelector("#location");
    input.addEventListener("keypress", async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        getDataAndRender(input.value.trim(), _metric ? "metric" : "imperial");
        input.value = "";
        e.preventDefault();
      }
    });
  })();

  const renderPage = (data: Data) => {
    const date = document.querySelector(".date");
    const location = document.querySelector(".location");
    const weather = document.querySelector(".weather");
    const temperature = document.querySelector(".temperature");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");
    const speed = document.querySelector(".speed");

    const dateinfo: Array<String> = format(new Date(), `EEEE dd MMM yy`).split(
      " "
    );

    _location = data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    date.textContent = `${dateinfo[1]}${dateinfo[2]}\'${dateinfo[3]}`;
    location.textContent = _location;
    temperature.textContent = `${data.main.temp.toString()}°`;
    weather.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity.toString()}`;
    if (_metric) {
      wind.textContent = `${Math.round(data.wind.speed * 36) / 10}`;
      speed.textContent = "km/h";
    } else if (!_metric) {
      wind.textContent = `${Math.round(data.wind.speed * 10) / 10}`;
      speed.textContent = "mph";
    }

    console.log(data);
  };

  const getData = async (location: string, unit: string) => {
    const data = (await api.getData(
      api.createLocationUrl(location, unit)
    )) as Data;

    return data;
  };

  const getDataAndRender = async (
    location: string,
    unit: string = "metric"
  ) => {
    const data = await getData(location, unit);
    if (data.status !== 404) {
      renderPage(data);
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

  const toggle = (active: Element, inactive: Element) => {
    if (!active.classList.contains("underline")) {
      active.classList.toggle("underline");
      active.classList.toggle("opacity-70");

      inactive.classList.toggle("underline");
      inactive.classList.toggle("opacity-70");
    }
  };

  const switchUnits = (() => {
    const cel = document.querySelector(".cel");
    const fah = document.querySelector(".fahren");

    cel.addEventListener("click", async () => {
      toggle(cel, fah);
      _metric = true;
      const data = await getData(_location, "metric");
      renderPage(data);
      console.log("cel activated");
    });

    fah.addEventListener("click", async () => {
      toggle(fah, cel);
      _metric = false;
      const data = await getData(_location, "imperial");
      renderPage(data);
      console.log("fah activated");
    });
  })();

  const onload = (async () => {
    getDataAndRender("Golaghat");
    closeError();
  })();
};

export default DOMFunc;
