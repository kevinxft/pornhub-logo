import { Slider, Text } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import './index.scss'

export const PornHubSlider = ({
  min = 40,
  max = 130,
  defaultValue = 60,
  color = '#FFF',
  activeColor = '#FF9900',
  blockSize = 20,
  blockColor = '#FFF',
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue)
  const onSlider = evt => {
    const value = evt.detail.value
    setValue(value)
    onChange(value)
  }

  return (
    <View className="pornhub-slider">
      <View>
        <Slider
          min={min}
          max={max}
          color={color}
          value={defaultValue}
          activeColor={activeColor}
          onChange={onSlider}
          block-size={blockSize}
          block-color={blockColor}
        ></Slider>
        <View className="pornhub-slider-tips">
          当前字体大小为：
          <Text className="pornhub-slider-value">{value}px</Text>
        </View>
      </View>
    </View>
  )
}
