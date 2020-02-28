import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { PornHub } from "../../components/pornhub";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "PornHub Logo",
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: "white",
    backgroundTextStyle: "dark"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <PornHub></PornHub>
      </View>
    );
  }
}
