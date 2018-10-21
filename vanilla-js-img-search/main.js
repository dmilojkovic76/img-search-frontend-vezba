const form = document.querySelector("form");
const inputBox = document.querySelector("#search_term");

const searchResultsElem = document.querySelector(".search_results");

const API_URL = "https://api.unsplash.com/search/photos/?query=";
const CLIENT_ID = "&client_id=4ed859e100f487b468f969258ab8719cf86608077837e3a783acd3cfc00c3e6a";

form.addEventListener("submit", formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = inputBox.value;
  search(searchTerm);
}

function search(s) {
  const searchUrl = API_URL + s + CLIENT_ID;
  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data.results)//eslint-disable-line
      data.results.forEach( img => {
        const newAElem = document.createElement("a");
        const newImgElem = document.createElement("img");
        const newFigureElem = document.createElement("figure");
        const newFigcaptionElem = document.createElement("figcaption");
        newAElem.href = img.urls.full;
        newAElem.target = "_blank";
        newAElem.rel = "search";
        newImgElem.src = img.urls.thumb;
        newImgElem.alt = img.description + " by " + img.user.username;
        newFigcaptionElem.textContent = img.description + " by " + img.user.username;
        newFigureElem.appendChild(newImgElem);
        newFigureElem.appendChild(newFigcaptionElem);
        newAElem.appendChild(newFigureElem);
        searchResultsElem.appendChild(newAElem);
      })
    });
}