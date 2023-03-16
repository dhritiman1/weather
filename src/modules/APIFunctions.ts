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
    lon: string,
    lat: string,
    unit: string = "metric"
  ) => {
    return `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=8249207ed82958685fae1285bcc745c8`;
  };

  const createLongLatUrl = (
    lon: number,
    lat: number,
    unit: string = "metric"
  ): string => {
    return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=8249207ed82958685fae1285bcc745c8`;
  };

  const getCurrDayData = async (url: string) => {
    const data = await fetch(url, { mode: "cors" });
    const dataToJson: object = await data.json();
    return dataToJson;
  };

  return {
    getLocation,
    createLocationUrl,
    createLongLatUrl,
    createForecastUrl,
    getCurrDayData,
  };
};

export default APIFunc;
