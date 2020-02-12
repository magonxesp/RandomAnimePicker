import React from 'react';
import logo from './logo.svg';
import './App.scss';
import AnimeService from "./services/AnimeService";

class App extends React.Component {

  async fetchRandomAnime() {
    let animeService = new AnimeService();
    let response = await animeService.random();
    console.log(response);
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
            <div className="buttons-container">
              <button className="btn" onClick={this.fetchRandomAnime}>Choose a random anime</button>
              <a className="btn" id="myanimelistlink" href="/" target="_blank">View on MyAnimeList</a>
            </div>
          </header>
        </div>
    );
  }
}

export default App;
