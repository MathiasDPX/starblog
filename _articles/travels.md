---
layout: post
title: "Travels"
excerpt: "Test the markdown converter and CSS"
slug: travels
tags:
- hackclub
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css"
     crossorigin=""/>
<script type="importmap">
    {
        "imports": {
            "leaflet": "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.js",
            "leaflet-extra-marker": "https://unpkg.com/leaflet-extra-markers@latest/src/index.js"
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

const airports_locs = {
    "BES": [48.4478989, -4.41854],
    "VIE": [48.1102980, 16.56970]
}

const airportsSmall = new FeatureGroup();
const airportsLarge = new FeatureGroup();
for (const [code, location] of Object.entries(airports_locs)) {
    new Marker(location, {
        icon: new Icon({
            contentHtml: '<i class="fa fa-plane-up"></i>',
            color: "#1b75bb",
            //contentColor: "white",
            scale: 0.75,
            svg: ChipDiamondPanel
        }),
    }).addTo(airportsSmall);

    new Marker(location, {
        icon: new Icon({
            contentHtml: '<i class="fa fa-plane-up"></i>',
            color: "#1b75bb",
            //contentColor: "white",
            scale: 1,
            svg: ChipDiamondPanel
        }),
    }).addTo(airportsLarge);
}

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
