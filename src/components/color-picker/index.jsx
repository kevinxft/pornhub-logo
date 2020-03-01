import { View, MovableArea, MovableView, Button } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import { rgbToHex } from '../../utils'
import './index.scss'

export const ColorPicker = ({ onSelectedColor, callback }) => {
  const [hue, setHue] = useState({
    red: 255,
    green: 0,
    blue: 0,
  })
  const [color, setColor] = useState({ red: 0, green: 0, blue: 0, hex: '#ffffff' })
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const _setHue = payload => {
    setHue(payload)
    onChangeColor()
  }

  const onSubmitColor = () => {
    onSelectedColor(color)
    callback()
  }

  const onChangePointer = evt => {
    const { x, y } = evt.detail
    setPointer({ x, y })
    onChangeColor()
  }

  const onChangeColor = () => {
    const { x, y } = pointer
    let [red, green, blue] = [0, 0, 0]
    if (hue.red === 255) {
      const greenRatioX = (255 - hue.green) / 255
      const blueRatioX = (255 - hue.blue) / 255
      const greenValueX = 255 - x * greenRatioX
      const blueValueX = 255 - x * blueRatioX
      red = 255
      green = Math.round(Math.max(greenValueX, green))
      blue = Math.round(Math.max(blueValueX, blue))
    }

    if (hue.green === 255) {
      const redRatioX = (255 - hue.red) / 255
      const blueRatioX = (255 - hue.blue) / 255
      const redValueX = 255 - x * redRatioX
      const blueValueX = 255 - x * blueRatioX
      red = Math.round(Math.max(redValueX, red))
      green = 255
      blue = Math.round(Math.max(blueValueX, blue))
    }

    if (hue.blue === 255) {
      const redRatioX = (255 - hue.red) / 255
      const greenRatioX = (255 - hue.green) / 255
      const redValueX = 255 - x * redRatioX
      const greenValueX = 255 - x * greenRatioX
      red = Math.round(Math.max(redValueX, green))
      green = Math.round(Math.max(greenValueX, green))
      blue = 255
    }

    const redRatioY = red / 255
    const greenRatioY = green / 255
    const blueRatioY = blue / 255

    const redValueY = y * redRatioY
    const greenValueY = y * greenRatioY
    const blueValueY = y * blueRatioY

    red = Math.round(red - redValueY)
    green = Math.round(green - greenValueY)
    blue = Math.round(blue - blueValueY)
    setColor({
      red,
      green,
      blue,
      hex: rgbToHex(red, green, blue),
    })
  }

  const onChangeHue = evt => {
    const { x } = evt.detail
    const offset = 37
    const step = 0.145
    if (x < offset) {
      const value = Math.round(Math.min(x / step, 255))
      _setHue({
        red: 255,
        green: value,
        blue: 0,
      })
      return
    }

    if (x >= offset && x < offset * 2) {
      let value = (x - offset) / step
      value = Math.round(Math.min(value, 255))
      _setHue({
        red: 255 - value,
        green: 255,
        blue: 0,
      })
      return
    }

    if (x >= offset * 2 && x < offset * 3) {
      let value = (x - offset * 2) / step
      value = Math.round(Math.min(value, 255))
      _setHue({
        red: 0,
        green: 255,
        blue: value,
      })
      return
    }

    if (x >= offset * 3 && x < offset * 4) {
      let value = (x - offset * 3) / step
      value = Math.round(Math.min(value, 255))
      _setHue({
        red: 0,
        green: 255 - value,
        blue: 255,
      })
      return
    }

    if (x >= offset * 4 && x < offset * 5) {
      let value = (x - offset * 4) / step
      value = Math.round(Math.min(value, 255))
      _setHue({
        red: value,
        green: 0,
        blue: 255,
      })
      return
    }

    if (x >= offset * 5) {
      let value = (x - offset * 5) / step
      value = Math.round(Math.min(value, 255))
      _setHue({
        red: 255,
        green: 0,
        blue: 255 - value,
      })
      return
    }
  }

  return (
    <View className="color-picker-dialog">
      <View className="color-picker-dialog-wrapper">
        <View className="color-picker-preview">
          <View className="color-picker-preview-font">颜色: {color.hex}</View>
          <View className="color-picker-preview-block" style={{ backgroundColor: color.hex }}></View>
        </View>
        <View className="color-picker">
          <View className="color-picker-area">
            <MovableArea className="movable-area">
              <MovableView className="movable-area-pointer" onChange={onChangePointer} direction="all"></MovableView>
            </MovableArea>
            <View className="color-picker-map">
              <View
                className="color-picker-map-item solid"
                style={{ backgroundColor: `rgb(${hue.red},${hue.green},${hue.blue})` }}
              ></View>
              <View className="color-picker-map-item white"></View>
              <View className="color-picker-map-item black"></View>
            </View>
          </View>
        </View>
        <View className="color-picker-bar">
          <MovableArea className="movable-area">
            <MovableView className="movable-area-pointer" onChange={onChangeHue} direction="horizontal"></MovableView>
          </MovableArea>
          <View className="color-picker-bar-color"></View>
        </View>

        <View className="color-picker-dialog-footer">
          <Button onClick={onSubmitColor} className="color-picker-dialog-button confirm-button">
            确定
          </Button>
          <Button onClick={() => callback()} className="color-picker-dialog-button">
            取消
          </Button>
        </View>
      </View>
    </View>
  )
}
