// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import { AssetManager } from "./AssetManager";
import { Player } from "./Player";
import { Layout } from "./Layout";
import { Room } from "./Room";
import { Character } from "./Character";

// game setup variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

// game object variables
let bg:createjs.Sprite;
let room1:Room;
let room2:Room;
let room3:Room;
let room4:Room;
let roomArray:Room[][];
let map:Layout;
let player:Player;

let up:Boolean;
let down:Boolean;
let left:Boolean;
let right:Boolean;
let attacking:Boolean;

function MonitorKeys(){
    if(up) player.dir = Character.DIR_UP;
    else if(down) player.dir = Character.DIR_DOWN;
    else if(left) player.dir = Character.DIR_LEFT;
    else if(right) player.dir = Character.DIR_RIGHT;
    else if(player.state == Character.STATE_MOVING) player.state = Character.STATE_IDLE;

}


// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> all assets loaded – ready to add sprites to game");

    // construct game objects here
    bg = assetManager.getSprite("Background", "Background");
    stage.addChild(bg);

    room1  = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room1");
    room2  = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room2");
    room3  = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "room3");
    room4  = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "room4");

    roomArray = [[room1, room2],[room3, room4]];

    map = new Layout(roomArray, 0,0);

    player = new Player(map, stage, assetManager);

    //let sprite:createjs.Sprite = assetManager.getSprite("Player", "DownWalk");
    //stage.addChild(sprite);

    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp; 

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onTick(e:createjs.Event) {
    // displaying frames per second - comment this out when game is published
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is your game loop!
    //MonitorKeys();
    player.update();

    // update the stage
    stage.update();
}

function onKeyDown(e:KeyboardEvent):void {
    // console.log("key has been pressed down: " + e.key);
    switch(e.key){
        case "ArrowLeft":
        case "a":
            left = true;
            player.state = Character.STATE_MOVING;
            break;
        case "ArrowDown":
        case "s":
            down = true;
            player.state = Character.STATE_MOVING;
            break;
        case "ArrowRight":
        case "d":
            right = true;
            player.state = Character.STATE_MOVING;
            break;
        case "ArrowUp":
        case "w":
            up = true;
            player.state = Character.STATE_MOVING;
            break;
    }
    MonitorKeys();
}

function onKeyUp(e:KeyboardEvent):void {
    switch(e.key){
        case "ArrowLeft":
        case "a":
            left = false;
            break;
        case "ArrowDown":
        case "s":
            down = false;
            break;
        case "ArrowRight":
        case "d":
            right = false;
            break;
        case "ArrowUp":
        case "w":
            up = false;
            break;
    }
    MonitorKeys();
}

// --------------------------------------------------- main method
function main():void {
    console.log(">> game initialization");
    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;    

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();