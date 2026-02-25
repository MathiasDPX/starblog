---
layout: post
title: "Homelab"
excerpt: "Homelab interactive diagram"
slug: homelab
---

<script src="https://w.mathiasd.fr/go.js"></script>

# Homelab

<div id="labDiagramDiv"></div>

<script>
const $ = go.GraphObject.make;

const diagram = $(go.Diagram, "labDiagramDiv", {
  "undoManager.isEnabled": true,
  "toolManager.hoverDelay": 200,
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

diagram.nodeTemplate = $(
  go.Node,
  "Auto",
  {
    movable: false,
    deletable: false,
    selectable: false,
    toolTip: $(
      go.Adornment, "Auto",
      $(go.Shape, "RoundedRectangle", {
        fill: "#1E2A2A",
        stroke: "#6B7C7C",
        strokeWidth: 1
      }),
      $(go.Panel, "Horizontal", { margin: 8 },
        $(go.TextBlock, {
          font: "bold 11px sans-serif",
          stroke: "#E0ECEC"
        }, new go.Binding("text", "tooltip", t => t && t.includes(":") ? t.split(":")[0] + ":" : "")),
        $(go.TextBlock, {
          font: "11px sans-serif",
          stroke: "#A0B0B0",
          margin: new go.Margin(0, 0, 0, 4),
          maxSize: new go.Size(180, NaN),
          wrap: go.TextBlock.WrapFit
        }, new go.Binding("text", "tooltip", t => t ? (t.includes(":") ? t.substring(t.indexOf(":") + 1).trim() : t) : "no tooltip"))
      )
    )
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
        stroke: "#2E3A3A"
      }, new go.Binding("text", "name")),
      $(go.TextBlock, {
        font: "11px sans-serif",
        stroke: "#4E5A5A",
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
    fill: "#E6F0F0",
    stroke: "#6B7C7C",
    strokeWidth: 2
  }),
  $(go.Panel, "Vertical", { margin: 10 },
    $(go.TextBlock, {
      font: "bold 14px sans-serif",
      stroke: "#2E3A3A",
      alignment: go.Spot.Left
    }, new go.Binding("text", "text")),
    $(go.Placeholder, { padding: new go.Margin(10, 8, 8, 8) })
  )
);

const nodeData = [
    { key: "caterpillar", text: "Caterpillar", isGroup: true },

    { key: "metrics", text: "Metrics", isGroup: true, group: "caterpillar" },
    {
      key: "qbittorrent-exporter",
      group: "metrics",
      name: "qBittorrent exporter",
      desc: "Prometheus exporter for qBittorrent",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/qbittorrent.png",
      tooltip: "Ports: 8090/tcp"
    },
    {
      key: "prometheus",
      group: "metrics",
      name: "Prometheus",
      desc: "Monitoring system & time series database",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/prometheus.png",
      tooltip: "Ports: 9090/tcp"
    },
    {
      key: "grafana",
      group: "metrics",
      name: "Grafana",
      desc: "Analytics & Monitoring",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/grafana.png",
      tooltip: "Ports: 3000/tcp"
    },
    {
      key: "flavortown-exporter",
      group: "metrics",
      name: "Flavortown exporter",
      desc: "Prometheus exporter for HackClub Flavortown",
      iconSrc: "https://www.genroam.io/flavourtown/sticker.webp",
      tooltip: "Ports: 6117/tcp"
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
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/qbittorrent.png",
      tooltip: "Ports: 17222/tcp, 44910/tcp, 44910/udp"
    },
    {
      key: "vaultwarden",
      group: "caterpillar",
      name: "Vaultwarden",
      desc: "Password manager",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/vaultwarden.png",
      tooltip: "Ports: 9445/tcp"
    },
    {
      key: "freshrss",
      group: "caterpillar",
      name: "FreshRSS",
      desc: "Feeds aggregator",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/freshrss.png",
      tooltip: "Ports: 6145/tcp"
    },
    {
      key: "komga",
      group: "caterpillar",
      name: "Komga",
      desc: "Comics/Mangas media server",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/komga.png",
      tooltip: "Ports: 25600/tcp"
    },
    {
      key: "glance",
      group: "caterpillar",
      name: "Glance",
      desc: "Generic dashboard",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/glance.png",
      tooltip: "Ports: 7330/tcp"
    },
    {
      key: "wakamitm",
      group: "caterpillar",
      name: "WakaMITM",
      desc: "Wakatime middleware",
      iconSrc: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/wakatime.png",
      tooltip: "Ports: 9858/tcp"
    },
    {
      key: "onedrive-proxy",
      group: "caterpillar",
      name: "onedrive-proxy",
      desc: "Files hosting",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/microsoft-onedrive.png",
      tooltip: "Ports: 15298/tcp"
    },
    {
      key: "jekyll-hackclub",
      group: "caterpillar",
      name: "jekyll-hackclub",
      desc: "Jekyll plugin for HackClub",
      iconSrc: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/jekyll.png",
      tooltip: "Ports: 10511/tcp"
    },
];

nodeData.forEach(n => { if (!n.isGroup && n.tooltip === undefined) n.tooltip = "no ports exposed"; });

diagram.model = new go.GraphLinksModel(nodeData);
</script>