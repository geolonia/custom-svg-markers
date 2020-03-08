import fs from "fs"

const map = new geolonia.Map(document.getElementById("map"));
const geojson =
  "https://raw.githubusercontent.com/wakayama-pref-org/road-regulation-information/master/JSON/Road-regulation-information.geojson";
const svg = fs.readFileSync(__dirname + "/marker.svg", "utf8");

(async () => {
  const resJson = await fetch(geojson);

  if (!resJson.ok) {
    console.log("Error: GeoJSON not found.");
    return;
  }

  const data = await resJson.json();

  const setMarker = feature => {
    const marker = document.createElement("div");
    marker.className = "svg-marker";
    marker.innerHTML = svg;

    const popup = new geolonia.Popup() // add popups
      .setText(feature.properties["名称"]);

    const circle = marker.querySelector(".circle");

    if ("全面通行止" !== feature.properties["規制状況"]) {
      circle.style.fill = "#999999";
    }

    new geolonia.Marker({element: marker, offset: [0, 0] })
      .setLngLat(feature.geometry.coordinates)
      .setPopup(popup)
      .addTo(map);
  };

  data.features.forEach(feature => {
    setMarker(feature);
  });
})();
