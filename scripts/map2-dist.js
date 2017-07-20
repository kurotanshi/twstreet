"use strict";

(function() {
    var e = "images/cover2.png", t, o, a = 100, n = 1, i = "AIzaSyBxKtiOh3lYNzXBI6jjjC_oOGaqF1Z6Uy0", s = function e(t, o) {
        var a = {}, n = 0, i = 0;
        for (var s in t) a[s] = new Image(), a[s].onload = function() {
            ++n >= i && o(a);
        }, a[s].src = t[s];
    };
    function r(e, a) {
        var n = document.getElementById("address").value;
        e.geocode({
            address: n
        }, function(e, a) {
            a === google.maps.GeocoderStatus.OK ? (t.panTo(e[0].geometry.location), o.setPosition(e[0].geometry.location), 
            g(e[0].geometry.location.lat(), e[0].geometry.location.lng())) : alert("此地點無法解析.");
        });
    }
    var g = function t(o, r) {
        o = o || 25.04008086415386, r = r || 121.51134886402133;
        var g = document.getElementById("myCanvas"), l = g.getContext("2d"), c = {
            photo: e,
            stview: "https://maps.googleapis.com/maps/api/streetview?key=" + i + "&size=740x860&location=" + o + "," + r + "&heading=" + a + "&pitch=" + n
        };
        s(c, function(e) {
            l.drawImage(e.stview, 10, 70, 380, 500), l.drawImage(e.photo, 0, 0, 400, 554);
        }), $(".lat").val(o), $(".lng").val(r);
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
        }), o = new RichMarker({
            position: new google.maps.LatLng(25.04008086415386, 121.51134886402133),
            map: t,
            draggable: !0,
            content: '<div id="marker">\n      <img src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-09-48.png" alt="" />\n      <div class="handle"></div>\n    </div>'
        }), o.setShadow(0), $(".btn-go").on("click", function(o) {
            o.preventDefault(), r(e, t);
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
                mousemove: function o(a) {
                    var g, d, m;
                    e && (d = a.pageX, m = a.pageY, d !== i && m !== s && (g = Math.atan2(m - s, d - i), 
                    g -= Math.atan2(l - s, r - i), g += c, t = (g * (360 / (2 * Math.PI))).toFixed(5), 
                    n.css("transform", "rotate(" + t + "deg)"), n.css("transform-origin", "50% 50%")));
                },
                "mouseup mouseleave": function d(m) {
                    e = !1;
                    var p = m.pageX, u = m.pageY, f = Math.atan2(u - s, p - i);
                    f -= Math.atan2(l - s, r - i), f += c, n && n.data("last_angle", f), a = t, window.setTimeout(function() {
                        g(o.getPosition().lat(), o.getPosition().lng());
                    }, 100);
                }
            });
        });
    };
})();
//# sourceMappingURL=map2-dist.js.map