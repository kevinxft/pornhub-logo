import { View, MovableArea, MovableView } from '@tarojs/components'
import './index.scss'

export const ColorPicker = ({ onChangePointer }) => {
  const converToColor = () => {}

  const onChange = evt => {
    const { x, y } = evt.detail
    console.log({ x, y })
  }

  return (
    <View className="color-picker">
      <View className="color-picker-area">
        <MovableArea className="movable-area">
          <MovableView className="movable-area-pointer" onChange={onChange} direction="all"></MovableView>
        </MovableArea>
        <View className="color-picker-map">
          <View className="color-picker-map-item solid"></View>
          <View className="color-picker-map-item white"></View>
          <View className="color-picker-map-item black"></View>
        </View>
      </View>
      <View className="color-picker-bar">
        <MovableArea className="movable-area">
          <MovableView className="movable-area-pointer" onChange={onChange} direction="horizontal"></MovableView>
        </MovableArea>
        <View className="color-picker-bar-color"></View>
      </View>
    </View>
  )
}
