
(function($) {
    'use strict';

    jQuery(document).on('ready', function() {



		/* 10. START GOOGLE MAP */

        function initialize() {
            var mapOptions = {
                zoom: 11,
                scrollwheel: false,
                center: new google.maps.LatLng(40.7143528, -74.0059731)
            };
            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.7143528, -74.0059731),
                /* animation: google.maps.Animation.BOUNCE, */
                icon: 'assets/img/map-marker.png',
                map: map
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);

        /* END GOOGLE MAP */

	
	});




})(jQuery);
