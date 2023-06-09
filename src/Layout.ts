import { AssetManager } from "./AssetManager";
import { Room } from "./Room";

export class Layout{

    public map:Room[][];

    public currentRoom:Room;

    public x:number;
    public y:number;
    private startX:number;
    private startY:number;

    public constructor(x:number, y:number){
        //this.map = map;
        this.x = x;
        this.startX = x;
        this.y = y;
        this.startY = y;
        //this.currentRoom = map[y][x];
        //this.currentRoom = startingRoom;
        //this.currentRoom.load();
    }

    public switchRoom(x:number, y:number){
        this.currentRoom.unload();
        this.x = this.x + x;
        this.y = this.y + y;
        this.currentRoom = this.map[this.y][this.x];
        this.currentRoom.load();
    }

    public setRoomArray(map:Room[][]){
        this.map = map;
        this.currentRoom = map[this.y][this.x];
        this.currentRoom.load();
    }

    public update(){
        this.currentRoom.update();
    }

    public Reset(){
        this.currentRoom.unload();
        this.x = this.startX;
        this.y = this.startY;
        this.currentRoom = this.map[this.startY][this.startX];
        this.currentRoom.load();
    }

}