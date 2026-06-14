---
layout: post
title: "RetEx: Midnight hackathon"
excerpt: "4-day hackathon in Vienna"
slug: midnight
date: 2026-01-04
tags:
- hackclub
- hackathon
---

# RetEx: Midnight hackathon

Midnight was a 4-day hackathon held in Vienna from January 4th to 8th, organized by Hack Club. It featured an immersive storyline centered around a mysterious murder involving Aunt Bethesda, where participants had to uncover the culprit by building two technical projects.


## How did I get invited

To get invited to Midnight, you had to make multiple projects totaling 50 hours to buy a ticket. I first planned to make 5 projects of 10 hours each, but I ended up doing a sixth project (bubulb) to get a sleeping bag so I didn't have to bring mine.

Here's a short recap of all my projects:
- [starblog](https://github.com/MathiasDPX/starblog) (16.8h) -- This website!
- [goarchiver](https://github.com/MathiasDPX/goarchiver) (12.9h) -- Lightweight archiving tool written in Go
- [onedrive-proxy](https://github.com/MathiasDPX/onedrive-proxy) (10.2h) -- Proxy for exposing OneDrive files to the world
- [scrappy-doo](https://github.com/MathiasDPX/scrappy-doo) (7h) -- Scrapbook alternative
- [aseprite-bin](https://github.com/MathiasDPX/aseprite-bin) (5.8h) -- Automatic Aseprite binary build for all operating systems
- [bubulb](https://github.com/MathiasDPX/bubulb) (3.2h) -- API to control Yeelight Smart Bulb

## The Mission

![A theater screen showing a body's chalk outline on a red background](https://cdn.hackclub.com/019c529f-78fc-7b85-aae2-b97673e5b50d/midnight-opening-ceremony.jpg){:.lightbox-image}
_Photo by [Hashikono Tham](https://github.com/Hashikono)<br>_

"Someone is plotting to kill Aunt Bethesda, and we've been invited to Vienna to try to stop it." For this, we had to code 2 technical projects and show them to the task force (organizing team) to gain points (stickers) that we could then use to get clues from suspects. We also win merch after reaching some milestones: a lanyard for coming to Midnight, stickers after showcasing our ideas, keychains for shipping our first project, a tote bag for the second, and finally a hoodie for having ten points.

## 1^st^ project: CaseMate

![Casemate frontend](https://cdn.hackclub.com/019c529f-458b-74f8-9eb3-2c7333b0986e/midnight-casemate.jpeg){:.lightbox-image}
*Casemate frontend*

Our first app was a case tracking app where you could put every piece of information you knew about the case (suspects, evidence, testimonies, etc...) and during your investigation, you would be assisted by Benoit Blanc from [Knives Out](https://letterboxd.com/film/knives-out-2019/).

I was in charge of the backend while Aleksej and Andrej (my teammates) were working on the frontend. I chose to use [DuckDB](https://duckdb.org/) because it was something I had recently discovered and really liked, and [FastAPI](https://fastapi.tiangolo.com/) because I wanted to learn it. For the frontend, they chose to use React and Tailwind, and the AI behind Benoit Blanc is `qwen3-32b` from [Hackclub AI](https://ai.hackclub.com).

I think I can divide the development of the backend into three parts: setup, routes, and REST API slop. The setup was pretty boring, as I just needed to make a bunch of endpoints that returned sample data just so my teammates could work on the frontend.

Making the routes was actually fun because I had to design the database schemas and everything needed to make the app work. That's when I switched from Flask to FastAPI. This is also where I met a fairly big problem: DuckDB isn't thread-safe, while FastAPI is multi-threaded. To solve this, I used one connection per thread instead of one connection for the whole program. This might not be the safest or fastest solution, but it is the one that worked on the spot.

The REST API slop part was the most boring, as I needed to implement `PUT`, `DELETE` and `PATCH` methods for **all** the endpoints I previously made (6 endpoints, so 3*6 = 18 new methods to implement), and that's where I used AI. I implemented all 3 methods perfectly on the parties endpoint and asked [Amp](https://ampcode.com/) to do the same thing for all 5 other endpoints.

I'd say this project was the best one (or at least the most complete) as we spent a lot of time on it because we weren't sleep-deprived like we were on the 2^nd^. On a technical side, I'm very proud of it as the backend has every functionality we wanted, and they're fully documented with OpenAPI and Pydantic models. I even spent time making a script to populate the database with the Midnight case instead of inserting random data through DuckDB CLI. I honestly don't think I could have done anything better on this first project; I'm satisfied with the backend, the stack, and the documentation.

You can find Casemate source code on [`DjukicAleksej/aidetective`](https://github.com/DjukicAleksej/aidetective)


## 2^nd^ project: Saber Strike

![Screenshot of Saber Strike](https://cdn.hackclub.com/019c52b2-3d81-7322-a48e-d6874838a975/midnight-saberstrike.jpg){:.lightbox-image}
_Screenshot of Saber Strike_

Saber Strike is a browser-based rhythm game inspired by [Beat Saber](https://beatsaber.com/), but instead of controlling the sabers with controllers, sabers are controlled by hand movements using your camera.

The project is fully written in Typescript using React, Three.js, and [Google's MediaPipe](https://github.com/google-ai-edge/mediapipe) for tracking hand movements. I was in charge of track generation; I had to generate x seconds of gameplay at 130 BPM. For that, I chose a pattern-based approach; there are 5 patterns that are randomly selected. Each pattern is composed of multiple notes that the player has to slash from a specific direction:

- Basic Alternating: 8 downward notes alternating left and right on the middle lanes
- Double Hits: 4 pairs of notes in any direction on the left and right lanes simultaneously, at half speed
- Stream: fast rolling pattern across all 4 lanes, consisting of 16 notes (1 -> 2 -> 3 -> 4 -> 1 -> 2 ->...), 2x faster
- Jumps: a harder version of Double Hits, 4 pairs on both outer lanes for 4 consecutive beats
- Short Rest: no notes for 4 beats

I had a smaller role in this project as I started to feel my lack of sleep, and the floor I slept on during the first night wasn't the best bed I ever tried. Contrary to the first project, there are several things I would improve, the first being how I generate tracks from songs; I would have liked to have a more accurate method to generate them using [beat detection](https://www.youtube.com/watch?v=frDQFCRFMB8) with a Markov chain for patterns because currently, the probability of getting Short Rest twice is the same as getting Jumps twice.

You can find Saber Strike source code on [`DjukicAleksej/saberstrikess`](https://github.com/DjukicAleksej/saberstrikess)


## Conclusion

Midnight was an incredible experience that pushed me far beyond my comfort zone. Building two complete projects in just 4 days was really fun, exhausting, but absolutely worth it. On the technical side, I went from being curious about FastAPI and DuckDB to shipping a production-ready backend with full OpenAPI documentation. I learned to handle thread-safety issues on the fly and embraced TypeScript for the first time. The sleep deprivation was real, and I can see areas where I'd improve both projects given more time. But that's the beauty of hackathons: you ship what works, learn from what doesn't, and come out the other side with experience and new skills. Beyond the code, Midnight gave me something more valuable: connections with brilliant people who share the same passion for building things.