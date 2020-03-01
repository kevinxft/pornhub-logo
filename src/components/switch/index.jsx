import { View, Text, Switch } from '@tarojs/components'
import './index.scss'

export const PornHubSwitch = ({ onSwitchChange }) => {
  const onSwitch = evt => onSwitchChange(evt.detail.value)

  return (
    <View className="pornhub-switch">
      <Text className="pornhub-switch-tips">翻转前后样式</Text>
      <Switch onChange={onSwitch} color="#FF9900"></Switch>
    </View>
  )
}
