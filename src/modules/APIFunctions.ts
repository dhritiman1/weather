const APIFunc = () => {
  const getLocation = (): string => {
    const input = document.querySelector("#location");
    const location = input.ariaValueMax;
    if (location) {
      return location;
    }
    return "";
  };

  const createLocationUrl = (
    location: string,
    unit: string = "metric"
  ): string => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=8249207ed82958685fae1285bcc745c8`;
  };

  const createForecastUrl = (
    lon: number,
    lat: number,
    unit: string = "metric"
  ): string => {
    return `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=8249207ed82958685fae1285bcc745c8`;
  };

  const createLongLatUrl = (
    lon: number,
    lat: number,
    unit: string = "metric"
  ): string => {
    return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unit}&APPID=8249207ed82958685fae1285bcc745c8`;
  };

  const getData = async (url: string): Promise<object> => {
    const data = await fetch(url);
    if (data.status >= 200 && data.status <= 299) {
      const dataToJson = await data.json();
      return dataToJson;
    } else {
      console.log(data.status, data.statusText);
      return { status: 404 };
    }
  };

  return {
    getLocation,
    createLocationUrl,
    createLongLatUrl,
    createForecastUrl,
    getData,
  };
};

export default APIFunc;
