<template>
  <div id="app">
    <header>
      <h1>{{title}}</h1>
      <form @submit.prevent="formSubmitted()">
          <label for="search_term">Enter the search term:</label>
          <input v-model="searchTerm" type="text" name="search_term" placeholder="Enter the search term like: nature, love or train">
          <button type="submit">Search</button>
      </form>
    </header>

    <div v-if="loading" class="loading_img">
        <div class="cssload-dots">
            <div class="cssload-dot"></div>
            <div class="cssload-dot"></div>
            <div class="cssload-dot"></div>
            <div class="cssload-dot"></div>
            <div class="cssload-dot"></div>
          </div>

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" ></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="goo" ></feColorMatrix>
              </filter>
            </defs>
          </svg>
    </div>

    <section class="search_results">
      <a v-for="img in images" :key="img.id" :href="img.urls.regular" target="_blank" rel="noopener noreferrer">
        <figure>
          <img :src="img.urls.thumb" :alt="img.description + ' by ' + img.user.username">
          <figcaption>
            {{img.description}} by {{img.user.username}}
          </figcaption>
        </figure>
      </a>
    </section>

    <footer>
      Made October, 2018 by <a href="https://github.com/dmilojkovic76/img-search-frontend-vezba" alt="dmilojkovic githib">dmilojkovic</a>. Loading spinner made by <a href="https://codepen.io/codecalm/#" alt="Paweł Kuna">Paweł Kuna</a>.
    </footer>

  </div>
</template>

<script>
import API from './API';

export default {
  name: 'app',
  data() {
    return {
      title: 'Vue.js Unsplash Image search',
      searchTerm: '',
      images: [],
      loading: false,
    };
  },
  methods: {
    formSubmitted() {
      this.loading = true;
      this.images = [];
      API.search(this.searchTerm)
        .then((images) => {
          this.images = images;
          this.loading = false;
        });
    },
  },
};
</script>

<style>
header {
  padding: 2rem 0 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;
  background-image: url("https://source.unsplash.com/random");
  /* offset-x | offset-y | blur-radius | spread-radius | color */
  box-shadow: 0 0.2em 0.4rem 0 rgba(0, 0, 0, 0.5);
}

header h1 {
  text-align: center;
  text-shadow: 0 0 2.5rem rgba(252, 252, 252, 0.8);
}


form {
  width: 70%;
  max-width: 90%;
  margin: 0 auto;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

form label {
  text-shadow: 0 0 1rem rgba( 252, 252, 252, 0.8);
}

form input {
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  background: rgba( 0, 0, 0, 0.5);
  color: #ccc;
}

form button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  background: #55c;
  margin-top: 0.5rem;
}

.search_results {
  width: 90%;
  margin: 1.5rem auto;
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: center; */
  column-count: auto;
  column-width: 200px;
}

.search_results a {
  /* display: inline-block; */
  margin-bottom: 0.6rem;
  text-decoration: none;
  color: black;
  /* width: calc(20% - 0.85rem); */
}

.search_results a:hover img {
  opacity: 0.7;
  transform: scale(1.05);
}

.search_results img {
  border-radius: 0.4rem;
  border: none;
  max-width: 100%;
  /* height: auto; */
  /* display: block; */
  /* background: #ccc; */
  transition: transform .2s ease-in-out;
  /* margin-bottom: 0.6rem; */
}

.search_results figure {
  overflow: hidden;
}

.search_results figcaption {
  font-size: 70%;
  margin-bottom: 0.85rem;
}

footer {
  background: #333;
  color: #ccc;
  font-size: 70%;
  text-align: center;
  margin: 0 auto;
  padding: 1.2rem 0 0.8rem 0;
  position: fixed;
  bottom: 0vh;
  width: 100vw;
}

footer a {
  color: #ccc;
}

.loading_img {
  transform: translateY(2rem);

}

