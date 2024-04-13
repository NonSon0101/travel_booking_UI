import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { Box } from "@chakra-ui/react";

interface IMaps {
  coordinates: [number, number];
}

const Maps = (props: IMaps) => {
  const { coordinates } = props;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const ThuDuc =
    coordinates && coordinates.length >= 2
      ? { lat: coordinates[1], lng: coordinates[0] }
      : { lat: 0, lng: 0 };
  console.log(ThuDuc);
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "PAckuW1Q20LwrRJCIs0n";

  useEffect(() => {
    if (
      !mapContainer.current ||
      map.current ||
      (ThuDuc.lng === 0 && ThuDuc.lat === 0)
    )
      return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.SATELLITE,
      center: [ThuDuc.lng, ThuDuc.lat],
      zoom: zoom,
    });
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([ThuDuc.lng, ThuDuc.lat])
      .addTo(map.current);
  }, [ThuDuc.lng, ThuDuc.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Maps;
