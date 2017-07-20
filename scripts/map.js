(function(){

var photo = 'images/object/1.png';
var map, marker, heading = 0, pitch = 1;
var mapKey = 'AIzaSyBxKtiOh3lYNzXBI6jjjC_oOGaqF1Z6Uy0';

var loadImages = function (sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;

  for (var src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if (++loadedImages >= numImages) { callback(images); }
    };
    images[src].src = sources[src];
  }
};

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.panTo(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      imageReload(results[0].geometry.location.lat(), results[0].geometry.location.lng());
    } else {
      alert('此地點無法解析.');
    }
  });
}

var imageReload = function(lat, lng){
  lat = lat || 25.03000033976827;
  lng = lng || 121.54913582462314;

  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  var sources = {
    photo: photo,
    stview: "https://maps.googleapis.com/maps/api/streetview?key="+ mapKey +"&size=900x900&location="+ lat +","+ lng +"&heading="+ heading +"&pitch=" + pitch
  };

  loadImages(sources, function(images) {
    context.drawImage(images.stview, 0, 0, 700, 700);
    context.drawImage(images.photo, 0, 0, 700, 700);
  });

  $('.lat').val(lat);
  $('.lng').val(lng);
};

function initMap() {
  var geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 25.03000033976827, lng: 121.54913582462314},
    styles: [{ featureType: "poi", elementType: "labels", stylers: [ { visibility: "off" } ]}]
  });



  marker = new RichMarker({
    position: new google.maps.LatLng(25.03000033976827, 121.54913582462314),
    map: map,
    draggable: true,
    content: `<div id="marker">
      <img src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-09-48.png" alt="" />
      <div class="handle"></div>
    </div>`
  });

  marker.setShadow(0);

  // google.maps.event.addListener(marker, 'dragend', function(){
  //   imageReload( marker.getPosition().lat(), marker.getPosition().lng() );
  // });

  $('.btn-go').on('click', function(e){
    e.preventDefault();
    geocodeAddress(geocoder, map);
  });

}

window.onload = function(images) {
  initMap();
  imageReload();

  // init
  google.maps.event.addListenerOnce(map, "idle", function() {
    var dragging = false, degree = 0, target_wp = $('#marker'),
      o_x, o_y, h_x, h_y, last_angle;

    $('.handle').on('mousedown', function(e) {
      e.preventDefault();
      e.stopPropagation();

      h_x = e.pageX;
      h_y = e.pageY; // clicked point
      dragging = true;

      if (!target_wp.data("origin")) target_wp.data("origin", {
        left: target_wp.offset().left,
        top: target_wp.offset().top
      });
      o_x = target_wp.data("origin").left;
      o_y = target_wp.data("origin").top; // origin point

      last_angle = target_wp.data("last_angle") || 0;
    });

    $('#map').on({
      'mousemove': function(e){
        var s_rad, s_x, s_y;
        if (dragging) {
          s_x = e.pageX;
          s_y = e.pageY; // start rotate point

          // start rotate
          if (s_x !== o_x && s_y !== o_y) {
            s_rad = Math.atan2(s_y - o_y, s_x - o_x);       // current to origin
            s_rad -= Math.atan2(h_y - o_y, h_x - o_x);      // handle to origin
            s_rad += last_angle;                            // relative to the last one
            degree = (s_rad * (360 / (2 * Math.PI))).toFixed(5);

            target_wp.css('transform', 'rotate(' + degree + 'deg)');
            target_wp.css('transform-origin', '50% 50%');
          }
        }
      },
      'mouseup mouseleave': function(e){
        dragging = false;
        var s_x = e.pageX, s_y = e.pageY;
        // Saves the last angle for future iterations
        var s_rad = Math.atan2(s_y - o_y, s_x - o_x);   // current to origin
        s_rad -= Math.atan2(h_y - o_y, h_x - o_x);      // handle to origin
        s_rad += last_angle;

        if( target_wp ) target_wp.data("last_angle", s_rad);

        // console.log(s_rad, degree);
        heading = degree;
        window.setTimeout(function(){ imageReload( marker.getPosition().lat(), marker.getPosition().lng() ); }, 100);
      }
    });

    });
};

})();