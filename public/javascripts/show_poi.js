//Leaflet
var map = L.map('map').setView([51.96, 7.62], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
