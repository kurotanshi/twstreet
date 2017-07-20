"use strict";

(function() {
    var e = "images/cover2.png", t, a, o = 100, n = 1, i = "AIzaSyBxKtiOh3lYNzXBI6jjjC_oOGaqF1Z6Uy0", s = function e(t, a) {
        var o = {}, n = 0, i = 0;
        for (var s in t) o[s] = new Image(), o[s].onload = function() {
            ++n >= i && a(o);
        }, o[s].src = t[s];
    };
    function r(e, o) {
        var n = document.getElementById("address").value;
        e.geocode({
            address: n
        }, function(e, o) {
            o === google.maps.GeocoderStatus.OK ? (t.panTo(e[0].geometry.location), a.setPosition(e[0].geometry.location), 
            g(e[0].geometry.location.lat(), e[0].geometry.location.lng())) : alert("此地點無法解析.");
        });
    }
    var g = function t(a, r) {
        a = a || 25.04008086415386, r = r || 121.51134886402133;
        var g = document.getElementById("myCanvas"), l = g.getContext("2d"), c = {
            photo: e,
            stview: "https://maps.googleapis.com/maps/api/streetview?key=" + i + "&size=740x860&location=" + a + "," + r + "&heading=" + o + "&pitch=" + n
        };
        s(c, function(e) {
            l.drawImage(e.stview, 10, 70, 380, 500), l.drawImage(e.photo, 0, 0, 400, 554);
        }), $(".lat").val(a), $(".lng").val(r);
    };
    function l() {
        var e = new google.maps.Geocoder();
        t = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: {
                lat: 25.04008086415386,
                lng: 121.51134886402133
            },
            styles: [ {
                featureType: "poi",
                elementType: "labels",
                stylers: [ {
                    visibility: "off"
                } ]
            } ]
        }), a = new RichMarker({
            position: new google.maps.LatLng(25.04008086415386, 121.51134886402133),
            map: t,
            draggable: !0,
            content: '<div id="marker">\n      <img src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-09-48.png" alt="" />\n      <div class="handle"></div>\n    </div>'
        }), a.setShadow(0), $(".btn-go").on("click", function(a) {
            a.preventDefault(), r(e, t);
        });
    }
    window.onload = function(e) {
        l(), g(), google.maps.event.addListenerOnce(t, "idle", function() {
            var e = !1, t = 0, n = $("#marker"), i, s, r, l, c;
            $(".handle").on("mousedown", function(t) {
                t.preventDefault(), t.stopPropagation(), r = t.pageX, l = t.pageY, e = !0, n.data("origin") || n.data("origin", {
                    left: n.offset().left,
                    top: n.offset().top
                }), i = n.data("origin").left, s = n.data("origin").top, c = n.data("last_angle") || 0;
            }), $("#map").on({
                mousemove: function a(o) {
                    var g, d, p;
                    e && (d = o.pageX, p = o.pageY, d !== i && p !== s && (g = Math.atan2(p - s, d - i), 
                    g -= Math.atan2(l - s, r - i), g += c, t = (g * (360 / (2 * Math.PI))).toFixed(5), 
                    n.css("transform", "rotate(" + t + "deg)"), n.css("transform-origin", "50% 50%")));
                },
                mouseup: function d(p) {
                    e = !1;
                    var m = p.pageX, f = p.pageY, u = Math.atan2(f - s, m - i);
                    u -= Math.atan2(l - s, r - i), u += c, n && n.data("last_angle", u), o = t, g(a.getPosition().lat(), a.getPosition().lng());
                }
            });
        });
    };
})();
//# sourceMappingURL=map2-dist.js.map