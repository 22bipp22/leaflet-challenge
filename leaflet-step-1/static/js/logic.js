// define our map!!!
let myMap = L.map("map", {
    center: [37.09, -100.71],
    zoom: 4
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
    console.log(response.features);
    features = response.features;
    
    let heatArray = [];
    for (let i = 0; i < features.length; i++) {
        let location = features[i].geometry;
        let properties = features[i].properties;
        
    
        let color = "";
        if (location.coordinates[2] > 100) {
            color = "red";
        }
        else if (location.coordinates[2] > 50) {
            color = 'orange';
        }
        else if (location.coordinates[2] > 20) {
            color = "yellow";
        }
        else if (location.coordinates[2] > 10) {
            color = "green";
        }
        else {
            color = "yellowgreen";
        }
        

        L.circle([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.95,
            color: "black",
            fillColor: color,
            // adjust radius
            radius: properties.mag * 20000
            }).bindPopup("<h2>" + properties.place + "</h2> <hr> <h3> " + "Magnitude: " + properties.mag + "</h3> <hr> <h3> Depth: " + location.coordinates[2] + "</h3>").addTo(myMap);
            
        
    }

   
});