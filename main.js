// Zentrum Karte Objekt
let stpolten = {
    lat: 48.18735,
    lng: 15.64139,
    title: "St. Pölten, Niederösterreich"
};

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
};

// Hintergrundlayer 
let layerControl = L.control.layers({
    "Terrain": L.tileLayer.provider("Stamen.Terrain").addTo(map),
    "StamenB/W": L.tileLayer.provider("Stamen.TonerLite"),
    "BasemapÖsterreich": L.tileLayer.provider("BasemapAT.grau"),
    "CycleTrails": L.tileLayer.provider("CyclOSM"),
},
    {
        "Radrouten Burgenland": themaLayer.burgenland.addTo(map),
        "Radrouten Niederösterreich": themaLayer.niederoesterreich.addTo(map),
        "Radrouten Wien": themaLayer.wien.addTo(map)
    }).addTo(map);

// Layer beim Besuch auf der Seite ausklappen
layerControl.expand();

// Burgenland Radwege Layer
async function burgenlandRadwege(jsonFile) {
    let response = await fetch(jsonFile);
    let jsondata = await response.json();
    let einzelneRouten = {};
    let routenFarben = { //Rottöne von https://www.color-meanings.com/shades-of-red-color-names-html-hex-rgb-codes/
        "Festival-Radweg": "#8D021F", //Burgundy 
        "Iron Curtain Trail - Gesamtroute": "#CD5C5C", //Indian Red
        "Paradiesroute": "#7C0A02", //Barn Red
        "R1 Jubiläumsradweg": "#E0115F", //Ruby
        "B32 Rosalia-Radwanderweg": "#FF0800", //Candy Apple
    };
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
            <br>
            <b>Distanz: <em>${prop.Distanz} km </em></b><br>
            <b> Höhenmeter: <em>${prop.Höhenmeter} m </em><b></p>
            `);
            einzelneRouten[prop.Name] = prop.Name;
        }
    }).addTo(themaLayer.burgenland);
}
burgenlandRadwege("data/burgenland_radwege.geojson");

//Niederösterreich Radwege
async function niederoesterreichRadwege(jsonFile) {
    let response = await fetch(jsonFile);
    let jsondata = await response.json();
    let einzelneRouten = {};
    let routenFarben = { //Gelbtöne von https://www.farb-tabelle.de/de/farbtabelle.htm#yellow
        "Ybbstalradweg": "#EEDD82", //BlanchedAlmond 
        "Triestingau-Radweg": "#B8860B", //DarkGoldenrod
        "Triesting-Gölsental-Radweg": "#FFB90F", //DarkGoldenrod1
        "Traisentalweg": "#FFFACD", //LemonChiffon
        "Thayarunde Waldviertel": "#FFEBCD", //LightGo.denrod
        "Piestingtal-Radweg": "#EEEE00", //yellow2
        "Kamp-Thaya-March-Radroute": "#FFD700", //gold
    };
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
            <br>
            <b>Distanz: <em>${prop.Distanz} km </em></b><br>
            <b> Höhenmeter: <em>${prop.Höhenmeter} m </em><b></p>
            `);
            einzelneRouten[prop.Name] = prop.Name;
        }
    }).addTo(themaLayer.niederoesterreich)
};
niederoesterreichRadwege("data/niederoesterreich_radwege.geojson");

//Wien Radwege
async function wienRadwege(jsonFile) {
    let response = await fetch(jsonFile);
    let jsondata = await response.json();
    let einzelneRouten = {};
    let routenFarben = { //Gelbtöne von https://www.farb-tabelle.de/de/farbtabelle.htm#orange
        "Wienerwald (Eurovelo 9)": "#EED5B7", //bisque2
        "Wasser zu Wein": "#FFDAB9", //PeachPuff
        "Urban und Rural": "#FFA500", //orane
        "Wiener Wasser": "#FF8247", //sienna1
        "Unten und Oben": "#E9967A" //DarkSalmon
    };
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
            <br>
            <b>Distanz: <em>${prop.Distanz} km </em></b><br>
            <b> Höhenmeter: <em>${prop.Höhenmeter} m </em><b></p>
            `);
            einzelneRouten[prop.Name] = prop.Name;
        }
    }).addTo(themaLayer.wien);
};
wienRadwege("data/wien_radwege.geojson");

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
];

for (let stadt of STAEDTE) {
    L.marker([stadt.lat, stadt.lng])
        .addTo(map)
        .bindPopup(`<b>${stadt.title}</b> <br>
            <a href="${stadt.wikipedia}">Wikipedia</a>
    `)
};

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);