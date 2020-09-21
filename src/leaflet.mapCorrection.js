//坐标转换
L.CoordConver = function () {

    /**百度转84*/
    this.bd09_To_gps84 = function(lng, lat) {
        var gcj02 = this.bd09_To_gcj02(lng, lat);
        var map84 = this.gcj02_To_gps84(gcj02.lng, gcj02.lat);
        return map84;
    }
    /**84转百度*/
    this.gps84_To_bd09 = function (lng, lat) {
        var gcj02 = this.gps84_To_gcj02(lng, lat);
        var bd09 = this.gcj02_To_bd09(gcj02.lng, gcj02.lat);
        return bd09;
    }
    /**84转火星*/
    this.gps84_To_gcj02 = function (lng, lat) {
        var dLat = transformLat(lng - 105.0, lat - 35.0);
        var dLng = transformLng(lng - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * pi;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        var mgLat = lat + dLat;
        var mgLng = lng + dLng;
        var newCoord = {
            lng: mgLng,
            lat: mgLat
        };
        return newCoord;
    }
    /**火星转84*/
    this.gcj02_To_gps84 = function (lng, lat) {
        var coord = transform(lng, lat);
        var lontitude = lng * 2 - coord.lng;
        var latitude = lat * 2 - coord.lat;
        var newCoord = {
            lng: lontitude,
            lat: latitude
        };
        return newCoord;
    }
    /**火星转百度*/
    this.gcj02_To_bd09 = function (x, y) {
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        var newCoord = {
            lng: bd_lng,
            lat: bd_lat
        };
        return newCoord;
    }
    /**百度转火星*/
    this.bd09_To_gcj02 = function (bd_lng, bd_lat) {
        var x = bd_lng - 0.0065;
        var y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        var gg_lng = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        var newCoord = {
            lng: gg_lng,
            lat: gg_lat
        };
        return newCoord;
    }

    var pi = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var x_pi = pi * 3000.0 / 180.0;
    var R = 6378137;

    function transform(lng, lat) {
        var dLat = transformLat(lng - 105.0, lat - 35.0);
        var dLng = transformLng(lng - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * pi;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        var mgLat = lat + dLat;
        var mgLng = lng + dLng;
        var newCoord = {
            lng: mgLng,
            lat: mgLat
        };
        return newCoord;
    }

    function transformLat(x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLng(x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }
}

L.coordConver = function () {
    return new L.CoordConver()
}

L.tileLayer.chinaProvider = function (type, options) {
    options = options || {}
    options.corrdType = getCorrdType(type);
    return new L.TileLayer.ChinaProvider(type, options);

    //获取坐标类型
    function getCorrdType(type) {
        var parts = type.split('.');
        var providerName = parts[0];
        var zbName = "wgs84"
        switch (providerName) {
            case "Geoq":
            case "GaoDe":
            case "Google":
                zbName = "gcj02";
                break;
            case "Baidu":
                zbName = "bd09";
                break;
            case "OSM":
            case "TianDiTu":
                zbName = "wgs84";
                break;
        }
        return zbName;
    }
};

L.GridLayer.include({
    _setZoomTransform: function (level, _center, zoom) {
        var center = _center;
        if (center != undefined && this.options) {
            if (this.options.corrdType == 'gcj02') {
                center = L.coordConver().gps84_To_gcj02(_center.lng, _center.lat);
            } else if (this.options.corrdType == 'bd09') {
                center = L.coordConver().gps84_To_bd09(_center.lng, _center.lat);
            }
        }
        var scale = this._map.getZoomScale(zoom, level.zoom),
            translate = level.origin.multiplyBy(scale)
            .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

        if (L.Browser.any3d) {
            L.DomUtil.setTransform(level.el, translate, scale);
        } else {
            L.DomUtil.setPosition(level.el, translate);
        }
    },
    _getTiledPixelBounds: function (_center) {
        var center = _center;
        if (center != undefined && this.options) {
            if (this.options.corrdType == 'gcj02') {
                center = L.coordConver().gps84_To_gcj02(_center.lng, _center.lat);
            } else if (this.options.corrdType == 'bd09') {
                center = L.coordConver().gps84_To_bd09(_center.lng, _center.lat);
            }
        }
        var map = this._map,
            mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
            scale = map.getZoomScale(mapZoom, this._tileZoom),
            pixelCenter = map.project(center, this._tileZoom).floor(),
            halfSize = map.getSize().divideBy(scale * 2);

        return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
    }
})