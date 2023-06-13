/* Code inspiriert von Vienna mobile Beispiel */

// Zentrum Karte Objekt
let eisenstadt = {
    lat: 47.845556,
    lng: 16.518889,
    title: "Eisenstadt, Burgenland"
}

// Karte initialisieren
let map = L.map("map").setView([
    eisenstadt.lat, eisenstadt.lng
], 7);


// Hintergrundlayer 
//!Können wir noch schauen, welche besser passen!
let layerControl = L.control.layers({
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.DE").addTo(map),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap"),
    "CycleTrails": L.tileLayer.provider("WaymarkedTrails.cycling"),
    /*"BasemapAT Grau": L.tileLayer.provider("BasemapAT.grau").addTo(map),
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "BasemapAT High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT Orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT Beschriftung": L.tileLayer.provider("BasemapAT.overlay")*/
}).addTo(map);

/*
// Marker Stephansdom
L.marker([
    stephansdom.lat, stephansdom.lng
]).addTo(map).bindPopup(stephansdom.title).openPopup();*/

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

/* Geolocation würd ich auf der Übersichtskarte weglassen, damit es wirklich nur eine Übersicht wird.
map.locate({
    setView: true,
    watch: true, 
    maxZoom: 16
});

let circle = L.circle([0, 0], 0).addTo(map);
let marker = L.marker([0, 0], 0).addTo(map);

map.on('locationfound', function onLocationFound(evt) {
    console.log(evt);
    let radius = Math.round(evt.accuracy);
    marker.setLatLng(evt.latlng);
    marker.bindTooltip(`You are within ${radius} meters from this point`).openTooltip();
    circle.setLatLng(evt.latlng);
    circle.setRadius(radius);
});

map.on('locationerror', function onLocationError(evt) {
    alert(evt.message);
});
*/