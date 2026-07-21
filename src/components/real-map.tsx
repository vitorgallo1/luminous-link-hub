import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Cidade } from "./mandate-sections";

function pinIcon(active: boolean) {
  const color = active ? "#D4AF37" : "#2F9E44";
  const size = active ? 22 : 16;
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;
      width:${size}px;
      height:${size}px;
      border-radius:9999px;
      background:${color};
      border:2px solid white;
      box-shadow:0 0 0 4px ${color}33;
    "></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function RealMap({
  cidades,
  sel,
  onSelect,
}: {
  cidades: Cidade[];
  sel: Cidade | null;
  onSelect: (c: Cidade) => void;
}) {
  return (
    <MapContainer
      center={[-22.1, -42.4]}
      zoom={8}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#e5e7eb" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cidades.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lng]}
          icon={pinIcon(sel?.id === c.id)}
          eventHandlers={{ click: () => onSelect(c) }}
        >
          <Tooltip direction="top" offset={[0, -10]}>
            {c.nome}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
