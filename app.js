import svgFile from './marker.svg'

const map = new geolonia.Map(document.getElementById("map"));
const geojson =
  "https://raw.githubusercontent.com/wakayama-pref-org/road-regulation-information/master/JSON/Road-regulation-information.geojson";

(async () => {
  const res = await fetch(svgFile);

  if (!res.ok) {
    console.log("Error: SVG file not found.");
    return;
  }

  const svg = await res.text();

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

    new geolonia.Marker(marker, { offset: [0, 0] })
      .setLngLat(feature.geometry.coordinates)
      .setPopup(popup)
      .addTo(map);
  };

  data.features.forEach(feature => {
    setMarker(feature);
  });
})();
