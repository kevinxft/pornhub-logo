const rgbToHex = (r, g, b) => {
  let rgb = b | (g << 8) | (r << 16)
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

const hexToRgb = hex => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null
}

export { rgbToHex, hexToRgb }
