// Store our API endpoint as queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function createPopups(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place + "</h3> <hr> <p>" + new Date(feature.properties.time) + "</p>");
// }
// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//   console.log(data.features);



// Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
    // let earthquakeLayer = L.geoJSON(data.features, {
    //     onEachFeature: createPopups
    // });

let myMap = L.map("map", {
    center: [
    37.09, -95.71
    ],
    zoom: 5,
    // layers: [streetmap, heat]
})
// define tile layers to chooes from
let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

    // let darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    //     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    //     tileSize: 512,
    //     maxZoom: 18,
    //     zoomOffset: -1,
    //     id: "mapbox/dark-v10",
    //     accessToken: API_KEY
    // });

    // let baseMaps = {
    //     Dark: darkmap,
    //     Light: streetmap
    // }

    // let overlayMap = {
    //     Earthquakes: earthquakeLayer
    // }

    unction createPopups(feature, layer) {
        //     layer.bindPopup("<h3>" + feature.properties.place + "</h3> <hr> <p>" + new Date(feature.properties.time) + "</p>");
        // }
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data.features);

    // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
    let earthquakeLayer = L.geoJSON(data.features, {
        onEachFeature: createHeatMap
    });

    function createHeatMap(feature, layer) {
        let heatArray = [];
        for (let i = 0; i < feature.length; i++) {
            let feature = data[i].features;
            console.log(feature)
            if (feature) {
                heatArray.push([feature.geometry.coordinates[0], location.coordinates[1]])
            }
        }
  
    let heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(myMap);
    }
    

    

    // L.control.layers(baseMaps, overlayMap).addTo(myMap)
    // L.control.layers(baseMaps, heat).addTo(myMap)
});

