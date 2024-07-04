// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-117.99864340108006, 33.772409810120195], // Starting position [lng, lat]
    zoom: 10 // Starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-157.82973709128674, 21.27947112585317])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('<h3>Waikiki Beach, Hawaii<h/3><br><p>Where I was able to have the best poke of my life</p>'))
    .addTo(map);

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-73.96580911776765, 40.789623608010324])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('<h3>New York City, New York (Manhattan)<h/3><br><p>I was able to perform at Carnegie Hall!</p>'))
    .addTo(map);

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-80.13533498170062, 25.806996186954763])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('<h3>Miami, Florida<h/3><br><p>I visited a beautiful botanical garden with my mother and sister here :D</p>'))
    .addTo(map);