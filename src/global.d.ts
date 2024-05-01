interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
}
interface SeismicData {
  city:String;
  latitude: number; // Latitude of the seismic data
  longitude: number; // Longitude of the seismic data
  depth: number; // Depth of the seismic event (in kilometers)
  magnitude: number; // Magnitude of the seismic data
  eventType: string; // Type of seismic event (e.g., earthquake, explosion)

}

