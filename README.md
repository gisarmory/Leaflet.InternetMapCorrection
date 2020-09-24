# Leaflet.InternetMapCorrection
Leaflet 国内互联网地图纠偏插件。

## 简介：

leaflet有一个加载互联网地图的插件[Leaflet.ChineseTmsProviders](https://github.com/htoooth/Leaflet.ChineseTmsProviders)，可以轻松实现加载高德、百度、天地图、谷歌等在线地图瓦片，但并没有去解决它们的偏移问题。

网上流传着一份wgs84坐标、国测局坐标（又名火星坐标）和百度坐标之间相互转换的公开算法。通常我们会把这个算法封装成一个接口，在向地图加载数据时，通过接口进行坐标转换，再将转换后的数据添加到地图上。这种方式虽然能解决地图偏移的问题，但很繁琐，每次都要去手动转换，不够优雅。

于是我们决定写一个插件，让它去自动完成坐标转换，不用每次都写代码手动转换坐标的那种。原理就是对地图瓦片进行纠偏，在leaflet加载地图瓦片时，通过转换算法，重新计算每一张地图瓦片的位置。转换后的坐标为wgs84坐标。

最终，我们实现了只需要引入Leaflet.InternetMapCorrection.js插件，就能对互联网底图自动纠偏的效果。

## 用法：

在html文件中，先引入leaflet.ChineseTmsProviders.js插件，并按照它的[使用方法](https://github.com/htoooth/Leaflet.ChineseTmsProviders)加载地图。再引入Leaflet.InternetMapCorrection.js插件，对地图进行自动纠偏。

## 示例：

~~~ html
    <!-- 引入leafletapi -->
    <link rel="stylesheet" href="./lib/leaflet.css" />
    <script src="./lib/leaflet.js"></script>

    <!-- 引入互联网地图插件 -->
    <script src="./lib/plugins/leaflet.ChineseTmsProviders.js"></script>

    <!-- 引入互联网地图纠偏插件 -->
    <script type="text/javascript" src='../dist/leaflet.mapCorrection.min.js'></script>
~~~

~~~ js
	//初始化地图
	var map = L.map('map', {
            center: [39.905530, 116.391305],
            zoom: 17
        });

    //添加底图
    L.tileLayer.chinaProvider('GaoDe.Normal.Map').addTo(map);

	//添加纠偏参照物
    L.marker([39.905530,116.391305]).addTo(map).bindPopup('<p>我是WGS84坐标下，天安门广场国旗所在位置</p>').openPopup();
~~~

下面是常用地图纠偏的在线示例：

[百度地图](http://gisarmory.xyz/Leaflet.InternetMapCorrection/examples/indexBaidu.html)

[高德地图](http://gisarmory.xyz/Leaflet.InternetMapCorrection/examples/indexGaoDe.html)

[天地图](http://gisarmory.xyz/Leaflet.InternetMapCorrection/examples/indexTianDiTu.html)

[谷歌地图](http://gisarmory.xyz/Leaflet.InternetMapCorrection/examples/indexGoogle.html)

[OpenStreetMap](http://gisarmory.xyz/Leaflet.InternetMapCorrection/examples/indexOSM.html)

[Geoq](http://gisarmory.xyz/Leaflet.InternetMapCorrection/examples/indexGeoq.html)

## 君子协议
只要star本库，并关注公众号“GIS兵器库”，你就可以免费使用此插件。公众号二维码：

![](http://blogimage.gisarmory.xyz/20200923063756.png)

（若上方二维码无法显示，点此链接 [GIS兵器库](http://blogimage.gisarmory.xyz/20200923063756.png) ）

## 相关链接

[Leaflet](https://leafletjs.com/index.html)

[Leaflet.ChineseTmsProviders](https://github.com/htoooth/Leaflet.ChineseTmsProviders)

## 免责声明

该插件中集成的纠偏算法，是基于网络上公开已知的，其他语言算法实现的移植版本，作者不对其准确性和合法性做保证。**请在遵守国家保密法的前提下自行斟酌使用**。