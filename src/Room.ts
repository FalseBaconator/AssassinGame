import { AssetManager } from "./AssetManager";
import { Character } from "./Character";
import { Guard } from "./Guard";
import { Layout } from "./Layout";
import { Player } from "./Player";
import { Target } from "./Target";

export class Room{
    public static EMPTY_SPACE = 0;
    public static WALL_SPACE = 1;
    public static TABLE_SPACE = 2;
    public static GUARD_SPACE_DOWN = 3;
    public static GUARD_SPACE_UP = 4;
    public static GUARD_SPACE_LEFT = 5;
    public static GUARD_SPACE_RIGHT = 6;
    public static TARGET_SPACE = 7;

    public grid:number[][];
    public props:Array<createjs.Sprite>;
    public guards:Array<Character>;
    public patrolRouteX:number[];
    public patrolRouteY:number[];
    public stage:createjs.StageGL;
    public assetManager:AssetManager;
    public name:string;
    public map:Layout;
    public player:Player;
    public hasTarget:boolean;
    public target:Target;

    public constructor(grid:number[][], stage:createjs.StageGL, assetManager:AssetManager, name:string, map:Layout, player:Player){
        this.grid = grid;
        this.stage = stage;
        this.assetManager = assetManager;
        this.name = name;
        this.map = map;
        this.player = player;
    }

    public load(){
        this.props = new Array<createjs.Sprite>();
        this.guards = new Array<Character>();
        this.hasTarget = false;
        for(let i:number = 0; i < this.grid.length; i++){
            for(let j:number = 0; j< this.grid[0].length; j++){
                switch(this.grid[i][j])
                {
                    case Room.TABLE_SPACE:
                        this.props.push(this.assetManager.getSprite("Environment", "Table", j * 64, i * 64));
                        this.stage.addChildAt(this.props[this.props.length-1], 1);
                        break;
                    case Room.WALL_SPACE:
                        this.props.push(this.assetManager.getSprite("Environment", "Wall", j * 64, i * 64));
                        this.stage.addChild(this.props[this.props.length-1]);
                        break;
                    case Room.GUARD_SPACE_DOWN:
                        this.guards.push(new Guard(this.map, this.stage, this.assetManager, this.player, Character.DIR_DOWN, j * 64, i * 64));
                        break;
                    case Room.GUARD_SPACE_LEFT:
                        this.guards.push(new Guard(this.map, this.stage, this.assetManager, this.player, Character.DIR_LEFT, j * 64, i * 64));
                        break;
                    case Room.GUARD_SPACE_RIGHT:
                        this.guards.push(new Guard(this.map, this.stage, this.assetManager, this.player, Character.DIR_RIGHT, j * 64, i * 64));
                        break;
                    case Room.GUARD_SPACE_UP:
                        this.guards.push(new Guard(this.map, this.stage, this.assetManager, this.player, Character.DIR_UP, j * 64, i * 64));
                        break;
                    case Room.TARGET_SPACE:
                        this.hasTarget = true;
                        //console.log(this.hasTarget);
                        this.target = new Target(this.map, this.stage, this.assetManager);
                        break;
                }
            }
        }
    }

    public unload(){
        for(let i:number = 0; i < this.props.length; i++){
            this.stage.removeChild(this.props[i]);
        }
        for (let i = this.guards.length -1; i >=0; i--) {
            this.guards[i].Kill();
        }
        if(this.hasTarget){
            this.stage.removeChild(this.target.sprite);
        }
        this.props.length = 0;
    }

    public update(){
        for (let i = 0; i < this.guards.length; i++) {
            this.guards[i].update();            
        }
        if(this.hasTarget) this.target.update();
    }

}