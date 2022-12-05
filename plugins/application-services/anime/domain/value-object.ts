import { NumberValueObject } from "~/plugins/application-services/shared/domain/value-object/number-value-object";
import { ArrayValueObject } from "~/plugins/application-services/shared/domain/value-object/array-value-object";
import { StringValueObject } from "~/plugins/application-services/shared/domain/value-object/string-value-object";

export class AnimeDuration extends StringValueObject { }
export class AnimeEpisodes extends NumberValueObject { }
export class AnimeImage extends StringValueObject { }
export class AnimePremiered extends StringValueObject { }
export class AnimeRating extends StringValueObject { }
export class AnimeScore extends NumberValueObject { }
export class AnimeStatus extends StringValueObject { }
export class AnimeSynopsis extends StringValueObject { }
export class AnimeTitle extends StringValueObject { }
export class AnimeUrl extends StringValueObject { }

export class AnimeGenres extends ArrayValueObject<string> {

	toString() {
		return this.values.join(', ');
	}

}
