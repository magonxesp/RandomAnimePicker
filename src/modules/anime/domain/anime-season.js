import Random from "../../shared/domain/random";

export const AnimeSeason = {
    SUMMER: 'summer',
    SPRING: 'spring',
    FALL: 'fall',
    WINTER: 'winter'
};

/**
 * Get random season
 *
 * @returns {string}
 */
export function randomSeason() {
    const keys = Object.keys(AnimeSeason);

    return AnimeSeason[Random.randomArrayElement(keys)];
}