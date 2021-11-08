export default class Random {

    /**
     * Returns a random number between min and max parameters
     *
     * @param {number} min
     * @param {number} max
     *
     * @returns {number}
     */
    static randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Get random array element
     *
     * @param {Array<any>} array
     *
     * @returns {any}
     */
    static randomArrayElement(array) {
        return array[this.randomInt(0, array.length - 1)];
    }

}