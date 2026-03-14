# starblog

Personal blog based on [bearblog](https://bearblog.dev) but static using Jekyll

## generate assets

The `noise/` directory contains a small Go program that generates `assets/background.png`.

```bash
cd noise

# Import FastNoiseLite from its repository
wget https://raw.githubusercontent.com/Auburn/FastNoiseLite/refs/heads/master/Go/fastnoise.go -O fastnoise/fastnoise.go

go run ./main.go
```

## config

You may need extra config in `_config.yml` if you want to use your Slack and not mine
- `LASTFM_PROXY_ENDPOINT` is a Cloudflare Workers sourced on [MathiasDPX/workers](https://github.com/MathiasDPX/workers/tree/main/lastfm)
- and replace all occurences of `U080HHYN0JD` to your Slack ID

In case my instance of [jekyll-hackclub](https://github.com/MathiasDPX/jekyll-hackclub/tree/master/server), you'll need to change `HACKCLUB_API` to your own instance

## dev

You can run a test instance with these commands:

```
bundle install
jekyll serve
```