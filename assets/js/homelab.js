const $ = go.GraphObject.make;

function makeTooltipAdornment() {
    return $(
        go.Adornment, "Auto",
        new go.Binding("visible", "tooltip", t => !!t && t.trim().length > 0),
        $(go.Shape, "RoundedRectangle", {
            fill: "#1E2A2A",
            stroke: "#6B7C7C",
            strokeWidth: 1
        }),
        $(go.Panel, "Horizontal", { margin: 8 },
            $(go.TextBlock, {
                font: "11px sans-serif",
                stroke: "#ECECEC",
                margin: new go.Margin(0, 0, 0, 4),
                maxSize: new go.Size(180, NaN),
                wrap: go.TextBlock.WrapFit
            }, new go.Binding("text", "tooltip", t => t))
        )
    );
}

const diagram = $(go.Diagram, "labDiagramDiv", {
    "undoManager.isEnabled": true,
    "toolManager.hoverDelay": 200,
    initialScale: 0.9,
    allowMove: false,
    allowDelete: false
});

class ThreeColumnLayout extends go.Layout {
    constructor() {
        super();
        this.spacing = new go.Size(12, 12);
        this.columnCount = 3;
    }

    doLayout(coll) {
        coll = this.collectParts(coll);
        const diagram = this.diagram;
        if (!diagram) return;

        diagram.startTransaction("threeColumnLayout");
        let x = 0;
        let y = 0;
        let col = 0;
        let rowHeight = 0;
        const spacing = this.spacing;

        const it = coll.iterator;
        while (it.next()) {
            const part = it.value;
            if (!(part instanceof go.Part) || part instanceof go.Link) continue;

            part.ensureBounds();
            const bounds = part.actualBounds;

            if (part instanceof go.Group) {
                if (col !== 0) {
                    col = 0;
                    x = 0;
                    y += rowHeight + spacing.height;
                    rowHeight = 0;
                }

                part.move(new go.Point(x, y));
                y += bounds.height + spacing.height;
                continue;
            }

            part.move(new go.Point(x, y));

            rowHeight = Math.max(rowHeight, bounds.height);
            x += bounds.width + spacing.width;
            col += 1;

            if (col >= this.columnCount) {
                col = 0;
                x = 0;
                y += rowHeight + spacing.height;
                rowHeight = 0;
            }
        }

        diagram.commitTransaction("threeColumnLayout");
    }
}

const groupLayout = new ThreeColumnLayout();

function positionTopLevelGroups() {
    const caterpillar = diagram.findPartForKey("caterpillar");
    const michka = diagram.findPartForKey("michka");
    const nest = diagram.findPartForKey("nest");

    if (!(caterpillar instanceof go.Group) || !(michka instanceof go.Group) || !(nest instanceof go.Group)) return;

    const spacing = 24;

    diagram.startTransaction("positionTopLevelGroups");
    caterpillar.move(new go.Point(0, 0));
    caterpillar.ensureBounds();

    const rightColumnX = caterpillar.actualBounds.right + spacing;

    michka.move(new go.Point(rightColumnX, 0));
    michka.ensureBounds();

    nest.move(new go.Point(rightColumnX, michka.actualBounds.bottom + spacing));
    diagram.commitTransaction("positionTopLevelGroups");
}

diagram.addDiagramListener("InitialLayoutCompleted", positionTopLevelGroups);

diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    {
        movable: false,
        deletable: false,
        selectable: false,
        toolTip: makeTooltipAdornment()
    },
    $(go.Shape, "RoundedRectangle", {
        fill: "#FFFFFF",
        stroke: "#6B7C7C",
        strokeWidth: 1
    }),
    $(go.Panel, "Horizontal", { margin: 8 },
        $(go.Picture, {
            width: 26,
            height: 26,
            margin: new go.Margin(0, 8, 0, 0),
            imageStretch: go.GraphObject.UniformToFill
        }, new go.Binding("source", "iconSrc")),
        $(go.Panel, "Vertical", { margin: new go.Margin(0, 0, 0, 8) },
            $(go.TextBlock, {
                font: "bold 12px sans-serif",
                stroke: "#3b3b3b"
            }, new go.Binding("text", "name")),
            $(go.TextBlock, {
                font: "11px sans-serif",
                stroke: "#595959",
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit
            }, new go.Binding("text", "desc"))
        )
    )
);

diagram.groupTemplate = $(
    go.Group,
    "Auto",
    {
        layout: groupLayout,
        movable: false,
        deletable: false,
        selectable: false
    },
    $(go.Shape, "RoundedRectangle", {
        fill: "#131a24",
        stroke: "#c5c5c5",
        strokeWidth: 2
    }),
    $(go.Panel, "Vertical", { margin: 10 },
        $(go.Panel, "Horizontal", {
                alignment: go.Spot.Left,
                defaultAlignment: go.Spot.Center
            },
            $(go.TextBlock, {
                font: "bold 14px sans-serif",
                stroke: "#ffffff"
            }, new go.Binding("text", "text")),
            $(go.Panel, "Auto", {
                    toolTip: makeTooltipAdornment(),
                    visible: false,
                    cursor: "pointer",
                    margin: new go.Margin(-2, 0, 0, 6)
                },
                new go.Binding("visible", "tooltip", t => typeof t === "string" && t.trim().length > 0),
                $(go.TextBlock, {
                    text: "ⓘ",
                    font: "bold 14px sans-serif",
                    stroke: "#d9e8ff",
                    margin: new go.Margin(2, 0, 0, 0)
                })
            )
        ),
        $(go.Placeholder, { padding: new go.Margin(10, 8, 8, 8) })
    )
);

