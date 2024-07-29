// declare variables
let mapOptions = {'centerLngLat': [ -118.1371171656585, 33.92691595181131],'startingZoomLevel':9}

//Initialize map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addDrinkMarker(data){
    let lng = parseFloat(data["lng"]);
    let lat = parseFloat(data["lat"]);
    let rating = data['Please rate your drink using the options below to the best of your ability.'];
    let imgMatchaRatingCup;

    if (rating.includes('Exceptional')) {
        imgMatchaRatingCup = 'ExceptionalMarker';
    } else if (rating.includes('Satisfactory')) {
        imgMatchaRatingCup = 'SatisfactoryMarker';
    } else if (rating.includes('Average')) {
        imgMatchaRatingCup = 'Averagemarker';
    } else if (rating.includes('Unsatisfactory')) {
        imgMatchaRatingCup = 'UnsatisfactoryMarker';
    } else if (rating.includes('Awful')) {
        imgMatchaRatingCup = 'AwfulMarker';
    }

    if (data['Have you ever ordered a matcha latte from any location?'] === "Yes") {   
        let name = data['Please provide the name of the location where you ordered your matcha latte.'];
        let experience = data['Please share a little more about your experience in 1-2 sentences. '];

        let popup_message = `<p><strong>Name:</strong> ${name}<br></p> <p><strong>Experience: </strong> ${experience}</p>`;
    
        console.log(`Adding marker at [${lng}, ${lat}] with image ${imgMatchaRatingCup}.png`);
    // Create and add Marker only if they have orderd a matcha latte 
    new maplibregl.Marker({
        element: createDrinkMarkerElement(imgMatchaRatingCup)
    })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    } else {
        console.log(`Skipping entry: ${data['Please provide the name of the location where you ordered your matcha latte.']}`);
    }
}

//Create markers using image of drinks 
 function createDrinkMarkerElement(imgMatchaRatingCup) {
    const markerImg = `markerPhotos/${imgMatchaRatingCup}.png`;
    const marker = document.createElement('div');
    marker.style.backgroundImage = `url(${markerImg})`;
    marker.style.width = "40px";
    marker.style.height = "80px";
    marker.style.borderRadius = '50px';
    marker.style.backgroundSize = 'contain';
    marker.style.backgroundRepeat = 'no-repeat';
    marker.style.backgroundPosition = 'center';

    console.log(`Created marker element with image ${markerImg}`);

    return marker;
 }

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSY8f9afmBCAg6rLA-vKYvaz6u7n9AmUsXdPaj8B_0BchlUxG9vRfxAqOFulZXmYt5XU3TinRHMjBok/pub?output=csv"

map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: function(results) {
            processData(results.data); // Call processData with the fetched data
        }
    });
});

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        let coordinates = feature.coordinates;
        let longitude = feature['lng'];
        let latitude = feature['lat'];
        let name = feature['Please provide the name of the location where you ordered your matcha latte.'];
        let experience = feature['Please share a little more about your experience in 1-2 sentences. '];
        
        addDrinkMarker(feature);
    });
};