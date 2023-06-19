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

//thematische Layer
let themaLayer = {
    burgenland : L.featureGroup(),
    niederoesterreich : L.featureGroup(),
    wien : L.featureGroup()
}

// Hintergrundlayer 
//!Können wir noch schauen, welche besser passen!
let layerControl = L.control.layers({
    "Terrain": L.tileLayer.provider("Stamen.Terrain").addTo(map),
    "StamenB/W": L.tileLayer.provider("Stamen.TonerLite"),
    "BasemapÖsterreich": L.tileLayer.provider("BasemapAT.grau"),
    "CycleTrails": L.tileLayer.provider("CyclOSM"),
},
{
    "Radrouten Burgenland" : themaLayer.burgenland,
    "Radrouten Niederösterreich" : themaLayer.niederoesterreich,
    "Radrouten Wien" : themaLayer.wien
}).addTo(map);
// Layer beim Besuch auf der Seite ausklappen
layerControl.expand();

// Burgenland Radwege Layer
function writeBurgenlandLayer(jsondata) {
    L.geoJSON(jsondata, {
        filter: function(feature) {
            if (feature.properties.LT > -50 && feature.properties.LT < 50) {
                return true;
            }
        },
        pointToLayer: function (feature, latlng) {
            let color = getColor(feature.properties.LT, COLORS.temperature);
            return L.marker(latlng, {
                icon: L.divIcon({
                    className: "aws-div-icon",
                    html: `<span style="background-color: ${color}">${feature.properties.LT.toFixed(1)}</span>`
                })
            });
        },        
    }).addTo(themaLayer.temperature);
}

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
    let marker = L.marker([stadt.lat, stadt.lng])
        .addTo(map)
        .bindPopup(`${stadt.title} <br>
    <a href="${stop.wikipedia}">Wikipedia</a>
    `)
    };

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);



/* Pulldownmenü Code
//Pulldown für Navigation
let pulldown = document.querySelector("#pulldown");
for (let etappe of ETAPPEN) {
    //console.log(etappe);
    let status = "";
    if (etappe.nr == "20") {
        status = "selected";
    }
    pulldown.innerHTML += `<option ${status} value="${etappe.user}">Etappe ${etappe.nr}: ${etappe.etappe}</option>`
}

// auf Änderungen im Pulldown reagieren
pulldown.onchange = function(evt) {
    //console.log(pulldown.value);
    let url = `https://${pulldown.value}.github.io/biketirol`;
    //console.log(url);
    window.location.href = url;
}
*/

