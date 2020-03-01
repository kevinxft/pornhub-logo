import { View, Text } from '@tarojs/components'
import { ColorPicker } from '../color-picker'
import { useState } from '@tarojs/taro'
import './index.scss'
export const ColorBlock = ({ label, defaultHex, onChange }) => {
  const [show, setShow] = useState(false)
  const [hex, setHex] = useState(defaultHex)
  const hideDialog = () => setShow(false)
  const onSelectedColor = color =>  {
    setHex(color.hex)
    onChange(color.hex)
  }
  return (
    <View className="color-block">
      <View className="color-block-item">
        <Text className="color-block-label">{label}</Text>
        <View onClick={() => setShow(true)} className="color-block-preview" style={{ backgroundColor: hex }}></View>
      </View>
      {show && <ColorPicker onSelectedColor={onSelectedColor} callback={hideDialog}></ColorPicker>}
    </View>
  )
}
