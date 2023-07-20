const mapBox = document.getElementById("map");

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWRpdHlhMTMwOSIsImEiOiJjbGsya3M2ODgwM2psM2p0YXBjZWVwcDZhIn0.qh8XMmOhcwrI289aqKiH7g";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/aditya1309/clk2l9zaj00eh01pdghrj858i",
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
}
