const API_URL = "https://api.unsplash.com/search/photos/?query=";
const CLIENT_ID = "&client_id=4ed859e100f487b468f969258ab8719cf86608077837e3a783acd3cfc00c3e6a";

export default {
  search(searchTerm) {
    const searchUrl = API_URL + searchTerm + CLIENT_ID;
    return fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        return data.results
        })
    }
}
