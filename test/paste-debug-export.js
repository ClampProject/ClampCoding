/* THIS CODE WAS GENERATED BY CLAMP / BLOCKLY. IT IS NOT INTENDED TO BE READ BY HUMANS IN ITS FULL FORM. */
// Comments may still appear as they are useful internally.
console.log("Initializing Project, please wait...");
const INITIALIZE_BEGIN = Date.now(); // it may be useful in development to see how long it took to initialize
const variables = {}; // all variables are stored here instead of a "const variable = 123" for each set block
// this is so we dont end up with a Scratch for Discord where setting a variable with the name "message" breaks everything
// im allowed to say that because i worked on S4D lolol
(async function () {
    const nameTable = { characters: {}, images: {}, sounds: {} }; // contains the ID: Name for each type
    nameTable.images["_hardcoded_apple"] = String("Apple");
    nameTable.sounds["_hardcoded_explode"] = String("Explode");
    nameTable.characters["_default_apple"] = String("Apple");
    const characters = {}; // object so we can use invalid characters for character names and still easily access them
    const images = {};
    const sounds = {};
    const characterFunctions = {}; // funny functionz :P this comment is so helpful
    images["_hardcoded_apple"] = await Kaboom.loadSprite("_hardcoded_apple", "https://kaboomjs.com/sprites/apple.png");
    sounds["_hardcoded_explode"] = await Kaboom.loadSound("_hardcoded_explode", "https://clamp-project.vercel.app/sounds/explode.mp3");
    characters["_default_apple"] = Kaboom.add([
        Kaboom.sprite("_hardcoded_apple"),
        Kaboom.pos(320, 180),
        Kaboom.scale(100),
        Kaboom.rotate(0),
    ]); console.log(characters["_default_apple"]);
    /* extra events & setup */
    console.log("Content Loaded in", (Date.now() - INITIALIZE_BEGIN), "millseconds");
    ClampEditor.initializingCode = false; // tell clamp we are finished initializing the project and we can start running the user code
    Engine.emitGlobal("CODE_INITIALIZE_UPDATE"); // read above comment for details; this event is for svelte to update since it cant tell the state changed
    // technically thats a Svelte problem that i could report but its such a specific use-case that i dont think its worth fixing
    /* ok enough baby stuff LETS RUN SOME CODE */
    // Character "_default_apple"
    characterFunctions["_default_apple"] = (character) => { // characterFunctions is defined in setupCode
        Engine.on("RUN_BUTTON", () => {
            character.moveTo(Number((Number(320))), Number((Number(180))));
        });

    }
    characterFunctions["_default_apple"](characters["_default_apple"]); // run code for character "_default_apple"
})(Kaboom);