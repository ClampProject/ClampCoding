import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'controls_';
const categoryColor = '#bc55ff';

function register() {
    // mouse pressed
    registerBlock(`${categoryPrefix}mousepressed`, {
        message0: 'mouse button %1 pressed?',
        args0: [
            {
                "type": "field_dropdown",
                "name": "BUTTON",
                "options": [
                    ["left", "leftdown"],
                    ["right", "rightdown"],
                    ["middle", "middledown"]
                ]
            },
        ],
        output: ["Boolean"],
        colour: categoryColor
    }, (block) => {
        const BUTTON = block.getFieldValue('BUTTON');
        const code = `InputDevice.mouse[${JSON.stringify(BUTTON)}]`;
        return [`(${code})`, javascriptGenerator.ORDER_NONE];
    })

    //mouse out of bounds
    registerBlock(`${categoryPrefix}mouseoob`, {
        message0: 'mouse outside game player?',
        args0: [],
        output: ["Boolean"],
        colour: categoryColor
    }, (block) => {
        const code = `InputDevice.mouse.oob`;
        return [`(${code})`, javascriptGenerator.ORDER_NONE];
    })

    // mouse x
    registerBlock(`${categoryPrefix}mousex`, {
        message0: 'mouse x',
        args0: [],
        output: ["Number"],
        colour: categoryColor
    }, (block) => {
        const code = `InputDevice.mouse.x`;
        return [`(${code})`, javascriptGenerator.ORDER_NONE];
    })

    // mouse y
    registerBlock(`${categoryPrefix}mousey`, {
        message0: 'mouse y',
        args0: [],
        output: ["Number"],
        colour: categoryColor
    }, (block) => {
        const code = `InputDevice.mouse.y`;
        return [`(${code})`, javascriptGenerator.ORDER_NONE];
    })

    // key pressed
    registerBlock(`${categoryPrefix}keypressed`, {
        message0: 'is key %1 pressed?',
        args0: [
            {
                type: "field_dropdown",
                name: "KEY",
                options: [["space"," "],["left arrow","ArrowLeft"],["right arrow","ArrowRight"],["up arrow","ArrowUp"],["down arrow","ArrowDown"],["enter","Enter"],["escape","Escape"],["tab","Tab"],["shift","Shift"],["control","Control"],["alt","Alt"],["caps lock","CapsLock"],["backspace","Backspace"],["a","a"],["b","b"],["c","c"],["d","d"],["e","e"],["f","f"],["g","g"],["h","h"],["i","i"],["j","j"],["k","k"],["l","l"],["m","m"],["n","n"],["o","o"],["p","p"],["q","q"],["r","r"],["s","s"],["t","t"],["u","u"],["v","v"],["w","w"],["x","x"],["y","y"],["z","z"],["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["f1","F1"],["f2","F2"],["f3","F3"],["f4","F4"],["f5","F5"],["f6","F6"],["f7","F7"],["f8","F8"],["f9","F9"],["f10","F10"],["f11","F11"],["f12","F12"]] // this is bad but i do not care :BLEH:
            },
        ],
        output: "Boolean",
        colour: categoryColor
    }, (block) => {
        const KEY = block.getFieldValue('KEY');
        const code = `InputDevice.keys[${JSON.stringify(KEY)}]`;
        return [`(${code})`, javascriptGenerator.ORDER_NONE];
    })
}

export default register;
