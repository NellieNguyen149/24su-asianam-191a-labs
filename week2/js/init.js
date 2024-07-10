// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-117.99864340108006, 33.772409810120195], // Starting position [lng, lat]
    zoom: 13 // Starting zoom level
});

//Adding makers to the map function
function addMarker(latitude, longitude, title, message) {
    let marker_message = `<h3>${title}</h3><p>${message}</p>`

    new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(marker_message))
        .addTo(map)
    
    createButtons(latitude, longitude, title, message);
    return message
}

function createButtons (latitude, longitude, title){
    const newButton = document.createElement("button"); // (1)!
    newButton.id = "button" + title; //(2)!
    newButton.innerHTML = title; //(3)!
    newButton.setAttribute("latitude", latitude); //(4)!
    newButton.setAttribute("longitude", longitude); //(5)!
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [longitude, latitude], //(6)!
        })
    })
    
    document.getElementById("contents").appendChild(newButton); //(7)!

}

//Create buttons function
addMarker(33.77495526924918, -117.94110175407353, "Phin Smith", "My all-time FAVORITE cafe, I love their matcha latte. MUST add sea salt foam at the top too!") //Phin Smith marker
addMarker(33.75904466611812, -117.95847928251607, "7 Leaves", "My favorite order here is definitely the sea salt Jasmine tea :D so yummy! ") //7 Leaves marker
addMarker(33.716926680785335, -117.99008264054662, "Brewstory", "I'm so sad, they actually ran out of matcha when I tried to go for the first time, so I got the VN coffee with cream top instead. It was good, but I'm super excited to try their matcha!!") //Brewstory marker

