import { View, Text, Input } from '@tarojs/components'
import './index.scss'

export const PornHubInput = ({ label = '', defaultValue = 'Porn', onChange }) => {
  const onInput = evt => onChange(evt.detail.value)

  return (
    <View className="pornhub-input">
      <Text className="pornhub-input-label">{label}</Text>
      <Input
        className="pornhub-input-inner"
        maxLength={5}
        placeholder="输入字符"
        onInput={onInput}
        value={defaultValue}
      ></Input>
    </View>
  )
}
