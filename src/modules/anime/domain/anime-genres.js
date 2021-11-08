import ArrayValueObject from "../../shared/domain/value-object/array-value-object";

export default class AnimeGenres extends ArrayValueObject{

    toString() {
        return this.values.join(', ');
    }

}