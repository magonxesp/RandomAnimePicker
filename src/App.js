import React from 'react';
import './App.scss';
import Anime from "./components/anime/anime-detail";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anime: null
    };
  }

  start() {
    this.setState({
      anime: <Anime />
    });
  }

  render() {
    let bodyComponent;

    if (!this.state.anime) {
      bodyComponent = <button className="btn btn-primary" onClick={() => this.start()}>Choose a random anime</button>
    } else {
      bodyComponent = this.state.anime
    }

    return (
        <div className="App">
            <header>
              <h1>Random Anime Picker</h1>
            </header>
            <div className="App-container">
              {bodyComponent}
            </div>
        </div>
    );
  }
}

export default App;
