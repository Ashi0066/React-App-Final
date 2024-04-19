import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { GiEarthCrack, GiGooExplosion } from "react-icons/gi";

import { getWeatherData,getSeismiccData } from "../api/actions";

const WeatherCard: React.FC = () => {
  const [data, setData] = useState<WeatherData>();
  const [SeismicData, setSeismicData] = useState<SeismicData>();
 
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("weather"); 

  const handleSearch = () => {
    setLoadingState(true);
    setError("");

    if (activeTab === "weather") {
      getWeatherData(city)
        .then((res) => {
          if (res) {
            setData(res);
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoadingState(false);
        });
    } else if (activeTab === "seismic") {
      // Similar logic for fetching seismic data
      getSeismiccData(city)
        .then((res) => {
          if (res) {
            setSeismicData(res);
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoadingState(false);
        });
    }
  };

  return (
    <Card  className="max-w-[100%] h-[640px]">
      <CardHeader className="flex flex-col justify-center items-center h-[40%] ">
      <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col w-full max-w-[400px] space-y-4"
        >
        <div className="flex gap-10">
          <Button
            color={activeTab === "weather" ? "primary" : "default"}
            onClick={() => setActiveTab("weather")}
            className="flex-grow-1"
          >
            Weather
          </Button>
          <Button
            color={activeTab === "seismic" ? "primary" : "default"}
            onClick={() => setActiveTab("seismic")}
          >
            Seismic
          </Button>
        </div>
       
        
            <Input
              id="cityname"
              type="text"
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          
        </form>
      </CardHeader>
      <Divider />
      {activeTab === "weather" && (
        <CardBody>
          {data ? (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold">{data.city}</h1>
              {data.temperature > 20 ? (
                <TiWeatherSunny className="w-36 h-36" />
              ) : (
                <TiWeatherDownpour className="w-36 h-36" />
              )}
              <p className="text-3xl font-bold">{data.temperature}°C</p>
              <p className="text-lg">Humidity: {data.humidity}%</p>
              <p className="text-lg">Wind: {data.wind} km/h</p>
              <p className="text-lg">Rain: {data.rain} %</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">Please enter a city</p>
            </div>
          )}
        </CardBody>
      )}
      {activeTab === "seismic" && (
        <CardBody>
          {SeismicData ? (
            
            <div className="flex flex-col items-center">
              {SeismicData.eventType === "earthquake"?(
                <GiEarthCrack className="w-36 h-36"/>
              ):(<GiGooExplosion className="w-36 h-36"/>)}
              
              <p>Latitude: {SeismicData.latitude}</p>
              <p>Longitude: {SeismicData.longitude}</p>
              <p>Depth: {SeismicData.depth} km</p>
              <p>Magnitude: {SeismicData.magnitude}</p>
              <p>Event Type: {SeismicData.eventType}</p>
              <p>Date: {new Date(SeismicData.date).toLocaleDateString()}</p>
              

            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">Please enter a city</p>
            </div>
          )}
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {(data || SeismicData) && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!(data || SeismicData) && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card >
  );
};

export default WeatherCard;