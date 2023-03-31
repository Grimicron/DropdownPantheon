# Dropdown Pantheon

Dropdown pantheon is  a Cookie Clicker mod design to fix an issue mobile users face when playing Cookie Clicker. 
In the pantheon minigame, players are meant to drag and drop spirits onto worship slots to make use of their benefits.
However, in many mobile devices, the code present for dragging and dropping is glitchy or doesn't work, rendering an
essential part of the game unplayable. Dropdown Pantheon provides a solution for this by implementing some simple
dropdown menus to choose the spirit and slot they should go in.

## Usage

This mod can be installed like any other mod, most notably by bookmarklets and the Cookie Clicker Mod Manager.

To install this mod using a bookmarklet, create a bookmark on your browser of choice and paste this in for the URL:

    javascript: Game.LoadMod("https://cdn.jsdelivr.net/gh/Grimicron/DropdownPantheon@main/dist/dist.js");

To install this mod using Cookie Clicker Mod Manager, go to the extension's options, click on "Register new mod",
then paste this as its URL (you can give it any name):

    https://cdn.jsdelivr.net/gh/Grimicron/DropdownPantheon@main/dist/dist.js

Of course, another option is instead of using Game.LoadMod(), you could use the mod's raw code, which
can be found in `dist/dist.js`. This could be done either in a bookmarklet once again or manually
through the devtool's console.

## Details

First and foremost, **this mod is open sourced**, as it is licensed under the GPL 3.0. This mod was designed for Cookie Clicker v2.048.
The source code is short and has many comments to make it easier to understand and modify in the future. In this repository, you will
find a folder called "cookieclickersrc". This folder has some of the source code of Cookie Clicker (taken directly from
<https://orteil.dashnet.org/cookieclicker/>). This was used to get an understanding of how the game worked and develop the mod.
The `.replit` and `replit.nix` files are config files from Replit, the online IDE I used while developing this mod. For all intents and
purposes, these files should be ignored.