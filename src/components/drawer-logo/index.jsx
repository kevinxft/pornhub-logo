import { View, Button } from '@tarojs/components'
import Taro, { Component, useState, useEffect } from '@tarojs/taro'
import './index.scss'

export default class DrawerLog extends Component {
  constructor(props) {
    super(props)
    this.setState({
      drawing: false,
      width: 500,
      height: 300,
    })
  }

  componentWillReceiveProps(props) {
    this.getConfig(props)
  }

  getConfig(props) {
    const { drawerConfig } = props
    this.setState({
      config: drawerConfig,
    })
  }

  componentDidMount() {
    this.getConfig(this.props)
    this.drawLogo()
  }

  drawLogo() {
    const ctx = Taro.createCanvasContext('myCanvas', this.$scope)
    let {
      fontSize,
      prefixColor,
      prefixText,
      reverse,
      suffixBackgroundColor,
      suffixColor,
      suffixText,
    } = this.props.drawerConfig
    ctx.setFontSize(fontSize)
    const fontLen = prefixText.length + suffixText.length + 1
    this.setState({
      width: fontSize * fontLen,
      height: fontSize * 2,
      drawing: true,
    })
    console.log({
      width: ctx.measureText(prefixText).width + ctx.measureText(suffixText).width + 100,
      height: fontSize * 2,
    })
    ctx.setFillStyle(prefixColor)
    ctx.fillText(prefixText, 0, fontSize)
    ctx.setFillStyle(suffixColor)
    ctx.fillText(suffixText, 120, fontSize)
    ctx.draw(false)
  }

  save() {
    console.log('save')
    this.drawLogo()
  }

  render() {
    console.log('render')
    console.log(this.state)
    const { width, height, drawing } = this.state
    return (
      <View className="canvas-drawer">
        {
          <Canvas
            style={{ backgroundColor: '#c9c9c9', width: `${width}rpx`, height: `${height}rpx` }}
            canvasId="myCanvas"
          ></Canvas>
        }
        <Button onClick={this.save.bind(this)} style={{ backgroundColor: '#FF9900' }}>
          保存图片
        </Button>
      </View>
    )
  }
}
