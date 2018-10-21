import React, { Component } from 'react';
import './App.css';
import API from "./API";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "React Unsplash Image search",
      searchTerm: "",
      loading: false,
      images: []
    };
  }

  searchTermChanged(event){
    this.setState({
      searchTerm: event.target.value
    });
  }

  formSubmited(event){
    event.preventDefault();

    this.setState({
      loading: true
    });

    API.search(this.state.searchTerm)
      .then(images => this.setState({
        loading: false,
        images: images
      }));
    }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>{this.state.title}</h1>
  
          <form onSubmit={(event) => this.formSubmited(event)}>
            <label htmlFor="search_term">Enter the search term:</label>
            <input onChange={(event) => this.searchTermChanged(event)} vale={this.state.searchTerm} type="text" id="search_term" name="search_term" placeholder="Enter the search term like: nature, love or train" />
            <button type="submit">Search</button>
          </form>
        </header>

        {this.state.loading ? 
        <div className="loading_img">
          <div className="cssload-dots">
              <div className="cssload-dot"></div>
              <div className="cssload-dot"></div>
              <div className="cssload-dot"></div>
              <div className="cssload-dot"></div>
              <div className="cssload-dot"></div>
          </div>
            
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" ></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7" result="goo" ></feColorMatrix>
              </filter>
            </defs>
          </svg>
        </div> : ""}

        <section className="search_results">
          {this.state.images.map(img => {
            return <a key={img.id} href={img.urls.regular} target="_blank" rel="noopener noreferrer"><figure><img src={img.urls.thumb} alt={img.description + " by " + img.user.username}/><figcaption>{img.description} by {img.user.username}</figcaption></figure></a>
          })}
        </section>

        <footer>
          Made October, 2018 by <a href="https://github.com/dmilojkovic76/img-search-frontend-vezba" alt="dmilojkovic githib">dmilojkovic</a>. Loading spinner made by <a href="https://codepen.io/codecalm/#" alt="Paweł Kuna">Paweł Kuna</a>.
        </footer>

      </div>
    );
  }
}

export default App;
