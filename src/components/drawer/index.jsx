import { View, Button } from '@tarojs/components'
import { useState, useEffect } from '@tarojs/taro'
import CanvasDrawer from '../taro-canvas'
import './index.scss'

const DEBUG = false

export const Drawer = ({ drawerConfig, buttonConfig = { show: true, color: '#000', backgroundColor: '#FF9900' } }) => {
  const { show, ...btnConfig } = buttonConfig
  const [config, setConfig] = useState({})
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    if (DEBUG) {
      const config = initConfig(drawerConfig)
      setConfig(config)
      setDrawing(true)
    }
  }, [])

  const initConfig = drawerConfig => {
    const ctx = wx.createCanvasContext()
    let {
      fontSize,
      prefixColor,
      prefixText,
      reverse,
      transparency,
      suffixBackgroundColor,
      suffixColor,
      suffixText,
    } = drawerConfig
    ctx.setFontSize(fontSize)
    const offsetWidth = reverse ? (130 - fontSize) / 3 : Math.max(Math.round(fontSize / 30) * 10, 40)
    const width = ctx.measureText(`${prefixText}  ${suffixText}`).width + offsetWidth
    const height = fontSize * 1.5

    const prefixWidth = ctx.measureText(prefixText).width
    const suffixWidth = ctx.measureText(suffixText).width

    const _config = {
      width,
      height,
      debug: DEBUG,
      blocks: [
        {
          x: reverse ? 10 : prefixWidth + 20,
          y: fontSize / 6,
          width: (reverse ? prefixWidth : suffixWidth) + 30,
          height,
          backgroundColor: suffixBackgroundColor,
          borderRadius: 20,
        },
      ],
      texts: [
        {
          x: reverse ? 20 : 10,
          y: fontSize,
          text: prefixText,
          fontSize: fontSize,
          fontWeight: 'bold',
          color: reverse ? suffixColor : prefixColor,
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: fontSize * 1.5,
          zIndex: 999,
        },
        {
          x: reverse ? prefixWidth + 40 : prefixWidth + 30,
          y: fontSize,
          text: suffixText,
          fontSize: fontSize,
          fontWeight: 'bold',
          color: reverse ? prefixColor : suffixColor,
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: fontSize * 1.5,
          zIndex: 999,
        },
      ],
    }
    const backgroundColor = DEBUG ? '#c9c9c9' : '#000'
    return transparency ? _config : { ..._config, backgroundColor }
  }

  const onCreateSuccess = result => {
    if (DEBUG) {
      Taro.hideLoading()
      return
    }
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
    if (DEBUG) {
      Taro.showLoading({
        title: '测试中',
      })
      setDrawing(false)
      setTimeout(() => {
        const config = initConfig(drawerConfig)
        setConfig(config)
        setDrawing(true)
      }, 500)
      return
    }

    if (drawing) {
      return
    }
    Taro.showLoading({
      title: '保存中',
    })
    setDrawing(false)
    setTimeout(() => {
      const config = initConfig(drawerConfig)
      setConfig(config)
      setDrawing(true)
    }, 500)
  }

  return (
    <View className="canvas-drawer">
      {show && (
        <Button onClick={saveImg} style={{ ...btnConfig }}>
          保存图片
        </Button>
      )}
      <View>
        {drawing && (
          <CanvasDrawer config={config} onCreateSuccess={onCreateSuccess} onCreateFail={onCreateFail}></CanvasDrawer>
        )}
      </View>
    </View>
  )
}
