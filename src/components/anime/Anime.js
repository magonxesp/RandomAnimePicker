import React from "react";
import './Anime.scss';


class Anime extends React.Component {



    render() {
        return (
            <div className="anime-container">
                <img id="anime-img" src="#" alt="anime-label"/>
                <div className="anime-information">
                    <h1 id="anime-title"></h1>
                    <h4 id="anime-title-jp"></h4>
                    <ul className="stats">
                        <li><strong>Episodes:</strong></li>
                        <li><strong>Duration:</strong></li>
                        <li><strong>Premiered:</strong></li>
                        <li><strong>Status:</strong></li>
                        <li><strong>Score:</strong></li>
                        <li><strong>Genres:</strong></li>
                    </ul>
                    <section>
                        <h4>Synopsis:</h4>
                        <p>Hola</p>
                    </section>
                </div>
            </div>
        );
    }
}

export default Anime;