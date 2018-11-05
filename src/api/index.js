/**
* ACKNOWLEDGEMENTS: Forrest Walker Connecting to Foursquare https://www.youtube.com/watch?v=Dj5hzKBxCBI&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=3
*
*/
import * as fsAPI from "../data/API_credentials";
import {lat1, lng1, userGeo} from "../component/Geolocation"

class Helper {
	static baseURL() {
		return "https://api.foursquare.com/v2";
	}
	// Client ID, client secret, and version stored in credentials file
	static auth(){
		const keys = {
			client_id: `${fsAPI.client_id}`,
			client_secret: `${fsAPI.client_secret}`,
			v: `${fsAPI.client_version}`,
			// Trying to get data from {userGeo} 
			// ll: `${userGeo.pos.lat}` + "," + `${userGeo.pos.lng}` 
			// Line below works
			// ll: "36.04,-86.74"
			// Values coming from helper file
			ll:`${lat1},${lng1}`
		}
		return Object.keys(keys).map(key => `${key}=${keys[key]}`)
		.join("&");

		
	}

	

	static urlBuilder(urlPrams){
		if(!urlPrams){
			return ""
		}

		return Object.keys(urlPrams)
			.map(key => `${key}=${urlPrams[key]}`)
			.join("&");
	}

	static headers() {
		return {
			Accept: "application/json"
		};
	}

	static simpleFetch(endPoint, method, urlPrams){
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
			requestData
			).then(res => res.json());

	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return Helper.simpleFetch("/venues/search", "GET", urlPrams);
	}

	static getVenueDetails(VENUE_ID){
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	}

	static getVenuePhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}


   
