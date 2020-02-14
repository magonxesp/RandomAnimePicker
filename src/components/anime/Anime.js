import React from "react";
import './Anime.scss';
import Loading from "../loading/Loading";
import AnimeService from "../../services/AnimeService";


class Anime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view: null
        };
    }

    loading() {
        this.setState({
            view: <Loading />
        });
    }

    parseGenres(genres) {
        return genres.map((genre) => {
            return genre.name;
        }).join(', ');
    }

    anime(data) {
        return (
            <div className="Anime-container">
                <div className="Anime-fields">
                    <div className="Anime-img">
                        <img src={data['image_url'] || ''} alt="anime-label"/>
                    </div>
                    <div className="Anime-information">
                        <h1>{data['title'] || '?'}</h1>
                        <h2>{data['title_japanese'] || ''}</h2>
                        <ul className="stats">
                            <li><strong>Episodes:</strong> {data['episodes'] || '?'}</li>
                            <li><strong>Duration:</strong> {data['duration'] || '?'}</li>
                            <li><strong>Premiered:</strong> {data['premiered'] || '?'}</li>
                            <li><strong>Status:</strong> {data['status'] || '?'}</li>
                            <li><strong>Score:</strong> {data['score'] || '?'}</li>
                            <li><strong>Genres:</strong> {this.parseGenres(data['genres']) || '?'}</li>
                            <li><strong>Rating:</strong> {data['rating'] || '?'}</li>
                        </ul>
                        <section className="synopsis-section">
                            <h4>Synopsis:</h4>
                            <p>{data['synopsis'] || '?'}</p>
                        </section>
                    </div>
                </div>
                <div className="buttons-container">
                    <button className="btn btn-primary" onClick={() => this.fetchRandomAnime()}>Choose a random anime</button>
                    <a className="btn btn-secondary" href={data['url']} target="_blank">View on MyAnimeList</a>
                </div>
            </div>
        )
    }

    async fetchRandomAnime() {
        this.loading();

        let animeService = new AnimeService();
        let response = await animeService.random();

        if (!response) {
            this.fetchRandomAnime();
            return;
        }

        this.setState({
            view: this.anime(response)
        });
    }

    componentDidMount() {
        this.fetchRandomAnime()
    }

    render() {
        return (
            <div className="Anime">
                {this.state.view}
            </div>
        )
    }
}

export default Anime;