/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import './style.module.scss'

const AmapPage = () => {
  let map = ''

  useEffect(() => {
    initAmap()
  }, [])

  const initAmap = () => {
    map = new AMap.Map('amap_container', {
      zoom: 11, //级别
      center: [116.397428, 39.90923], //中心点坐标
      viewMode: '3D', //使用3D视图
    })
  }

  return <div className="amap_container">地图</div>
}

export default AmapPage
