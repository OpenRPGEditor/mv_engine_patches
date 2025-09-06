// OpenRPGEditor patches

let __rand = new mt19937();
Math.seedRandom = function (seed) {
    if ($ORE_CONFIG.use2kRandom) {
        if (seed === 0) {
            seed++;
        }
        __rand.set_seed(seed);
    } else {
        console.log("ORE_USE_2K_RANDOM not set, unable to set seed");
    }
}

/**
 * Generates a random integer in the range (0, max-1).
 *
 * @static
 * @method Math.randomInt
 * @param {Number} max The upper boundary (excluded)
 * @return {Number} A random integer
 */
new_randomInt = function (max) {
    if (max === 0xFFFFFFFF) {
        return __rand.next() & 0x7FFFFFFF;
    }

    var rem = -max % max;
    while (true) {
        var n = __rand.next();
        if (n >= rem) {
            return n % max;
        }
    }
};

/* Lets not use the default random source */
new_random = function () {
    // Ensure the value is within the 32-bit range
    var value = Math.randomInt(0xFFFFFFFF);

    // Normalize to the range [0, 1]
    return value / 0xFFFFFFFF;
}

if ($ORE_CONFIG.use2kRandom) {
    Math.randomInt = new_randomInt;
    Math.random = new_random;
}

Math.setSeedFromArgs = function () {
    if (Utils.isNwjs()) {
        console.log(nw.App.argv);
        const index = nw.App.argv.indexOf('--seed');
        console.log("Seed Argument:" + index);
        if (index > -1 && index + 1 < nw.App.argv.length) {
            try {
                const value = Number.parseInt(nw.App.argv[index + 1]) & 0xFFFFFFFF;
                Math.seedRandom(value);
                return true;
            } catch (e) {
                console.log(e);
            }
        }
    }

    return false;
}