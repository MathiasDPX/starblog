import { Map, TileLayer, Marker, FeatureGroup, LatLngBounds, LatLng } from 'leaflet';
import { Icon, ChipDiamondPanel } from 'leaflet-extra-marker';

const map = new Map('map', {
    center: [38, 0],
    zoom: 2.0,
    minZoom: 1.5,
    zoomControl: false,
    attributionControl: false,
    maxBounds: new LatLngBounds(
        new LatLng(-85, -180),
        new LatLng(85, 180)
    ),
    zoomSnap: 0.5,
});

new TileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    apikey: '6a53e8b25d114a5e9216df5bf9b5e9c8',
    maxZoom: 16,
}).addTo(map);

class CustomMarker {
    constructor(name, location, description, icon, color) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.icon = icon;
        this.color = color;
    }

    createPopup() {
        const description = this.description ? `<p class="half"></p>${this.description}` : '';
        return `<b>${this.name}</b>${description}`;
    }

    render(scale) {
        return new Marker(this.location, {
            icon: new Icon({
                contentHtml: this.icon,
                color: this.color,
                scale: scale,
                svg: ChipDiamondPanel
            }),
        })
    }
}

class HackClubMarker extends CustomMarker {
    constructor(flag, name, url, location, description) {
        const title = `${flag} <a href="${url}" target="_blank">${name}</a>`;
        super(title, location, description, '<img class="map-icon" src="/assets/images/hackclub.svg">', "#EC3750")
    }
}

function get_fa_icon(icon) {
    return `<img class="map-icon" src="https://w.mathiasd.fr/fa?icon=${icon}">`
}

const markers = [
    // Midnight
    new HackClubMarker(
        "🇦🇹", "Midnight", "https://midnight.hackclub.com/",
        [48.216391, 16.335855],
        'Murder mystery hackathon in January 2026 by Hack Club'
    ),

    // Hack Club : The Game
    new HackClubMarker(
        "🇺🇸", "Hack Club : The Game", "https://game.hackclub.com/",
        [40.79875, -73.966805],
        'Scavenger hunt adventure game across Manhattan in May 2026 by Hack Club'
    ),

    // Beest
    new HackClubMarker(
        "🇳🇱", "Beest", "https://beest.hackclub.com/",
        [52.070055, 4.324759],
        'Building a Strandbeest, a giant walking mechanism made of wood, in August 2026 by Hack Club'
    ),

    // Haven Paris
    new CustomMarker(
        '<a href="http://haven.hackclub.com/paris" target="_blank">Haven Paris</a>',
        [48.856354, 2.392309],
        "Organized a game jam for teens, November 14-15, 2026 in Paris",
        get_fa_icon("gamepad-modern"),
        "#FA681B"
    ),

    // Nantes Maker Campus
    new CustomMarker(
        '<a href="https://nantesmakercampus.fr/" target="_blank">Nantes Maker Campus</a>',
        [47.205478, -1.564178],
        'In July 2025/2026 with the <a href="https://mdl29.net/" target="_blank">Maison du Libre</a>',
        get_fa_icon("elephant"),
        "#C89B2E"
    ),

    // Unlock Your Brain
    new CustomMarker(
        '<a href="https://unlockyourbrain.bzh/en/" target="_blank">Unlock Your Brain</a>',
        [48.388886, -4.484716],
        "In November 2024/2025/2026",
        get_fa_icon("bird"),
        "#5FB52E"
    ),
];

const smallLayer = new FeatureGroup();
const largeLayer = new FeatureGroup();
markers.forEach(function (marker, index) {
    const popup = marker.createPopup();
    const small = marker.render(0.75);
    const large = marker.render(1);

    small.bindPopup(popup);
    large.bindPopup(popup);

    small.addTo(smallLayer);
    large.addTo(largeLayer);
});

smallLayer.addTo(map);

map.on('zoomend', () => {
    const zoom = map.getZoom();
    if (zoom >= 4) {
        if (!map.hasLayer(largeLayer)) {
            map.removeLayer(smallLayer);
            map.addLayer(largeLayer);
        }
    } else {
        if (!map.hasLayer(smallLayer)) {
            map.removeLayer(largeLayer);
            map.addLayer(smallLayer);
        }
    }
});