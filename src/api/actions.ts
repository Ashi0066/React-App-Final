import axios, { AxiosError } from "axios";

const API_URL = "https://shiny-sniffle-5jv5xq6w546f79q6-3000.app.github.dev/api";

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  return new Promise<WeatherData>((resolve, reject) => {
    axios
      .get(`${API_URL}/weather/${city}`)
      .then((res) => {
        resolve({
          city: city,
          temperature: res.data.temperature,
          humidity: res.data.humidity,
          wind: res.data.wind,
          rain: res.data.rain,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
export const getSeismiccData = async (city: string): Promise<SeismicData> => {
  return new Promise<SeismicData>((resolve, reject) => {
    axios
      .get(`${API_URL}/seismic/${city}`)
      .then((res) => {
        resolve({
          city: city,
          latitude:res.data.latitude,
          longitude: res.data.longitude,
          depth: res.data.depth,
          magnitude: res.data.magnitude,
          eventType: res.data.eventType, // Type of seismic event (e.g., earthquake, explosion)
       
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
