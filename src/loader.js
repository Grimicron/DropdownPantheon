import create_ui from "./dropdownpantheon.js";

// InitSaveLoad object to register mod
let isl = {
    init: create_ui,
    // This mod doesn't need to save or load anything
    save: (()=>{}),
    load: (()=>{})
};
// Register mod in game context
Game.registerMod('DropdownPantheon', isl);
