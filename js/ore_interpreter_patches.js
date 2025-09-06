// OpenRPGEditor patches

if ($ORE_CONFIG.enableCallEventCommand) {
    Game_Interpreter.prototype.command141 = function () {
        console.log("This is a custom event command to call other events!\nCurrently unimplemented.");
        return true;
    }
}