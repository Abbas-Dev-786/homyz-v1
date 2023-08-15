import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapBox = ({ location, zoomLevel }) => {
  return (
    <MapContainer
      center={location.coords}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location.coords}>
        <Popup>{location.address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapBox;
