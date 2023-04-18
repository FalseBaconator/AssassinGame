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
let room5:Room;
let room6:Room;
let room7:Room;
let room8:Room;
let room9:Room;
let room10:Room;
let room11:Room;
let room12:Room;
let room13:Room;
let room14:Room;
let room15:Room;
let room16:Room;
let room17:Room;
let emptyRoom:Room;
let roomArray:Room[][];
let map:Layout;
let player:Player;

let up:Boolean;
let down:Boolean;
let left:Boolean;
let right:Boolean;
let attacking:Boolean;

let loop:number = -1;

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
    createjs.Sound.play("Song", null, null, null, loop);
    // construct game objects here
    bg = assetManager.getSprite("Background", "Background");
    stage.addChild(bg);


    map = new Layout(1,6);

    player = new Player(map, stage, assetManager);

    room1  = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,2,0,0,0,1],
        [1,0,0,0,0,7,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room1", map, player);
    room2  = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,6,2,5,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room2", map, player);
    room3  = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,6,0,0,0,0,5,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,3,0,0,0,0,3,0,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "room3", map, player);
    room4  = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,3,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,5,0,1],
        [1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room4", map, player);
    room5  = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,1,0,0,0,0,0,1],
        [1,2,0,0,0,0,1,0,0,1],
        [1,0,0,1,0,0,1,1,0,1],
        [1,1,1,1,0,0,0,0,0,0],
        [1,1,1,1,0,0,5,0,0,0],
        [1,0,0,1,4,0,1,1,0,1],
        [1,2,0,0,0,0,1,0,0,1],
        [1,0,0,1,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room5", map, player);
    room6 = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,6,0,0,0,0,0,0,5,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room6", map, player);
    room7 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,5,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,4,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room7", map, player);
    room8 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,5,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,6,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room8", map, player);
    room9 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,5,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1],
        [1,0,0,1,0,0,1,0,0,1],
        [1,2,0,0,0,0,0,0,2,1],
        [1,0,0,1,0,0,1,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room9", map, player);
    room10 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,1,1,1,0,0,1,1,1,1],
        [1,1,1,1,0,0,1,1,1,1],
        [1,1,1,1,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "room10", map, player);
    room11 = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,3,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,4,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room11", map, player);
    room12 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,3,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "room12", map, player);
    room13 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room13", map, player);
    room14 = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,2,0,1,1,0,2,0,1],
        [1,0,0,0,1,1,0,0,0,1],
        [1,1,0,1,1,1,1,0,1,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,0,1,1,1,1,0,1,1],
        [1,0,0,0,1,1,0,0,0,1],
        [1,0,2,0,1,1,0,2,0,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "room14", map, player);
    room15 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,6,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [1,0,0,4,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "room15", map, player);
    room16 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,6,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,1,1,1,1]
        ], stage, assetManager, "room16", map, player);
    room17 = new Room([[1,1,1,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "room17", map, player);
    emptyRoom = new Room([[1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
        ], stage, assetManager, "emptyRoom", map, player);

    roomArray = [[emptyRoom, room1, emptyRoom, emptyRoom],
                [room2, room3, room4, emptyRoom],
                [room5, room6, room7, emptyRoom],
                [room8, room9, room10, room11],
                [room12, room13, room14, room15],
                [emptyRoom, room16, emptyRoom, emptyRoom],
                [emptyRoom, room17, emptyRoom, emptyRoom]];

    map.setRoomArray(roomArray);


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
    map.update();

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
        case " ":
            attacking = true;
            player.state = Character.STATE_ATTACKING;
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
        case " ":
            attacking = false;
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