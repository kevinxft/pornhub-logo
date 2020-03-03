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
  const [transparency, setTransparency] = useState(false)

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
    transparency,
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
      {prefixText.length + suffixText.length >= 8 && fontSize > 110 && (
        <View style={{ marginTop: '20rpx', textAlign: 'center', color: '#909399' }}>
          假使预览图出现换行，生成的图片也不会换行。
        </View>
      )}
      <View className="pornhub-form">
        <View
          className="pornhub-form-item"
          style={{ padding: '0 50rpx', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <PornHubInput label="前缀:" defaultValue={prefixText} onChange={setPrefixText}></PornHubInput>
          <PornHubInput label="后缀:" defaultValue={suffixText} onChange={setSuffixText}></PornHubInput>
        </View>
        <View className="pornhub-form-item slider-item">
          <PornHubSlider defaultValue={fontSize} onChange={setFontSize}></PornHubSlider>
        </View>
        <View className="pornhub-form-item" style={{ textAlign: 'center', padding: 0 }}>
          <ColorBlock onChange={setPrefixColor} label="前綴颜色" defaultHex="#FFFFFF"></ColorBlock>
          <ColorBlock onChange={setSuffixColor} label="后綴颜色" defaultHex="#000000"></ColorBlock>
          <ColorBlock onChange={setSuffixBackgroundColor} label="后缀背景" defaultHex="#FF9900"></ColorBlock>
        </View>
        <View className="pornhub-form-item" style={{ textAlign: 'center', padding: 0 }}>
          <PornHubSwitch onSwitchChange={setReverse}></PornHubSwitch>
          <PornHubSwitch label="透明背景" onSwitchChange={setTransparency}></PornHubSwitch>
        </View>
        <View className="pornhub-form-item" style={{ marginTop: '80rpx' }}>
          <Drawer drawerConfig={drawerConfig}></Drawer>
        </View>
      </View>
    </View>
  )
}
