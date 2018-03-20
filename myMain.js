"use strict";
function pointToCircle(feature,latlng) {
    var fillColorVar = "";

    if (Number(feature.properties["ndeath"])>=0 && Number(feature.properties["ndeath"])<5){
      fillColorVar = "blue"}
    }
var myFunctionHolder ={};

    //declaring function 1
    myFunctionHolder.addPopups = function (feature, layer) {
      if (feature.properties && feature.properties.startdate) {
        layer.bindPopup(feature.properties.startdate);
      }
    }

    //declaring function 2
    myFunctionHolder.pointToCircle = function (feature, latlng) {
      var geojsonMarkerOptions = {
        radius: 8,
        fillColor: fillColorVar,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
      return circleMarker;
    }
    //execute only when window is fully loaded
    window.onload = function () {

    var mapObject = L.map('mapDivId').setView([3.090739, 17.404454], 4);
    var baseMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiMTIzODIiLCJhIjoiY2pjaTRscWllMmV0ZTMzbnptZXppczA1MCJ9.DbUREsZcMMNHEBwqytnWnA', {
      maxZoom: 18,
      attribution: "&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }).addTo(mapObject);
    var cfg = {
      "radius": 0.005,
      "maxOpacity": .8,
      "scaleRadius": true,
      "uselocalExtrema": true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'value'
    };
    var heatmapLayer= new HeatmapOverlay(cfg);
    heatmapLayer.setData(theftsHeatMapData);
    mapObject.addLayer(heatmapLayer);
 
    var violenceLayer = L.geoJSON(Violence, {
      onEachFeature: myFunctionHolder.addPopups,
      pointToLayer: myFunctionHolder.pointToCircle
    });

    mapObject.addLayer(violenceLayer);
    // bikeThefts is the variable name we difined in Bike_Thefts_2011.js file. 
    //var bikesLayerGroup = L.geoJSON(bikeThefts, {
    //  onEachFeature: myFunctionHolder.addPopups,
    //  pointToLayer: myFunctionHolder.pointToCircle
    //});

    //mapObject.addLayer(bikesLayerGroup);
    //mapObject.fitBounds(bikesLayerGroup.getBounds());
};
