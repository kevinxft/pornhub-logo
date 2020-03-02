import { View, Text, Button } from '@tarojs/components'
import { useState } from '@tarojs/taro'
import { PornHubInput } from '../input'
import { PornHubSlider } from '../slider'
import { PornHubSwitch } from '../switch'
import { ColorBlock } from '../color-block'
import { Drawer } from '../drawer'
import { DrawerLogo } from '../drawer-logo'
import './index.scss'

export const PornHub = () => {
  const [prefixText, setPrefixText] = useState('Porn')
  const [suffixText, setSuffixText] = useState('Hub')
  const [fontSize, setFontSize] = useState(60)
  const [reverse, setReverse] = useState(false)

  const [prefixColor, setPrefixColor] = useState('#FFFFFF')
  const [suffixColor, setSuffixColor] = useState('#000000')
  const [suffixBackgroundColor, setSuffixBackgroundColor] = useState('#FF9900')

  const prefixStyle = {
    color: prefixColor,
  }

  const suffixStyle = {
    color: suffixColor,
    backgroundColor: suffixBackgroundColor,
    padding: '10rpx 20rpx',
    borderRadius: '10rpx',
  }

  const leftStyle = reverse ? suffixStyle : prefixStyle
  const rightStyle = !reverse ? suffixStyle : prefixStyle

  const drawerConfig = {
    fontSize,
    prefixText,
    prefixColor,
    suffixText,
    suffixColor,
    suffixBackgroundColor,
    reverse,
  }
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
        </View> */}
        <View className="pornhub-form-item slider-item">
          <PornHubSlider defaultValue={fontSize} onChange={setFontSize}></PornHubSlider>
        </View>
        <View className="pornhub-form-item" style={{ textAlign: 'center', marginTop: '50rpx', padding: 0 }}>
          <ColorBlock onChange={setPrefixColor} label="前綴颜色" defaultHex="#FFFFFF"></ColorBlock>
          <ColorBlock onChange={setSuffixColor} label="后綴颜色" defaultHex="#000000"></ColorBlock>
          <ColorBlock onChange={setSuffixBackgroundColor} label="背景颜色" defaultHex="#FF9900"></ColorBlock>
        </View>
        <View className="pornhub-form-item" style={{ marginTop: '50rpx' }}>
          <PornHubSwitch onSwitchChange={setReverse}></PornHubSwitch>
        </View>
        <View className="pornhub-form-item" style={{ marginTop: '80rpx' }}>
          <Drawer drawerConfig={drawerConfig}></Drawer>
        </View>
      </View>
    </View>
  )
}
