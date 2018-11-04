import * as googleMapsAPI from "../data/API_credentials";

// Error handling 
export const alertMessage = (alertString) => {
    const newAlert = document.createElement("div");
    newAlert.setAttribute("class", "alert alert-warning")
    newAlert.setAttribute("role", "alert")
    document.getElementById("navbar").appendChild(newAlert);
    newAlert.innerHTML = alertString;
}

// Detect authentication failure, such as invalied or missing Google Maps API key
window.gm_authFailure = () => {
    alertMessage("Google Maps API error")
}

// Google Maps API key and url
export const googleAPI = {
    googleMaps: {
        // `params` attribute allows us to string multiple query together
        params: new URLSearchParams({
            // API stored in separate file
            key: `${googleMapsAPI.key}`,
        })
    },
}