import { View, Text, Input } from '@tarojs/components'
import './index.scss'

export const PornHubInput = ({ label = '', defaultValue = 'Porn', onChange }) => {
  const onInput = evt => onChange(evt.detail.value)

  return (
    <View className="porn-hub-input">
      <Text className="pron-hub-input-label">{label}</Text>
      <Input className="porn-hub-input-inner" placeholder="输入字符" onInput={onInput} value={defaultValue}></Input>
    </View>
  )
}
