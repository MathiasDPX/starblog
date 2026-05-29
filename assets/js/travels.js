import L, {Map, TileLayer, Marker, FeatureGroup, LatLngBounds, LatLng } from 'leaflet';
import { Icon, ChipDiamondPanel, createElement } from 'leaflet-extra-marker';

const plane_svg = '<svg class="map-icon" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M200 24c0-30.9 25.1-56 56-56s56 25.1 56 56l0 127.3 173.6 159.2c6.6 6.1 10.4 14.6 10.4 23.6l0 43.7c0 10.9-10.7 18.6-21.1 15.2l-162.9-54.3 0 99.7 66 52.8c3.8 3 6 7.6 6 12.5l0 19.8c0 10.4-9.8 18-19.9 15.5L256 512 147.9 539c-10.1 2.5-19.9-5.1-19.9-15.5l0-19.8c0-4.9 2.2-9.5 6-12.5l66-52.8 0-99.7-162.9 54.3C26.7 396.4 16 388.7 16 377.8l0-43.7c0-9 3.8-17.5 10.4-23.6L200 151.3 200 24z"></path></svg>';

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
        return `${this.country} <b>${this.name}</b>${description}`;
    }
}

// Airport data from https://airport-data.com/
const airports = [
    new Airport("🇫🇷", "Brest Bretagne Airport", "BES", [48.447911, -4.418539]),
    new Airport("🇦🇹", "Vienna International Airport", "VIE", [48.110278, 16.569722], 'In January 2026 for <a href="https://midnight.hackclub.com/" target="_blank">Midnight</a>'),
    new Airport("🇫🇷", "Charles De Gaulle International Airport", "CDG", [49.012779, 2.55]),
    new Airport("🇺🇸", "John F Kennedy International", "JFK", [40.639751, -73.778926], 'In May 2026 for <a href="https://game.hackclub.com/" target="_blank">Hack Club : The Game</a>'),
];

const airportsSmall = new FeatureGroup();
const airportsLarge = new FeatureGroup();
airports.forEach(function (airport, index) {
    const popup = airport.createPopup();
    const small = new Marker(airport.location, {
        icon: new Icon({
            contentHtml: plane_svg,
            color: "#1b75bb",
            scale: 0.75,
            svg: ChipDiamondPanel
        }),
    })

    const large = new Marker(airport.location, {
        icon: new Icon({
            contentHtml: plane_svg,
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