// Geolocation of user to be used for search query Foursqaure call url

export const userGeo = navigator.geolocation.getCurrentPosition((position) => {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    console.log(pos) // works
    console.log("Lat: " + pos.lat) // works
});

// These values need to be set to the  lat: position.coords.latitude,  lng: position.coords.longitude from above 
export const lat1 = "36.04"
export const lng1 = "-86.74"