.cssload-dots {
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  outline: 1px solid red;
  filter: url(#goo);
    -o-filter: url(#goo);
    -ms-filter: url(#goo);
    -webkit-filter: url(#goo);
    -moz-filter: url(#goo);
}

.cssload-dot {
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;
}

.cssload-dot:before {
  content: "";
  width: 34px;
  height: 34px;
  border-radius: 49px;
  background: rgb(251,211,1);
  position: absolute;
  left: 50%;
  transform: translateY(0);
    -o-transform: translateY(0);
    -ms-transform: translateY(0);
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
  margin-left: -17.5px;
  margin-top: -17.5px;
}

.cssload-dot:nth-child(5):before {
  z-index: 100;
  width: 44.5px;
  height: 44.5px;
  margin-left: -21.75px;
  margin-top: -21.75px;
  animation: cssload-dot-colors 4.6s ease infinite;
    -o-animation: cssload-dot-colors 4.6s ease infinite;
    -ms-animation: cssload-dot-colors 4.6s ease infinite;
    -webkit-animation: cssload-dot-colors 4.6s ease infinite;
    -moz-animation: cssload-dot-colors 4.6s ease infinite;
}

.cssload-dot:nth-child(1) {
  animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
    -o-animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
    -ms-animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
    -webkit-animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
    -moz-animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
}
.cssload-dot:nth-child(1):before {
  background-color: rgb(255,50,112);
  animation: cssload-dot-move 4.6s 0s ease infinite;
    -o-animation: cssload-dot-move 4.6s 0s ease infinite;
    -ms-animation: cssload-dot-move 4.6s 0s ease infinite;
    -webkit-animation: cssload-dot-move 4.6s 0s ease infinite;
    -moz-animation: cssload-dot-move 4.6s 0s ease infinite;
}

.cssload-dot:nth-child(2) {
  animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
    -o-animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
    -ms-animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
    -webkit-animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
    -moz-animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
}
.cssload-dot:nth-child(2):before {
  background-color: rgb(32,139,241);
  animation: cssload-dot-move 4.6s 1.15s ease infinite;
    -o-animation: cssload-dot-move 4.6s 1.15s ease infinite;
    -ms-animation: cssload-dot-move 4.6s 1.15s ease infinite;
    -webkit-animation: cssload-dot-move 4.6s 1.15s ease infinite;
    -moz-animation: cssload-dot-move 4.6s 1.15s ease infinite;
}

.cssload-dot:nth-child(3) {
  animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
    -o-animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
    -ms-animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
    -webkit-animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
    -moz-animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
}
.cssload-dot:nth-child(3):before {
  background-color: rgb(175,225,2);
  animation: cssload-dot-move 4.6s 2.3s ease infinite;
    -o-animation: cssload-dot-move 4.6s 2.3s ease infinite;
    -ms-animation: cssload-dot-move 4.6s 2.3s ease infinite;
    -webkit-animation: cssload-dot-move 4.6s 2.3s ease infinite;
    -moz-animation: cssload-dot-move 4.6s 2.3s ease infinite;
}

.cssload-dot:nth-child(4) {
  animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
    -o-animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
    -ms-animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
    -webkit-animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
    -moz-animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
}
.cssload-dot:nth-child(4):before {
  background-color: rgb(251,211,1);
  animation: cssload-dot-move 4.6s 3.45s ease infinite;
    -o-animation: cssload-dot-move 4.6s 3.45s ease infinite;
    -ms-animation: cssload-dot-move 4.6s 3.45s ease infinite;
    -webkit-animation: cssload-dot-move 4.6s 3.45s ease infinite;
    -moz-animation: cssload-dot-move 4.6s 3.45s ease infinite;
}

@keyframes cssload-dot-move {
  0% {
    transform: translateY(0);
  }
  18%, 22% {
    transform: translateY(-68px);
  }
  40%, 100% {
    transform: translateY(0);
  }
}

@-o-keyframes cssload-dot-move {
  0% {
    -o-transform: translateY(0);
  }
  18%, 22% {
    -o-transform: translateY(-68px);
  }
  40%, 100% {
    -o-transform: translateY(0);
  }
}

@-ms-keyframes cssload-dot-move {
  0% {
    -ms-transform: translateY(0);
  }
  18%, 22% {
    -ms-transform: translateY(-68px);
  }
  40%, 100% {
    -ms-transform: translateY(0);
  }
}

@-webkit-keyframes cssload-dot-move {
  0% {
    -webkit-transform: translateY(0);
  }
  18%, 22% {
    -webkit-transform: translateY(-68px);
  }
  40%, 100% {
    -webkit-transform: translateY(0);
  }
}

@-moz-keyframes cssload-dot-move {
  0% {
    -moz-transform: translateY(0);
  }
  18%, 22% {
    -moz-transform: translateY(-68px);
  }
  40%, 100% {
    -moz-transform: translateY(0);
  }
}

@keyframes cssload-dot-colors {
  0% {
    background-color: rgb(251,211,1);
  }
  25% {
    background-color: rgb(255,50,112);
  }
  50% {
    background-color: rgb(32,139,241);
  }
  75% {
    background-color: rgb(175,225,2);
  }
  100% {
    background-color: rgb(251,211,1);
  }
}

@-o-keyframes cssload-dot-colors {
  0% {
    background-color: rgb(251,211,1);
  }
  25% {
    background-color: rgb(255,50,112);
  }
  50% {
    background-color: rgb(32,139,241);
  }
  75% {
    background-color: rgb(175,225,2);
  }
  100% {
    background-color: rgb(251,211,1);
  }
}

@-ms-keyframes cssload-dot-colors {
  0% {
    background-color: rgb(251,211,1);
  }
  25% {
    background-color: rgb(255,50,112);
  }
  50% {
    background-color: rgb(32,139,241);
  }
  75% {
    background-color: rgb(175,225,2);
  }
  100% {
    background-color: rgb(251,211,1);
  }
}

@-webkit-keyframes cssload-dot-colors {
  0% {
    background-color: rgb(251,211,1);
  }
  25% {
    background-color: rgb(255,50,112);
  }
  50% {
    background-color: rgb(32,139,241);
  }
  75% {
    background-color: rgb(175,225,2);
  }
  100% {
    background-color: rgb(251,211,1);
  }
}

@-moz-keyframes cssload-dot-colors {
  0% {
    background-color: rgb(251,211,1);
  }
  25% {
    background-color: rgb(255,50,112);
  }
  50% {
    background-color: rgb(32,139,241);
  }
  75% {
    background-color: rgb(175,225,2);
  }
  100% {
    background-color: rgb(251,211,1);
  }
}

@keyframes cssload-dot-rotate-1 {
  0% {
    transform: rotate(-105deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@-o-keyframes cssload-dot-rotate-1 {
  0% {
    -o-transform: rotate(-105deg);
  }
  100% {
    -o-transform: rotate(270deg);
  }
}

@-ms-keyframes cssload-dot-rotate-1 {
  0% {
    -ms-transform: rotate(-105deg);
  }
  100% {
    -ms-transform: rotate(270deg);
  }
}

@-webkit-keyframes cssload-dot-rotate-1 {
  0% {
    -webkit-transform: rotate(-105deg);
  }
  100% {
    -webkit-transform: rotate(270deg);
  }
}

@-moz-keyframes cssload-dot-rotate-1 {
  0% {
    -moz-transform: rotate(-105deg);
  }
  100% {
    -moz-transform: rotate(270deg);
  }
}

@keyframes cssload-dot-rotate-2 {
  0% {
    transform: rotate(165deg);
  }
  100% {
    transform: rotate(540deg);
  }
}

@-o-keyframes cssload-dot-rotate-2 {
  0% {
    -o-transform: rotate(165deg);
  }
  100% {
    -o-transform: rotate(540deg);
  }
}

@-ms-keyframes cssload-dot-rotate-2 {
  0% {
    -ms-transform: rotate(165deg);
  }
  100% {
    -ms-transform: rotate(540deg);
  }
}

@-webkit-keyframes cssload-dot-rotate-2 {
  0% {
    -webkit-transform: rotate(165deg);
  }
  100% {
    -webkit-transform: rotate(540deg);
  }
}

@-moz-keyframes cssload-dot-rotate-2 {
  0% {
    -moz-transform: rotate(165deg);
  }
  100% {
    -moz-transform: rotate(540deg);
  }
}

@keyframes cssload-dot-rotate-3 {
  0% {
    transform: rotate(435deg);
  }
  100% {
    transform: rotate(810deg);
  }
}

@-o-keyframes cssload-dot-rotate-3 {
  0% {
    -o-transform: rotate(435deg);
  }
  100% {
    -o-transform: rotate(810deg);
  }
}

@-ms-keyframes cssload-dot-rotate-3 {
  0% {
    -ms-transform: rotate(435deg);
  }
  100% {
    -ms-transform: rotate(810deg);
  }
}

@-webkit-keyframes cssload-dot-rotate-3 {
  0% {
    -webkit-transform: rotate(435deg);
  }
  100% {
    -webkit-transform: rotate(810deg);
  }
}

@-moz-keyframes cssload-dot-rotate-3 {
  0% {
    -moz-transform: rotate(435deg);
  }
  100% {
    -moz-transform: rotate(810deg);
  }
}

@keyframes cssload-dot-rotate-4 {
  0% {
    transform: rotate(705deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}

@-o-keyframes cssload-dot-rotate-4 {
  0% {
    -o-transform: rotate(705deg);
  }
  100% {
    -o-transform: rotate(1080deg);
  }
}

@-ms-keyframes cssload-dot-rotate-4 {
  0% {
    -ms-transform: rotate(705deg);
  }
  100% {
    -ms-transform: rotate(1080deg);
  }
}

@-webkit-keyframes cssload-dot-rotate-4 {
  0% {
    -webkit-transform: rotate(705deg);
  }
  100% {
    -webkit-transform: rotate(1080deg);
  }
}

@-moz-keyframes cssload-dot-rotate-4 {
  0% {
    -moz-transform: rotate(705deg);
  }
  100% {
    -moz-transform: rotate(1080deg);
  }
}
</style>
