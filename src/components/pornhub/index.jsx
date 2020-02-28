import { View, Text } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import { PornHubInput } from '../input'
import { PornHubSlider } from '../slider'
import { PornHubSwitch } from '../switch'
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
        <View className="pornhub-form-item">
          <PornHubInput label="前缀:" defaultValue={prefixText} onChange={setPrefixText}></PornHubInput>
        </View>
        <View className="pornhub-form-item">
          <PornHubInput label="后缀:" defaultValue={suffixText} onChange={setSuffixText}></PornHubInput>
        </View>
        <View className="pornhub-form-item slider-item">
          <PornHubSlider defaultValue={fontSize} onChange={setFontSize}></PornHubSlider>
        </View>
        <View className="pornhub-form-item slider-item">
          <PornHubSwitch></PornHubSwitch>
        </View>
      </View>
    </View>
  )
}
