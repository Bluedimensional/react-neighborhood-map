// Geolocation of user to be used for search query Foursqaure call url

export const userGeo = navigator.geolocation.getCurrentPosition((position) => {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    console.log(pos) // works
    console.log("Lat: " + pos.lat) // works
});

