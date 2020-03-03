import { View, Text, Switch } from '@tarojs/components'
import './index.scss'

export const PornHubSwitch = ({ label = '反转样式', onSwitchChange }) => {
  const onSwitch = evt => onSwitchChange(evt.detail.value)

  return (
    <View className="pornhub-switch">
      <Text className="pornhub-switch-tips">{label}</Text>
      <Switch onChange={onSwitch} color="#FF9900"></Switch>
    </View>
  )
}
