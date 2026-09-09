import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const zones = [
  {
    id: "Z101",
    name: "Zone Z101",
    lat: 26.2,
    lng: 91.7,
    risk: 82,
    level: "HIGH",
  },
  {
    id: "Z102",
    name: "Zone Z102",
    lat: 26.5,
    lng: 91.9,
    risk: 91,
    level: "CRITICAL",
  },
  {
    id: "Z103",
    name: "Zone Z103",
    lat: 25.9,
    lng: 92.1,
    risk: 56,
    level: "MODERATE",
  },
  {
    id: "Z104",
    name: "Zone Z104",
    lat: 27.0,
    lng: 92.4,
    risk: 31,
    level: "LOW",
  },
];

function getRiskColor(level) {
  switch (level) {
    case "CRITICAL":
      return "#dc2626";

    case "HIGH":
      return "#f97316";

    case "MODERATE":
      return "#eab308";

    case "LOW":
      return "#84cc16";

    default:
      return "#22c55e";
  }
}

function RiskMap() {
  return (
    <MapContainer
      center={[26.4, 92.0]}
      zoom={6}
      className="h-full w-full"
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {zones.map((zone) => (

        <CircleMarker
          key={zone.id}
          center={[zone.lat, zone.lng]}
          radius={12}
          pathOptions={{
            color: getRiskColor(zone.level),
            fillColor: getRiskColor(zone.level),
            fillOpacity: 0.7,
          }}
        >

          <Popup>

            <div className="text-sm">

              <strong>
                {zone.name}
              </strong>

              <br />

              Risk Score:
              {" "}
              <strong>{zone.risk}/100</strong>

              <br />

              Risk Level:
              {" "}
              <strong>{zone.level}</strong>

            </div>

          </Popup>

        </CircleMarker>

      ))}

    </MapContainer>
  );
}

export default RiskMap;