const caterpillarNodes = [
    { key: "caterpillar", text: "Caterpillar", isGroup: true, tooltip: "Hosted at home" },

    { key: "metrics", text: "Metrics", isGroup: true, group: "caterpillar" },
    {
        key: "qbittorrent-exporter",
        group: "metrics",
        name: "qBittorrent exporter",
        desc: "Prometheus exporter for qBittorrent",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/qbittorrent.png"
    },
    {
        key: "prometheus",
        group: "metrics",
        name: "Prometheus",
        desc: "Monitoring system & time series database",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/prometheus.png"
    },
    {
        key: "grafana",
        group: "metrics",
        name: "Grafana",
        desc: "Analytics & Monitoring",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/grafana.png"
    },

    { key: "exposing", text: "Exposure", isGroup: true, group: "caterpillar" },
    {
        key: "cloudflared",
        group: "exposing",
        name: "Cloudflared",
        desc: "Cloudflare Tunnel",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/cloudflare.png",
    },
    {
        key: "tailscale",
        group: "exposing",
        name: "Tailscale",
        desc: "Mesh VPN",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/tailscale.png"
    },

    {
        key: "qbittorrent",
        group: "caterpillar",
        name: "qBittorrent",
        desc: "BitTorrent client",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/qbittorrent.png"
    },
    {
        key: "vaultwarden",
        group: "caterpillar",
        name: "Vaultwarden",
        desc: "Password manager",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/vaultwarden.png"
    },
    {
        key: "freshrss",
        group: "caterpillar",
        name: "FreshRSS",
        desc: "Feeds aggregator",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/freshrss.png"
    },
    {
        key: "komga",
        group: "caterpillar",
        name: "Komga",
        desc: "Comics/Mangas media server",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/komga.png"
    },
    {
        key: "glance",
        group: "caterpillar",
        name: "Glance",
        desc: "Generic dashboard",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/glance.png"
    },
    {
        key: "wakamitm",
        group: "caterpillar",
        name: "WakaMITM",
        desc: "Wakatime middleware",
        iconSrc: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/wakatime.png"
    },
    {
        key: "onedrive-proxy",
        group: "caterpillar",
        name: "onedrive-proxy",
        desc: "Files hosting",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/microsoft-onedrive.png"
    },
    {
        key: "jekyll-hackclub",
        group: "caterpillar",
        name: "jekyll-hackclub",
        desc: "Jekyll plugin for HackClub",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/jekyll.png"
    },
    {
        key: "navidrome",
        group: "caterpillar",
        name: "Navidrome",
        desc: "Music server and streamer",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/webp/navidrome.webp"
    },
    {
        key: "pocketid",
        group: "caterpillar",
        name: "Pocket ID",
        desc: "OIDC Provider",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/webp/pocket-id.webp"
    },
    {
        key: "archivetube",
        group: "caterpillar",
        name: "ArchiveTube",
        desc: "YouTube archiving",
        iconSrc: "https://raw.githubusercontent.com/MathiasDPX/archivetube/refs/heads/main/web/static/favicon.svg"
    }
];

const michkaNodes = [
    { key: "michka", text: "Michka", isGroup: true, tooltip: "'Newcomer' KVM Server at datalix.eu" },

    {
        key: "cloudflared",
        group: "michka",
        name: "Cloudflared",
        desc: "Cloudflare Tunnel",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/cloudflare.png",
    },
    {
        key: "tailscale",
        group: "michka",
        name: "Tailscale",
        desc: "Mesh VPN",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/tailscale.png"
    },
    {
        key: "immich",
        group: "michka",
        name: "Immich",
        desc: "Photo and video management",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/immich.png"
    },
]

const nestNodes = [
    { key: "nest", text: "Nest", isGroup: true, tooltip: "HackClub's public server - LXC Container" },

    {
        key: "uptime-kuma",
        group: "nest",
        name: "Uptime Kuma",
        desc: "Uptime Kuma",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/uptime-kuma.png"
    },
    {
        key: "tailscale",
        group: "nest",
        name: "Tailscale",
        desc: "Mesh VPN",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/tailscale.png",
        tooltip: "Tailscale is running in userspace mode exposing a SOCKS5 and HTTP proxy on port 1055"
    },
    {
        key: "komodo",
        group: "nest",
        name: "Komodo",
        desc: "Server management",
        iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/komodo.png",
        tooltip: "Only the core is running on Nest, each server is running a periphery"
    },
]

const nodeData = [];
nodeData.push(...caterpillarNodes);
nodeData.push(...michkaNodes);
nodeData.push(...nestNodes);

nodeData.forEach(n => { if (!n.isGroup && n.tooltip === undefined) n.tooltip = ""; });

diagram.model = new go.GraphLinksModel(nodeData);
