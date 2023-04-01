import create_ui from "./dropdownpantheon.js";

// We need to check every frame if the pantheon minigame has loaded
// because if the pantheon minigame hasn't been unlocked its script will
// not load meaning create_ui will not work
function hook(){
    if (Game.Objects.Temple.minigame != null){
        create_ui();
        // Once we have created our ui we don't need to do anything anymore
        Game.removeHook("draw", hook);
    }
}

// InitSaveLoad object to register mod
let isl = {
    // To init we just register our hook and let it do its thing
    init: ()=>{Game.registerHook("draw", hook)},
    // This mod doesn't need to save or load anything
    save: ()=>{},
    load: ()=>{}
};
// Register mod in game context
Game.registerMod('DropdownPantheon', isl);
