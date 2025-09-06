//=============================================================================
// main.js
//=============================================================================

window.onload = function () {
    if ($ORE_CONFIG.use2kRandom) {
        var seed = Date.now() & 0x7FFFFFFF;
        if (!Math.setSeedFromArgs()) {
            Math.seedRandom(seed);
        } else {
            seed = __rand.seed;
        }
        console.log("Seeded random with: " + seed);
    }
    PluginManager.setup($plugins);
    SceneManager.run(Scene_Boot);
};
