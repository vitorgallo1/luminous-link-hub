import campos from "./campos.json";
import itaborai from "./itaborai.json";
import miracema from "./miracema.json";
import niguacu from "./niguacu.json";
import paty from "./paty.json";
import porciuncula from "./porciuncula.json";
import quissama from "./quissama.json";
import rj from "./rj.json";
import sfi from "./sfi.json";
import sjb from "./sjb.json";

type GeoJsonGeometry = GeoJSON.Polygon | GeoJSON.MultiPolygon;

function firstGeometry(featureCollection: {
  features: { geometry: { type: string; coordinates: unknown } }[];
}): GeoJsonGeometry {
  return featureCollection.features[0].geometry as GeoJsonGeometry;
}

export const MUNICIPIO_BOUNDARIES: Record<string, GeoJsonGeometry> = {
  sjb: firstGeometry(sjb),
  campos: firstGeometry(campos),
  sfi: firstGeometry(sfi),
  paty: firstGeometry(paty),
  quissama: firstGeometry(quissama),
  itaborai: firstGeometry(itaborai),
  miracema: firstGeometry(miracema),
  porciuncula: firstGeometry(porciuncula),
  niguacu: firstGeometry(niguacu),
  rj: firstGeometry(rj),
};
