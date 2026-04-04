---
layout: default
---
# Hi, I'm Mathias

I'm bad at writing but want to write blogposts anyways, I currently live near [Brest](https://www.google.com/maps/search/Brest).
I'm also an hackclubber ({% mention U080HHYN0JD %}) and member of [LPH](https://wiki.mdl29.net/doku.php?id=start). You can see my homelab on my [Homelab]({{ '/p/homelab/' | relative_url }}) article

<span id="listening"><img src="./assets/music-notes.svg"> Listening to...</span>

Here's some projects I'm proud of: 

> ## jekyll-hackclub
> ![jekyll-hackclub icon](https://user-cdn.hackclub-assets.com/019ceba9-6b52-7152-b613-710625bbebda/jekyll-hackclub.png)
>
> Jekyll plugin to mention Slack users or channels. You can also query users.info api endpoints to retrieve raw informations like userid or avatar. It also add an Slack emoji resolver
> 
> [GitHub](https://github.com/MathiasDPX/jekyll-hackclub) [Demo](https://mathiasdpx.github.io/jekyll-hackclub/) [Gem](https://rubygems.org/gems/jekyll-hackclub)
{: type="project" style="border-left-color: #ED3850"}


> ## GH-DOOM
> ![GH-DOOM's profile picture](https://avatars.githubusercontent.com/u/187232905?v=4)
>
> Play DOOM64 through GitHub contributions graph. It take a screenshot of the game, resize it and display it on the graph through Selenium and repeat as fast as possible
> 
> [GitHub](https://github.com/GH-DOOM/DOOM64) [Demo video](https://www.youtube.com/watch?v=OPmpIwJ8uDY)
{: type="project" style="border-left-color: #FFDF0D"}


> ## CinéBrest
> ![CinéBrest favicon](https://raw.githubusercontent.com/MathiasDPX/grainParisArt/refs/heads/brest/static/images/icon.png)
>
> A platform that group all Brest cinema schedules on one page, offering real-time updates and a user-friendly design for effortless movie planning.
> Forked and heavily optimized from [grainParisArt](https://github.com/solene-drnx/grainParisArt-Public)
>
> [GitHub](https://github.com/MathiasDPX/grainParisArt/tree/brest) [Demo](https://cinema.mathiasd.fr/)
{: type="project" style="border-left-color: "#444CF7"}

> ## Babarcode
> ![Babarcode thumbnail](https://github.com/MathiasDPX/Babarcode/raw/main/images/babarcode.png)
>
> Play Minecraft with a barcode reader, it read input sent by the reader and press the associated keys from a dictionnary. It is survival-friendly by having toggle keys for eating and breaking blocks however you need the mouse to move the camera around
>
> [GitHub](https://github.com/MathiasDPX/Babarcode) [Demo video](https://www.youtube.com/watch?v=cZzIax472Eg)
{: type="project" style="border-left-color: #4DAB61"}


<style>
span#listening img {
    height: 1em;
    width: auto;
    display: inline-block;
}
</style>

<script>
(async () => {
    const listeningElem = document.getElementById('listening');
    if (!listeningElem) {
        return;
    }

    try {
        const response = await fetch("{{ site.LASTFM_PROXY_ENDPOINT }}");
        if (!response.ok) {
            console.error("Unable to fetch music");
            listeningElem.remove();
            return;
        }

        const data = await response.json();

        if (data?.['playing'] !== true) {
            listeningElem.remove();
            return;
        }

        listeningElem.innerHTML = `<img src="./assets/music-notes.svg"> Listening to <i>${data?.['name']}</i> by ${data?.['artist']}`;
    } catch (error) {
        console.error("Error while fetching music", error);
        listeningElem.remove();
    }
})();
</script>