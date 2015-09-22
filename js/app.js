/**
 * Created by xsirr on 22.09.2015.
 */
// ���������� ���������� ��� �����
var map, control;
//�������������� ������ ������ �����
var layers = new Array();
// �������� �������� ����������������� ����� �����
loadJSON('mapconfig.json',
    function (data) {
        var mps = data.mapproperties;
        varmap(mps, 0, mps.length);
    }
);
// �������� ��������� � ������ �����
/**@param alldata - ������ ������, ���������� �� ����� ��������
 * @param i - ������ ������� ������� � �������
 * @param l - ����� ������� (�� ���� �����)*/
function varmap(alldata, i, l) {
    var d = alldata[i];
    var center = d.center;
    var zoom = d.zoom;
    var minZoom = d.minZoom;
    var maxZoom = d.maxZoom;
    //������ ��������� �����
    map = L.map('map', {
        center: center,
        zoom: zoom,
        minZoom: minZoom,
        maxZoom: maxZoom
    });
    //�������� ������ ��� ����� � �������� ������� �������� �����
    loadJSON('layersconfig.json', function (data) {
        loadLayers(data);
    });
}
/**
 * ��������� �� ������� � ����������� ��� ����
 * � ����������� �� ���� ���� ������ ����� �������������� ���� � ������������ ���
 * @param data - ������ ������, ���������� �� ����� �������� �����*/
function loadLayers(data) {
    control = L.control.layers({}, {});
    control.addTo(map);
    var layersJSON = data.layers;
    $.each(layersJSON, function (key, value) {
        switch (value.layertypefunction) {
            case "ltilelayer":
                //��������� � ������ ����� ����� ���� �� ������� value.layercodename
                layers[value.layercodename] = L.tileLayer(value.pathto, {});
                //������������ ����
                layers[value.layercodename];
                loadLayerControl(value);
                break;
            case "casual":
                loadJSON(value.pathto, function (data) {
                    var points = data.points;
                    //��������� � ������ ����� ����� ���� �� ������� value.layercodename
                    layers[value.layercodename] = L.polyline(points, {
                        color: value.color,
                        width: value.width
                    });
                    loadLayerControl(value);
                });
                break;
            default:
                alert("Not match layerType!");
                break;
        }
    });
};
function loadLayerControl(layer) {
    switch (layer.layertype) {
        case "basemap":
            //��������� ���� �� array � �������
            control.addBaseLayer(layers[layer.layercodename], layer.layername);
            break;
        case "overlay":
            //��������� ���� �� array � �������
            control.addOverlay(layers[layer.layercodename], layer.layername);
            break;
        default:
            alert("Not match layerType!");
            break;
    }
}
/**
 * @param path - ���� �� ����� �������
 * @param success - ������� (callback), ������� ��������� ��� �������� �������� �����
 * @param error - ������� (callback), ������� ��������� ��� ������ ��������*/
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}