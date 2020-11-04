// define our map!!!
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// copy pasta of the tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(queryUrl, function(response) {
    // console.log(response);
    // console.log(response.features);
    features = response.features;
    
    let heatArray = [];
    for (let i = 0; i < features.length; i++) {
        let location = features[i].geometry;
        if (location) {
            // console.log(location.coordinates[0])
            heatArray.push([location.coordinates[1], location.coordinates[0]])
        }
    }

    console.log(heatArray)

    let heat = L.heatLayer(heatArray, {
        radius: 50,
        blur: 15
    }).addTo(myMap);
});