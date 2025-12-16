---
layout: post
title: "50 Days"
excerpt: "50 days of productivity until the end of the year"
slug: 50days
tags:
- hackclub
---

<style>
#progress-bar {
    min-width: 100%;
    height: 1em;
    margin-bottom: 1em;
    margin-top: -0.5em;
    border-radius: 4px;
    overflow: hidden;          
    background-color: #f0ffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

#progress {
    min-height: 100%;
    font-family: "Berkeley Mono",Iosevka,Hack,Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace;
    font-size: 0.8em;
    text-align: center;
    color: #000000;
    background-color: #97c228;
}
</style>

# <img class="title" src="https://emoji.slack-edge.com/T09V59WQY1E/50days/e35ee9bec8dfa875.png">50 Days

<div id="progress-bar">
    <div id="progress">??%</div>
</div>

<script>
// Auto-update progress bar
(function () {
    const startDate = new Date("2025-11-11");
    const totalDays = 50;

    const today = new Date();
    const elapsedMs = today - startDate;
    const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

    const progress = Math.min(Math.max(elapsedDays / totalDays, 0), 1);
    const percent = Math.round(progress * 100);

    const bar = document.getElementById("progress");
    bar.style.width = percent + "%";
    bar.textContent = percent + "%";
})();
</script>

50 Days is a HackClub event running on November 11th, 2025 -- 50 days before 2026 --. The idea is simple: participants share a list of goals they want to accomplish before the end of the year, then post daily updates for the next 50 days. There are no prizes; the reward is the productivity you (hopefully) maintain.

Here are the goals I set for myself:
- Setup [Glance](https://github.com/glanceapp/glance)
- Create a [FreshRSS](https://freshrss.org/index.html) widget for Glance
- Refactor [wakamitm](https://github.com/MathiasDPX/wakatime_mitm) frontend
- Read an academic paper
- Finish "Animal Farm"
- Make an api/webapp for my light bulb
- Ship my [OneDrive proxy](https://github.com/MathiasDPX/onedrive-proxy)
- Make an archiving tool
- Archive stuff
- Add a dropbox to the 1drv proxy
- Somehow make [a workflow](https://github.com/MathiasDPX/aseprite-bin/blob/master/.github/workflows/specific-version.yml) public so user can choose what version to build
- Make a real website for [mathiasd.fr](https://mathiasd.fr/)
- Make something in C(++)
- Publish dotfiles
- More but idk yet


## 1^st^ week (1-7)

The first week wasn't the most productive but I started slow
- Setup Glance
- Made my workflow public
- Added a dropbox to onedrive-proxy
- Publish it to Docker Hub
- Started to archive [thevalleyofcode.com](https://thevalleyofcode.com/) with [ai.hackclub.com](https://ai.hackclub.com) (bad idea)

## 2^nd^ week (8-14)

This ended up being my most productive week so far. I:
- Setup a proxy server for scraping on Nest
- Made a TOML config for my archiving tool
- Played a bit of [MHRD](https://store.steampowered.com/app/576030/MHRD/)
- Homemade PCB at school
- Hosted my 1drv proxy on Nest at [files.mathiasd.fr](https://files.mathiasd.fr/)
- Fixed a lot of 1drv proxy bugs {% emoji sad-pf %}
- Bought [*Refactoring English*](https://refactoringenglish.com/early-access/) (which helped me write this blog)
- Made [wakey-wakey](https://mathiasdpx.github.io/wakey-wakey/) because I have bad sleep habits (now I have bad sleep habits and a useless website)
- Installed [Halloy](https://halloy.chat/) cause Hackclub's Slack was down due to migration

## 3^rd^ week (15-21)

This week i've started to make a bunch of different things:
- Started to make {% mention U09VC4NQXC6 ; Scrappy-Doo %} (which took me 4 hours)
- Began this blog because [bearblog.dev](http://bearblog.dev/) charges for custom domains
  - Found a name (starblog)
  - Switched from Flask to Jekyll
  - Added RSS feed
  - Wrote a lot of CSS
  - Set up a github workflow
  - Added a cool wavy background using [FastNoiseLite](https://github.com/MathiasDPX/starblog/tree/main/noise)
- Watched [*Frankenstein (2025)*](https://letterboxd.com/mathias_dpx/film/frankenstein-2025/) and [*Isle of Dogs*](https://letterboxd.com/mathias_dpx/film/isle-of-dogs-2018/)
- Started doing [Advent of Code](https://github.com/MathiasDPX/advent-of-code)

## 4^th^ week (22-28)

- Added blockquotes on starblog
- Started the bulb api (called it bubulb)
- Made my own {% mention U091NP7GCDS ; leeker %} (named david-leeker)
- Tried [pypy](https://pypy.org/) (it's not that good with my AoC solutions)

## 5^th^ week (29-35)

*ongoing...*
- {% mention U05MKEZUY67 ; alice %} convinced me to try midnight so I'm currently doing it
- Made keyshield, a reverse proxy to hide my [apiflash.com](https://apiflash.com/) keys from public because when I shared a leek in {% mention C06089401GT %} I made like 30 api calls out of 100 per **month**
- Submitted a bunch of projects for midnight
- Automated the progress bar on top of the page
- Finished AoC 2025 (check my [solutions](https://github.com/MathiasDPX/advent-of-code/tree/main/2025))
- Got half my hours (25h) approved for midnight

## 6^th^ week (36-42)

*starting soon*

## 7^th^ week (43-50)

*starting soon*