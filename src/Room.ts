import { AssetManager } from "./AssetManager";
import { Guard } from "./Guard";

export class Room{
    public static EMPTY_SPACE = 0;
    public static WALL_SPACE = 1;
    public static TABLE_SPACE = 2;
    public static GUARD_SPACE = 3;

    public grid:number[][];
    public props:Array<createjs.Sprite>;
    public guards:Guard[];
    public patrolRouteX:number[];
    public patrolRouteY:number[];
    public stage:createjs.StageGL;
    public assetManager:AssetManager;
    public name:string;

    public constructor(grid:number[][], stage:createjs.StageGL, assetManager:AssetManager, name:string){
        this.grid = grid;
        this.stage = stage;
        this.assetManager = assetManager;
        this.name = name;
    }

    public load(){
        this.props = new Array<createjs.Sprite>();
        for(let i:number = 0; i < this.grid.length; i++){
            for(let j:number = 0; j< this.grid[0].length; j++){
                switch(this.grid[i][j])
                {
                    case Room.TABLE_SPACE:
                        this.props.push(this.assetManager.getSprite("Environment", "Table", j * 64, i * 64));
                        this.stage.addChild(this.props[this.props.length-1]);
                        break;
                    case Room.WALL_SPACE:
                        this.props.push(this.assetManager.getSprite("Environment", "Wall", j * 64, i * 64));
                        this.stage.addChild(this.props[this.props.length-1]);
                        break;
                }
            }
        }
    }

    public unload(){
        for(let i:number = 0; i < this.props.length; i++){
            this.stage.removeChild(this.props[i]);
        }
        this.props.length = 0;
    }

}