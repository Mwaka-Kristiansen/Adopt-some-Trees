import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "../../assets/style/Map.css";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGVreXJleSIsImEiOiJja3NieGJqMHYwYmFoMndwZmN1b3l1N3g2In0.n0e_g3FQlcLUiuiwnDL9fw";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/tekyrey/clpsk2qjk018g01pa0g0nhbfu",
      center: [36.8219, 1.2921], // Nairobi, Kenya
      zoom: 7,
    });

    // Add zoom controls
    map.addControl(new mapboxgl.NavigationControl(), "top-left");

    // Add geocoder control for search
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for a location",
      marker: false,
      countries: "KE",
      bbox: [33.501, -4.04, 41.899, 5.62], // Boundary for Kenya
    });

    // Ensure the geocoder control is added to the map
    map.addControl(geocoder, "top-right");

    // Add a simple marker for demonstration
    new mapboxgl.Marker().setLngLat([36.8219, 1.2921]).addTo(map);

    map.on("click", async function (e) {
      // Check if the click event occurred within the boundaries of Kenya
      if (
        e.lngLat.lng < 33.501 ||
        e.lngLat.lng > 41.899 ||
        e.lngLat.lat < -4.04 ||
        e.lngLat.lat > 5.62
      ) {
        return;
      }

      const features = map.queryRenderedFeatures(e.point, {
        layers: ["ke_forests_deqcbs"],
      });

      const coordinates = e.lngLat.toArray();

      if (features.length === 0) {
        setClickedCoordinates(clickedCoordinates);

        const popup = new mapboxgl.Popup();
        popup
          .setLngLat([coordinates[0], coordinates[1]])
          .setHTML(
            `<div>
              <p>Plant a tree here!</p>
              <button 
                id="buyTreeBtn"
                style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;"
              >Buy Tree</button>
            </div>`
          )
          .addTo(map);

        // Handle click event for the "Buy Tree" button
        document.getElementById("buyTreeBtn")?.addEventListener("click", () => {
          // Redirect to another page using navigate with query parameters
          navigate(`/buy-a-tree?xlat=${coordinates[1]}&ylon=${coordinates[0]}`);
        });
      }
    });


    // Cleanup on unmount
    return () => map.remove();
  }, [navigate, clickedCoordinates]);

  return <div id="map"></div>;
};

export default Map;
