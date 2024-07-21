// Initialize the map
const centerCoordinates = [-117.99864340108006, 33.772409810120195];
const startingZoom = 13; 

const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: centerCoordinates, // Starting position [lng, lat]
    zoom: startingZoom // Starting zoom level
});

let mapOptions = {"centerCoordinates": [-117.99864340108006, 33.772409810120195], 
    "startingZoom": 13}; 
    console.log(mapOptions); 

function addMarker(latitude, longitude, button, title, message, img) {
    let marker_message = `<h3>${title}</h3><p>${message}</p>`

    new maplibregl.Marker({ element: markerImage(img) })
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(marker_message))
        .addTo(map)
    
    createButtons(latitude, longitude, button);
    return message
}


function createButtons (latitude, longitude, button, message){
    const newButton = document.createElement(`button`); // (1)!
    newButton.id = "button" + button; //(2)!
    newButton.innerHTML = button; //(3)!
    newButton.setAttribute("latitude", latitude); //(4)!
    newButton.setAttribute("longitude", longitude); //(5)!
    newButton.addEventListener(`click`, function(){
        map.flyTo({
            center: [longitude, latitude], //(6)!
            zoom: 13
        })
    })

    document.getElementById("contents").appendChild(newButton); //(7)!

}   

// Turning map markers into images
function markerImage(img) {
    const jpg = `markerphotos/${img}.jpg`;
    const marker = document.createElement('div');
    marker.style.backgroundImage = `url(${jpg}`;
    marker.style.backgroundSize = "cover";
    marker.style.width = "85px";
    marker.style.height = "85px";
    marker.style.borderRadius = "50px";
    return marker;
}


// Map fully loaded --> GeoJSON Data is added
map.on("load", function(){
    console.log("Yippee!! Map has loaded :D")
    fetch("geoJSON/map1.geojson")
        .then(response => response.json())
        .then(data => {
            processData(data);
    });
    // Adding image here
    map.loadImage('7LeavesCoffeeMarker.jpg', (error, image) => {
        if (error) throw error;
        map.addImage('7LeavesCoffeeMarker', image);
    });

    map.on('styleimagemissing', (e) => {
        const id = e.id;
        // Handle missing images
        console.warn(`Image "${id}" could not be loaded.`);

});

});

function processData(results){
    //console.log(results) //for debugging: this can help us see if the results are what we want
    results.features.forEach(feature => {
        //console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        let coordinates = feature.geometry.coordinates;
        let longitude = coordinates[0];
        let latitude = coordinates[1];
        let title = feature.properties.title;
        let button = feature.properties.button;
        let message = feature.properties.message;
        let img = feature.properties.img;
        addMarker(latitude, longitude, button, title, message, img);
    });
};  