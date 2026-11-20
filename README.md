# starblog

Personal blog based on [bearblog](https://bearblog.dev) built on Jekyll

## generate assets

The `noise/` directory contains a small Go program that generates `assets/images/background.jpg`.

```bash
cd noise

# Import FastNoiseLite from its repository
wget https://raw.githubusercontent.com/Auburn/FastNoiseLite/refs/heads/master/Go/fastnoise.go -O fastnoise/fastnoise.go

go run ./main.go
```

The source for my 88x31 is in `assets/images/8831.ase` and you can export the GIF and PNG with Aseprite

## config

In case my instance of [jekyll-hackclub](https://github.com/MathiasDPX/jekyll-hackclub/tree/master/server) goes down, you'll need to change `HACKCLUB_API` to your own instance

## dev

You can run a test instance with these commands:

```
bundle install
jekyll serve
```