/**
* ACKNOWLEDGEMENTS: Forrest Walker Connecting to Foursquare https://www.youtube.com/watch?v=Dj5hzKBxCBI&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=3
*
*/

class Helper {
	static baseURL() {
		return "https://api.foursquare.com/v2";
	}

	static auth(){
		const keys = {
			client_id:"1FBUUYE1FOUN1FZ14UDOSYY2SAV41CPFIIGGVRKUMZJ3BACC",
			client_secret:"EWZO0YLIZST1NVZOEDIZCECCNWFODUIYVIWXINRDVKJYGAO5",
			v:"20180930"
		};
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