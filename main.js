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
], 7);

//thematische Layer
let themaLayer = {
    burgenland: L.featureGroup(),
    niederoesterreich: L.featureGroup(),
    wien: L.featureGroup()
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
        "Radrouten Burgenland": themaLayer.burgenland.addTo(map),
        "Radrouten Niederösterreich": themaLayer.niederoesterreich,
        "Radrouten Wien": themaLayer.wien
    }).addTo(map);

// Layer beim Besuch auf der Seite ausklappen
layerControl.expand();

// Burgenland Radwege Layer (von Vienna Sightseeing Linien)
async function burgenlandRadwege(url) {
    let response = await fetch(url);
    let jsondata = await response.json();
    let einzelneRouten = {};
    let routenFarben = { //Rottöne von https://www.color-meanings.com/shades-of-red-color-names-html-hex-rgb-codes/
        "Festival-Radweg": "#8D021F", //Burgundy 
        "Iron Curtain Trail - Gesamtroute": "#CD5C5C", //Indian Red
        "Paradiesroute": "#7C0A02", //Barn Red
        "R1 Jubiläumsradweg": "#E0115F", //Ruby
        "B32 Rosalia-Radwanderweg": "#FF0800", //Candy Apple
    } 
    //console.log(response, jsondata);
    L.geoJSON(jsondata, {
        style: function (feature) {
            return {
                color: routenFarben[feature.properties.Name],
                weight: 3,
            };
        },
        onEachFeature: function (feature, layer) {
            let prop = feature.properties;
            //Font-awesome Icons vor der Überschrift und Beschreibung funktionieren leider nicht. Wieso?
            layer.bindPopup(`
            <h4> ${prop.Name}</h4>
            <p> ${prop.Descript}<br>
            `);
            einzelneRouten[prop.Name] = prop.Name;
        }
    }).addTo(themaLayer.burgenland);
}
burgenlandRadwege("data/burgenland_radwege.geojson");

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