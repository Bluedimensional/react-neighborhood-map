/**
* ACKNOWLEDGEMENTS: Forrest Walker Connecting to Foursquare https://www.youtube.com/watch?v=Dj5hzKBxCBI&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=3
*
*/
import * as fsAPI from "../data/API_credentials";
import { getUserGeo } from "../component/Geolocation"

class Helper {
	static baseURL() {
		return "https://api.foursquare.com/v2";
	}
	// Client ID, client secret, and version stored in credentials file
	static auth() {
		// gets geolocation
		return getUserGeo()
			.then(position => {
				const keys = {
					client_id: `${fsAPI.client_id}`,
					client_secret: `${fsAPI.client_secret}`,
					v: `${fsAPI.client_version}`,
					// ll: `${position.coords.latitude} + "," + ${position.coords.longitude}`
				};
				console.log(position.coords.latitude)
				// console.log(Helper.simpleFetch())
				return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&");
			});
	}




	static urlBuilder(urlPrams) {
		if (!urlPrams) {
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

	static simpleFetch(endPoint, method, urlPrams) {
		let requestData = {
			method,
			headers: Helper.headers()
		};

		// this needs to be called after promise resolves in Helper.auth()
		return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
			requestData
		).then(res => res.json());

	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return Helper.simpleFetch("/venues/search", "GET", urlPrams);
	}

	static getVenueDetails(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	}

	static getVenuePhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}



