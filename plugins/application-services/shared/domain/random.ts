export class Random {

    static randomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomArrayElement<T>(array: Array<T>): T {
        return array[this.randomInt(0, array.length - 1)];
    }

}
