# Leaflet.InternetMapCorrection
Leaflet 国内互联网地图纠偏插件。

leaflet有一个加载互联网地图的插件[Leaflet.ChineseTmsProviders](https://github.com/htoooth/Leaflet.ChineseTmsProviders)，可以轻松实现加载高德、百度、天地图、谷歌等在线地图瓦片。但并没有去解决它们的偏移问题。网上流传着一份wgs84坐标、国测局坐标（又名火星坐标）和百度坐标之间相互转换的公开算法。Leaflet.InternetMapCorrection 插件集成了这个算法，对Leaflet.ChineseTmsProviders加载的地图瓦片进行了纠偏处理。最终实现了对地图的自动纠偏。

在html文件中，先引入leaflet.js api和 leaflet.ChineseTmsProviders.js插件，再引入Leaflet.InternetMapCorrection.js插件。然后按Leaflet.ChineseTmsProviders的[使用方法](https://github.com/htoooth/Leaflet.ChineseTmsProviders)去正常加载地图，Leaflet.InternetMapCorrection无需编写js代码，就可以实现对地图的自动纠偏。

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
	//添加参照物
    L.marker([39.905530,116.391305]).addTo(map).bindPopup('<p>我是WGS84坐标下，天安门广场国旗所在位置</p>').openPopup();
~~~

下面加载多种地图的完整示例：



## 相关链接

[Leaflet](https://leafletjs.com/index.html)

[Leaflet.ChineseTmsProviders](https://github.com/htoooth/Leaflet.ChineseTmsProviders)

## 免责声明

该插件中集成的纠偏算法，是基于网络上公开已知的，其他语言算法实现的移植版本，作者不对其准确性和合法性做保证。**请在遵守国家保密法的前提下自行斟酌使用**。