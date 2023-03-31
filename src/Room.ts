import { AssetManager } from "./AssetManager";
import { Guard } from "./Guard";

export class Room{
    public static EMPTY_SPACE = 0;
    public static WALL_SPACE = 1;
    public static TABLE_SPACE = 2;

    public environmentGrid:number[][]
    public props:createjs.Sprite[];
    public guards:Guard[];
    public patrolRouteX:number[];
    public patrolRouteY:number[];


}