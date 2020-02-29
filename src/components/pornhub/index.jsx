import { View, Text } from '@tarojs/components'
import { useState, useEffect } from '@tarojs/taro'
import { PornHubInput } from '../input'
import { PornHubSlider } from '../slider'
import { PornHubSwitch } from '../switch'
import { ColorPicker } from '../color-picker'
import './index.scss'

export const PornHub = ({
  prefixColor = '#FFF',
  suffixColor = '#000',
  suffixBackgroundColor = '#FF9900',
  reverse = false,
}) => {
  const [prefixText, setPrefixText] = useState('Porn')
  const [suffixText, setSuffixText] = useState('Hub')
  const [fontSize, setFontSize] = useState(60)
  const [ratio, setRatio] = useState(1)
  useEffect(() => {
    wx.getSystemInfo({
      success(res) {
        console.log(res)
        setRatio(res.screenWidth / 750)
      }
    })
  }, [setRatio])

  const prefixStyle = {
    color: prefixColor,
  }

  const suffixStyle = {
    color: suffixColor,
    backgroundColor: suffixBackgroundColor,
  }

  const leftStyle = reverse ? suffixStyle : prefixStyle
  const rightStyle = !reverse ? suffixStyle : prefixStyle

  return (
    <View className="pornhub-container">
      <View className="pornhub">
        <View className="pornhub-logo" style={{ fontSize: `${fontSize}rpx` }}>
          <View className="pornhub-left" style={leftStyle}>
            <Text>{prefixText}</Text>
          </View>
          <View className="pornhub-right" style={rightStyle}>
            <Text>{suffixText}</Text>
          </View>
        </View>
      </View>
      <View className="pornhub-form">
        {/* <View className="pornhub-form-item">
          <PornHubInput label="前缀:" defaultValue={prefixText} onChange={setPrefixText}></PornHubInput>
        </View>
        <View className="pornhub-form-item">
          <PornHubInput label="后缀:" defaultValue={suffixText} onChange={setSuffixText}></PornHubInput>
        </View>
        <View className="pornhub-form-item slider-item">
          <PornHubSlider defaultValue={fontSize} onChange={setFontSize}></PornHubSlider>
        </View> */}
        <View className="pornhub-form-item">
          <PornHubSwitch></PornHubSwitch>
        </View>
        <View className="pornhub-form-item" style={{ padding: 0 }}>
          <ColorPicker></ColorPicker>
        </View>
      </View>
    </View>
  )
}
