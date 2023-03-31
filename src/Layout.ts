import { AssetManager } from "./AssetManager";
import { Room } from "./Room";

export class Layout{

    public map:Room[][];

    public currentRoom:Room;

    public constructor(map:Room[][], startingRoom:Room){
        this.map = map;
        this.currentRoom = startingRoom;
    }

}