import { MapContainer, TileLayer, Marker, Tooltip, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Cidade } from "./mandate-sections";
import { MUNICIPIO_BOUNDARIES } from "./map-data";

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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {cidades.map((c) => {
        const boundary = MUNICIPIO_BOUNDARIES[c.id];
        const active = sel?.id === c.id;
        if (!boundary) return null;
        return (
          <GeoJSON
            key={`${c.id}-${active}`}
            data={boundary}
            eventHandlers={{ click: () => onSelect(c) }}
            style={{
              color: active ? "#D4AF37" : "#2F9E44",
              weight: active ? 3 : 2,
              fillColor: active ? "#D4AF37" : "#2F9E44",
              fillOpacity: active ? 0.25 : 0.1,
              opacity: 0.9,
            }}
          />
        );
      })}
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
