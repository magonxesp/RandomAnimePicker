import jikanjs from 'jikanjs'


class AnimeService {

    #season = [
        'summer',
        'spring',
        'fall',
        'winter'
    ];

    constructor() {
        this.api = jikanjs
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomSeason() {
        return this.#season[this.getRandomInt(0, this.#season.length - 1)]
    }

    async random() {
        try {
            let now = new Date();
            let year = this.getRandomInt(2000, now.getFullYear());
            let season = this.randomSeason();
            let response = await jikanjs.loadSeason(year, season);
            return response['anime'][this.getRandomInt(0, response.anime.length - 1)];
        } catch (exception) {
            console.log(exception);
            return null;
        }
    }

}

export default AnimeService;