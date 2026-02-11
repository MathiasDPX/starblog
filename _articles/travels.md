---
layout: post
title: "Travels"
excerpt: "Around the world around the world"
slug: travels
tags:
- hackclub
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css"
     crossorigin=""/>
<!-- TODO: Geodesic lines -->
<script type="importmap">
    {
        "imports": {
            "leaflet": "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.js",
            "leaflet-extra-marker": "https://unpkg.com/leaflet-extra-markers@latest/src/index.js",
            "leaflet.geodesic": "https://cdn.jsdelivr.net/npm/leaflet.geodesic"
        }
    }
</script>

# Travels

<div id="map"></div>

<script type="module">
import L, {Map, TileLayer, Marker, FeatureGroup, LatLngBounds, LatLng } from 'leaflet';
import { Icon, ChipDiamondPanel, createElement } from 'leaflet-extra-marker';

const bounds = new LatLngBounds(
    new LatLng(-85, -180),
    new LatLng(85, 180)
);

const map = new Map('map', {
    center: [38, 0],
    zoom: 2.0,
    maxBounds: bounds
});

new TileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
	minZoom: 1,
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
}).addTo(map);

class Airport {
    constructor(country, name, code, location, description) {
        this.country = country;
        this.name = name;
        this.code = code;
        this.location = location;
        this.description = description;
    }

    createPopup() {
        const description = this.description ? `<p class="half"></p>${this.description}` : '';
        return `${this.country} ${this.name}${description}`;
    }
}

const airports = [
    new Airport("🇫🇷", "Brest Bretagne Airport", "BES", [48.4478989, -4.41854]),
    new Airport("🇦🇹", "Vienna International Airport", "VIE", [48.1102980, 16.56970], '<a href="https://midnight.hackclub.com/">Midnight</a>'),
    new Airport("🇲🇶", "Martinique Aimé Césaire International", "FDF", [14.5909996, -61.0032005]),
    new Airport("🇫🇷", "Charles De Gaulle International Airport", "CDG", [49.0127983, 2.55]),
    new Airport("🇭🇺", "Budapest Ferenc Liszt International Airport", "BUD", [47.4369011, 19.2556]),
    new Airport("🇬🇧", "London City Airport  ", "LCY", [51.5052986, 0.055278]),
    new Airport("🇬🇧", "London Heathrow Airport  ", "LHR", [51.4706001, -0.461941])
];

const airportsSmall = new FeatureGroup();
const airportsLarge = new FeatureGroup();
airports.forEach(function (airport, index) {
    const popup = airport.createPopup();
    const small = new Marker(airport.location, {
        icon: new Icon({
            contentHtml: '<i class="fa fa-plane-up"></i>',
            color: "#1b75bb",
            scale: 0.75,
            svg: ChipDiamondPanel
        }),
    })

    const large = new Marker(airport.location, {
        icon: new Icon({
            contentHtml: '<i class="fa fa-plane-up"></i>',
            color: "#1b75bb",
            scale: 1,
            svg: ChipDiamondPanel
        }),
    });

    small.bindPopup(popup);
    large.bindPopup(popup);

    small.addTo(airportsSmall);
    large.addTo(airportsLarge);
});

airportsSmall.addTo(map);

map.on('zoomend', () => {
    const zoom = map.getZoom();
    if (zoom >= 4) {
        if (!map.hasLayer(airportsLarge)) {
            map.removeLayer(airportsSmall);
            map.addLayer(airportsLarge);
        }
    } else {
        if (!map.hasLayer(airportsSmall)) {
            map.removeLayer(airportsLarge);
            map.addLayer(airportsSmall);
        }
    }
});
</script>
