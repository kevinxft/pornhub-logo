import { View, Button } from '@tarojs/components'
import { useState, useEffect } from '@tarojs/taro'
import CanvasDrawer from '../taro-canvas'
import './index.scss'

export const Drawer = ({ drawerConfig, buttonConfig = { show: true, color: '#000', backgroundColor: '#FF9900' } }) => {
  const { show, ...btnConfig } = buttonConfig
  const [config, setConfig] = useState({})
  const [drawing, setDrawing] = useState(false)
  useEffect(() => {
    const config = initConfig(drawerConfig)
    setConfig(config)
    setDrawing(true)
  }, [drawerConfig])

  const initConfig = drawerConfig => {
    const ctx = wx.createCanvasContext()
    let { fontSize, prefixColor, prefixText, reverse, suffixBackgroundColor, suffixColor, suffixText } = drawerConfig
    ctx.setFontSize(fontSize)
    const width = ctx.measureText(`${prefixText}  ${suffixText}`).width + 40
    const height = fontSize * 1.5

    const prefixWidth = ctx.measureText(prefixText).width
    const suffixWidth = ctx.measureText(suffixText).width

    const _config = {
      debug: true,
      width,
      height,
      blocks: [
        {
          x: prefixWidth + 20,
          y: 10,
          width: reverse ? prefixWidth : suffixWidth + 30,
          height,
          backgroundColor: suffixBackgroundColor,
          borderRadius: 20,
        },
      ],
      texts: [
        {
          x: 10,
          y: fontSize,
          text: prefixText,
          fontSize: fontSize,
          fontWeight: 'bold',
          color: prefixColor,
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: fontSize * 1.5,
          zIndex: 999,
        },
        {
          x: prefixWidth + 30,
          y: fontSize,
          text: suffixText,
          fontSize: fontSize,
          fontWeight: 'bold',
          color: suffixColor,
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: fontSize * 1.5,
          zIndex: 999,
        },
      ],
    }
    return _config
  }

  const onCreateSuccess = result => {
    return
    const { tempFilePath, errMsg } = result
    if (errMsg === 'canvasToTempFilePath:ok') {
      Taro.saveImageToPhotosAlbum({
        filePath: tempFilePath,
      })
        .then(res => {
          Taro.hideLoading()
          if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
            Taro.showToast({
              title: '保存图片成功',
              icon: 'none',
              duration: 2000,
            })
            setDrawing(false)
          }
        })
        .catch(error => {
          if (error.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
            Taro.showToast({ icon: 'none', title: '请授予程序保存图片的功能' })
          } else {
            Taro.showToast({ icon: 'none', title: '保存出错' })
          }
          setDrawing(false)
          Taro.hideLoading()
        })
    }
  }
  const onCreateFail = e => Taro.showToast('绘制失败')

  const saveImg = () => {
    // Taro.showLoading({
    //   title: '保存中',
    // })
    setDrawing(false)
    setTimeout(() => {
      const config = initConfig(drawerConfig)
      setConfig(config)
      setDrawing(true)
    }, 500)
  }

  return (
    <View className="canvas-drawer">
      {drawing && (
        <CanvasDrawer config={config} onCreateSuccess={onCreateSuccess} onCreateFail={onCreateFail}></CanvasDrawer>
      )}
      {show && (
        <Button onClick={saveImg} style={{ ...btnConfig }}>
          保存图片
        </Button>
      )}
    </View>
  )
}
