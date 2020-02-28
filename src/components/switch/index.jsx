import { View, Text, Switch } from '@tarojs/components'
import './index.scss'

export const PornHubSwitch = ({ color = '#FF9900', onChange }) => {
  const onSwitch = evt => console.log(evt.detail.value)
  return (
    <View className="pornhub-switch">
      <Text className="pornhub-switch-tips">翻转前后样式</Text>
      <Switch onChange={onSwitch} color={color}></Switch>
    </View>
  )
}
