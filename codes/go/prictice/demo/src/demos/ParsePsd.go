package demos

import (
	"fmt"
	"image/png"
	"os"

	"utils"

	"strings"

	"github.com/solovev/gopsd"
)

func ParsePsd(fname string) {
	doc, err := gopsd.ParseFromPath("./psdParse/" + fname + ".psd")
	utils.CheckError(err)

	for _, layer := range doc.Layers {
		//lys := getLayersByGroup(layer)
		fmt.Println("layer group?::", layer.ToString(), isGroup(layer))
		if isGroup(layer) {
			continue
		}
		saveAsPng(layer)
		/*
			for _, ily := range lys {
				fmt.Println("Layer::", ily.ToString())
				saveAsPng(layer)
			}
		*/
	}
}

func isGroup(layer *gopsd.Layer) bool {
	s := layer.ToString()
	return strings.Contains(s, "group")
}

func getLayersByGroup(layer *gopsd.Layer) []*gopsd.Layer {
	r := make([]*gopsd.Layer, 10)
	if layer.IsSceneGroup {
		for _, ilayer := range layer.Children {
			r = append(r, ilayer)
		}
	} else {
		r = append(r, layer)
	}
	return r
}

// private
func saveAsPng(layer *gopsd.Layer) {
	out, err := os.Create("./psdParse/images/" + layer.Name + ".png")
	utils.CheckError(err)

	img, err := layer.GetImage()
	utils.CheckError(err)

	err = png.Encode(out, img)
	utils.CheckError(err)
}
