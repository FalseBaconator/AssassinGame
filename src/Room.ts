import { AssetManager } from "./AssetManager";
import { Guard } from "./Guard";

export class Room{
    public static EMPTY_SPACE = 0;
    public static WALL_SPACE = 1;
    public static TABLE_SPACE = 2;
    public static GUARD_SPACE = 3;

    public grid:number[][]
    public props:createjs.Sprite[];
    public guards:Guard[];
    public patrolRouteX:number[];
    public patrolRouteY:number[];

    public constructor(grid:number[][]){
        this.grid = grid;
    }

}