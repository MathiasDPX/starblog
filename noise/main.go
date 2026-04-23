package main

import (
	"image"
	"image/color"
	"image/jpeg"
	"os"

	"github.com/MathiasDPX/starblog/fastnoise"
)

const (
	width  = 512
	height = 512
	scale  = 1.0
)

var backgroundColor = color.RGBA{R: 7, G: 10, B: 14, A: 255}

func main() {
	noise := fastnoise.New[float64]()
	noise.NoiseType(fastnoise.OpenSimplex2)
	noise.RotationType3D = fastnoise.RotationNone
	noise.Seed = 3630
	noise.Frequency = 0.007

	// Fractal settings
	noise.FractalType(fastnoise.FractalFBm)
	noise.Octaves = 3
	noise.Lacunarity = 0.000
	noise.Gain = -4.820
	noise.WeightedStrength = 0.790
	noise.PingPongStrength = 2.000

	// Domain warp state
	warp := fastnoise.New[float64]()
	warp.DomainWarpType = fastnoise.DomainWarpOpenSimplex2
	warp.RotationType3D = fastnoise.RotationNone
	warp.DomainWarpAmp = 983.000
	warp.Seed = 1337
	warp.Frequency = 0.010

	// Create image (RGBA OK même pour JPEG)
	img := image.NewRGBA(image.Rect(0, 0, width, height))

	// Generate noise
	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			wx, wy := warp.DomainWarp2D(float64(x)/scale, float64(y)/scale)

			value := noise.GetNoise2D(wx, wy)
			brightness := uint8((value + 1) * 0.5 * 255)

			alpha := (float64(brightness) / 255.0) * 0.2

			nr := uint8(float64(backgroundColor.R)*(1-alpha) + float64(brightness)*alpha)
			ng := uint8(float64(backgroundColor.G)*(1-alpha) + float64(brightness)*alpha)
			nb := uint8(float64(backgroundColor.B)*(1-alpha) + float64(brightness)*alpha)

			img.Set(x, y, color.RGBA{R: nr, G: ng, B: nb, A: 255})
		}
	}

	f, err := os.Create("../assets/images/background.jpg")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	opts := &jpeg.Options{Quality: 95}

	if err := jpeg.Encode(f, img, opts); err != nil {
		panic(err)
	}
}
