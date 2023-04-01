// NOTE: l(what) is just a document.getElementById(what)

// Called by swap_button to simulate the drag'n'drop
function swap_god(god_id, slot_id) {
    // Get the minigame object from game context
    let minigame = Game.Objects.Temple.minigame;
    // From id to data (as if it were our M.dragging)
    let god_data = minigame.godsById[god_id];
    // If the requested swap would change anything
    // Don't do anything but play an SFX
    if (god_data.slot == slot_id){
        PlaySound('snd/sell1.mp3', 0.75);
        console.log("No change!");
        return;
    }
    // If the user doesnt have enough swaps to place the god into a worship slot
    // Don't let them
    if ((0 == minigame.swaps) && (slot_id != -1)){
        PlaySound('snd/sell1.mp3', 0.75);
        console.log("No swaps left!");
        return;
    }
    // Get the DOM representation of our god and prepare it
    let div = l('templeGod' + god_data.id);
    div.className = 'ready templeGod titleFont';
    div.style.transform = 'none';
    // God placed into worship slot
    if (slot_id != -1) {
        // Use swap
        minigame.useSwap(1);
        minigame.lastSwapT = 0;
        // Get the god who was in the chosen slot
        let prev = minigame.slot[slot_id];
        // Was there someone there? (-1 = empty, other = occupied)
        if (prev != -1) {
            // Convert previous god from id to object with more info
            let prev_data = minigame.godsById[prev];
            // Place god who was occupying spot into god_id's old spot
            let prevDiv = l('templeGod' + prev_data.id);
            // Swap to other worship slot
            if (god_data.slot != -1) {
                l('templeSlot' + god_data.slot).appendChild(prevDiv);
            }
            // Swap back to roster
            else {
                let other = l('templeGodPlaceholder' + (prev.id));
                other.parentNode.insertBefore(prevDiv, other);
            }
        }
        // Draw our god's icon in his new slot
        l('templeSlot' + slot_id).appendChild(div);
        // SFX
        PlaySound('snd/tick.mp3');
        PlaySound('snd/spirit.mp3', 0.5);
        // Sparkles
        let rect = div.getBounds();
        Game.SparkleAt((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2 - 24 + 32 - TopBarOffset);
    }
    // God placed into roster
    else {
        // Not all that sure what this does
        let other = l('templeGodPlaceholder' + god_data.id);
        other.parentNode.insertBefore(div, other);
        other.style.display = 'none';
        // SFX
        PlaySound('snd/sell1.mp3', 0.75);
    }
    // Modify the data kept by the minigame (changes to slot placements)
    // This can be placed here since we always perform this operation past the inital checks
    // Can't be placed before the if-else because it would mess with some of the logic there needing the inital state,
    // not the swapped state (I think)
    minigame.slotGod(god_data, slot_id);
};

// Creates dropdowns to select the god & slot and a button which calls swap_god
export default function create_ui() {
    // Get the div of the temple minigame
    let container = l("templeContent");
    // Selects with the gods and slots and appropiate numerical ids
    let god_select = document.createElement("select");
    god_select.name = "god_select";
    god_select.id = "god_select";
    for (const god of Game.Objects.Temple.minigame.godsById) {
        let option = document.createElement("option");
        option.text = god.name.split(",")[0];
        option.value = god.id;
        god_select.appendChild(option);
    }
    let slot_select = document.createElement("select");
    slot_select.name = "slot_select";
    slot_select.id = "slot_select";
    const slots = ["Roster", "Diamond", "Ruby", "Jade"];
    for (let i = 0; i < slots.length; i++) {
        let option = document.createElement("option");
        option.text = slots[i];
        option.value = i - 1;
        slot_select.appendChild(option);
    }
    // This buttons calls the swap_god function when pressed with the values of the select
    let swap_button = document.createElement("button");
    swap_button.id = "swap_button";
    swap_button.innerText = "Worship"
    // Match deafult style of dropdowns (which I think looks good)
    swap_button.style = "font-weight: bold;"
                       +"font-size: 11px;"
                       +"margin: 2px 4px 2px 0px;"
                       +"padding: 3px;"
                       +"border-radius: 3px;";
    swap_button.onclick = (() => { swap_god(l("god_select").value, l("slot_select").value) });
    // Append UI elems to our container
    container.append(god_select);
    container.append(slot_select);
    container.append(swap_button);
}
