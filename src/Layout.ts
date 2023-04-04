import { AssetManager } from "./AssetManager";
import { Room } from "./Room";

export class Layout{

    public map:Room[][];

    public currentRoom:Room;

    public x:number;
    public y:number;

    public constructor(map:Room[][], x:number, y:number){
        this.map = map;
        this.x = x;
        this.y = y;
        this.currentRoom = map[y][x];
        //this.currentRoom = startingRoom;
        this.currentRoom.load();
    }

    public switchRoom(x:number, y:number){
        this.currentRoom.unload();
        this.x = this.x + x;
        this.y = this.y + y;
        this.currentRoom = this.map[this.y][this.x];
        this.currentRoom.load();
    }

}