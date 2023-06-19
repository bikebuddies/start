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
        "Radrouten Burgenland": themaLayer.burgenland,
        "Radrouten Niederösterreich": themaLayer.niederoesterreich,
        "Radrouten Wien": themaLayer.wien
    }).addTo(map);
// Layer beim Besuch auf der Seite ausklappen
layerControl.expand();

L.geoJSON("data/burgenland_radwege.geojson").addTo(map)

/*
// Burgenland Radwege Layer (von Vienna Sightseeing Linien)
async function showBurgenland(jsondata) {
    L.geoJSON(jsondata, {
        style: function (feature) {
            return {
                color: "#ff0000",
                weight: 3,
                opacity: 0.5
            };
            }
        }
        ).addTo(themaLayer.burgenland)
    }
        /*onEachFeature: function(feature, layer) {
            let prop = feature.properties;
            layer.bindPopup(`
            <h4>${prop.Name}</h4>
            <p>${prop.Descript}</p>
            `);
        }
    }).addTo(themaLayer.burgenland);
}

showBurgenland("\data\burgenland_radwege.geojson");*/
  
/*
    //console.log(response, jsondata);
    L.geoJSON(jsondata, {
        style: function (feature) {
            return {
                color: lineColors[feature.properties.LINE_ID],
                weight: 3,
                dashArray: [10, 4]
            };
        },
        onEachFeature: function (feature, layer) {
            let prop = feature.properties;
            layer.bindPopup(`
            <h4><i class="fa-sharp fa-solid fa-bus"></i> ${prop.LINE_NAME}</h4>
            <p><i class="fa-sharp fa-regular fa-circle-stop"></i> ${prop.FROM_NAME}<br>
            <i class="fa-sharp fa-solid fa-down-long"></i><br>
            <i class="fa-sharp fa-regular fa-circle-stop"></i> ${prop.TO_NAME}</p>
            `);
            lineNames[prop.LINE_ID] = prop.LINE_NAME;
            //console.log(lineNames)
        }
    }).addTo(themaLayer.lines);
}
}
*/
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

