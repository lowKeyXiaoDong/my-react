/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import './style.scss'
const AMap = window.AMap
let mapObj
let geolocation

const AmapPage = () => {
  useEffect(() => {
    initAmap()
  }, [])

  // * 初始化地图加载
  const initAmap = () => {
    mapObj = new AMap.Map('amap_container', {
      zoom: 15,
    })

    amapPosition()

    mapObj.on('moveend', mapMoveend)
  }

  // * 定位
  const amapPosition = () => {
    mapObj.plugin('AMap.Geolocation', function () {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      mapObj.addControl(geolocation)
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete) //返回定位信息
      AMap.event.addListener(geolocation, 'error', onError) //返回定位出错信息
    })
  }

  // * 定位成功
  const onComplete = (result) => {
    console.log(result, 'success')
    const { position } = result

    onMaeker(position.lng, position.lat)
  }

  // * 定位失败
  const onError = (error) => {
    console.log(error, 'error')
  }

  // * 地图描点
  const onMaeker = (lng, lat) => {
    console.log('进入');
    new AMap.Marker({
      position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    })
  }

  // * 拖拽结束
  const mapMoveend = (e) => {
    console.log(e, 'e');

    var center = mapObj.getCenter(); //获取当前地图级别

    console.log(center);

    onMaeker(center.lng, center.lat)
  }

  return <div id="amap_container"></div>
}

export default AmapPage
