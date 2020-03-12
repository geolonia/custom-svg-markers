import fs from "fs"

const map = new geolonia.Map(document.getElementById("map"));
const geojson =
  "https://raw.githubusercontent.com/wakayama-pref-org/road-regulation-information/master/JSON/Road-regulation-information.geojson";

(async () => {
  const resJson = await fetch(geojson);

  if (!resJson.ok) {
    console.log("Error: GeoJSON not found.");
    return;
  }

  const data = await resJson.json();

  const setMarker = feature => {
    const popup = new geolonia.Popup() // add popups
      .setText(feature.properties["名称"]);

    let options = {}
    if ("全面通行止" !== feature.properties["規制状況"]) {
      options = {color: '#F9BF3D'};
    }

    new geolonia.Marker(options)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(popup)
      .addTo(map);
  };

  data.features.forEach(feature => {
    setMarker(feature);
  });
})();
