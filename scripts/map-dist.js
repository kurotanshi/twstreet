"use strict";

(function() {
    var a = "images/object/1.png", t, e, o = 0, n = 1, i = "AIzaSyBxKtiOh3lYNzXBI6jjjC_oOGaqF1Z6Uy0", g = function a(t, e) {
        var o = {}, n = 0, i = 0;
        for (var g in t) o[g] = new Image(), o[g].onload = function() {
            ++n >= i && e(o);
        }, o[g].src = t[g];
    };
    function r(a, o) {
        var n = document.getElementById("address").value;
        a.geocode({
            address: n
        }, function(a, o) {
            o === google.maps.GeocoderStatus.OK ? (t.panTo(a[0].geometry.location), e.setPosition(a[0].geometry.location), 
            s(a[0].geometry.location.lat(), a[0].geometry.location.lng())) : alert("此地點無法解析.");
        });
    }
    var s = function t(e, r) {
        e = e || 25.03000033976827, r = r || 121.54913582462314;
        var s = document.getElementById("myCanvas"), l = s.getContext("2d"), c = {
            photo: a,
            stview: "https://maps.googleapis.com/maps/api/streetview?key=" + i + "&size=900x900&location=" + e + "," + r + "&heading=" + o + "&pitch=" + n
        };
        g(c, function(a) {
            l.drawImage(a.stview, 0, 0, 700, 700), l.drawImage(a.photo, 0, 0, 700, 700);
        }), $(".lat").val(e), $(".lng").val(r);
    };
    function l() {
        var a = new google.maps.Geocoder();
        t = new google.maps.Map(document.getElementById("map"), {
            zoom: 18,
            draggable: !1,
            center: {
                lat: 25.03000033976827,
                lng: 121.54913582462314
            }
        }), e = new RichMarker({
            position: new google.maps.LatLng(25.03000033976827, 121.54913582462314),
            map: t,
            draggable: !1,
            content: '<div id="marker">\n      <img src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-09-48.png" alt="" />\n      <div class="handle"></div>\n    </div>'
        }), e.setShadow(0), $(".btn-go").on("click", function(e) {
            e.preventDefault(), r(a, t);
        });
    }
    window.onload = function(a) {
        l(), s(), google.maps.event.addListenerOnce(t, "idle", function() {
            var a = !1, t, e, o, n, i, g, r;
            $(".handle").on("mousedown", function(e) {
                e.preventDefault(), e.stopPropagation(), i = e.pageX, g = e.pageY, a = !0, t = $("#marker"), 
                t.data("origin") || t.data("origin", {
                    left: t.offset().left,
                    top: t.offset().top
                }), o = t.data("origin").left, n = t.data("origin").top, r = t.data("last_angle") || 0;
            }), $("#map").on({
                mousemove: function s(l) {
                    var c, d, m;
                    a && (d = l.pageX, m = l.pageY, d !== o && m !== n && (c = Math.atan2(m - n, d - o), 
                    c -= Math.atan2(g - n, i - o), c += r, e = c * (360 / (2 * Math.PI)), t.css("transform", "rotate(" + e + "deg)"), 
                    t.css("transform-origin", "50% 50%")));
                },
                mouseup: function e(s) {
                    a = !1;
                    var l = s.pageX, c = s.pageY, d = Math.atan2(c - n, l - o);
                    d -= Math.atan2(g - n, i - o), d += r, t.data("last_angle", d);
                }
            });
        });
    };
})();