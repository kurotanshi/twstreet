"use strict";

(function() {
    var e = "images/object/1.png", t, o, a = 0, n = 1, i = "AIzaSyBxKtiOh3lYNzXBI6jjjC_oOGaqF1Z6Uy0", s = function e(t, o) {
        var a = {}, n = 0, i = 0;
        for (var s in t) a[s] = new Image(), a[s].onload = function() {
            ++n >= i && o(a);
        }, a[s].src = t[s];
    };
    function g(e, a) {
        var n = document.getElementById("address").value;
        e.geocode({
            address: n
        }, function(e, a) {
            a === google.maps.GeocoderStatus.OK ? (t.panTo(e[0].geometry.location), o.setPosition(e[0].geometry.location), 
            l(e[0].geometry.location.lat(), e[0].geometry.location.lng())) : alert("此地點無法解析.");
        });
    }
    var l = function t(o, g) {
        o = o || 25.03000033976827, g = g || 121.54913582462314;
        var l = document.getElementById("myCanvas"), r = l.getContext("2d"), c = {
            photo: e,
            stview: "https://maps.googleapis.com/maps/api/streetview?key=" + i + "&size=900x900&location=" + o + "," + g + "&heading=" + a + "&pitch=" + n
        };
        s(c, function(e) {
            r.drawImage(e.stview, 0, 0, 700, 700), r.drawImage(e.photo, 0, 0, 700, 700);
        }), $(".lat").val(o), $(".lng").val(g);
    };
    function r() {
        var e = new google.maps.Geocoder();
        t = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: {
                lat: 25.03000033976827,
                lng: 121.54913582462314
            },
            styles: [ {
                featureType: "poi",
                elementType: "labels",
                stylers: [ {
                    visibility: "off"
                } ]
            } ]
        }), o = new RichMarker({
            position: new google.maps.LatLng(25.03000033976827, 121.54913582462314),
            map: t,
            draggable: !0,
            content: '<div id="marker">\n      <img src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-09-48.png" alt="" />\n      <div class="handle"></div>\n    </div>'
        }), o.setShadow(0), $(".btn-go").on("click", function(o) {
            o.preventDefault(), g(e, t);
        });
    }
    window.onload = function(e) {
        r(), l(), google.maps.event.addListenerOnce(t, "idle", function() {
            var e = !1, t = 0, n = $("#marker"), i, s, g, r, c;
            $(".handle").on("mousedown", function(t) {
                t.preventDefault(), t.stopPropagation(), g = t.pageX, r = t.pageY, e = !0, n.data("origin") || n.data("origin", {
                    left: n.offset().left,
                    top: n.offset().top
                }), i = n.data("origin").left, s = n.data("origin").top, c = n.data("last_angle") || 0;
            }), $("#map").on({
                mousemove: function o(a) {
                    var l, d, m;
                    e && (d = a.pageX, m = a.pageY, d !== i && m !== s && (l = Math.atan2(m - s, d - i), 
                    l -= Math.atan2(r - s, g - i), l += c, t = (l * (360 / (2 * Math.PI))).toFixed(5), 
                    n.css("transform", "rotate(" + t + "deg)"), n.css("transform-origin", "50% 50%")));
                },
                "mouseup mouseleave": function d(m) {
                    e = !1;
                    var p = m.pageX, u = m.pageY, f = Math.atan2(u - s, p - i);
                    f -= Math.atan2(r - s, g - i), f += c, n && n.data("last_angle", f), a = t, window.setTimeout(function() {
                        l(o.getPosition().lat(), o.getPosition().lng());
                    }, 100);
                }
            });
        });
    };
})();
//# sourceMappingURL=map-dist.js.map