export default function MapLoader() {   // <-- 原作者这里使用的是module.exports
    return new Promise((resolve, reject) => {
      if (window.AMap) {
        resolve(window.AMap)
      } else {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'https://webapi.amap.com/maps?v=1.4.14&callback=initAMap&key=845034693fe3ee8605331b318e5b5259&plugin=AMap.MarkerClusterer'
        script.onerror = reject
        document.head.appendChild(script)
      }
      window.initAMap = () => {
        resolve(window.AMap)
      }
    })
  }
