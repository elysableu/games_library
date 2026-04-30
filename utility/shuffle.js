export class Shuffle {
    // Fisher-Yates Shuffle -> Add FaroShuffle and RiffleShuffles
    static fyShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}