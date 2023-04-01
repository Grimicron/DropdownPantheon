import create_ui from "./dropdownpantheon.js";

// We need to check every frame if the temples have been levelled up
// because if the pantheon minigame hasnt been unlocked its script will
// not load meaning create_ui will not work
function hook(){
    if (Game.Objects.Temple.level > 0){
        create_ui();
        // Once we have created our ui we don't need to do anything anymore
        Game.removeHook("logic", hook);
    }
}

// InitSaveLoad object to register mod
let isl = {
    // To init we just register our hook and let it do its thing
    init: ()=>{Game.registerHook("logic", hook)},
    // This mod doesn't need to save or load anything
    save: ()=>{},
    load: ()=>{}
};
// Register mod in game context
Game.registerMod('DropdownPantheon', isl);
