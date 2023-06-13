/* Code von Vienna mobile Beispiel */

// Zentrum Karte Objekt
let stpolten = {
    lat: 48.18735,
    lng: 15.64139,
    title: "St. Pölten, Niederösterreich"
}

// Karte initialisieren und Fullscreen Control 
let map = L.map("map", {
    fullscreenControl: true
}).setView([
    stpolten.lat, stpolten.lng
], 7.5);

// Hintergrundlayer 
//!Können wir noch schauen, welche besser passen!
let layerControl = L.control.layers({
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.DE").addTo(map),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap"),
    "CycleTrails": L.tileLayer.provider("CyclOSM"),
}).addTo(map);

// Marker Hauptstädte
const STAEDTE = [
    {
        title: "St. Pölten, Niederösterreich",
        lat: 48.18735,
        lng: 15.64139,
        wikipedia: "https://de.wikipedia.org/wiki/St._P%C3%B6lten"
    },
    {
        title: "Wien, Wien",
        lat: 48.208174,
        lng: 16.373819,
        wikipedia: "https://de.wikipedia.org/wiki/Wien"
    },
    {
        title: "Eisenstadt, Burgenland",
        lat: 47.845556,
        lng: 16.518889,
        wikipedia: "https://de.wikipedia.org/wiki/Eisenstadt"
    },
]

for (let stadt of STAEDTE) {
    //Marker für den Stopp
    let marker = L.marker([stadt.lat, stadt.lng])
        .addTo(map)
        .bindPopup(`${stadt.title} <br>
    <a href="${stop.wikipedia}">Wikipedia</a>
    `)
    };

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