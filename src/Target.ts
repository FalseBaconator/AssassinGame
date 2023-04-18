import { Character } from "./Character"
import { Layout } from "./Layout";
import { AssetManager } from "./AssetManager";
import { Player } from "./Player";


export class Target extends Character{

    public map:Layout;
    //public player:Player;
    ended:boolean = false;

    public constructor(map:Layout, stage:createjs.StageGL, assetManager:AssetManager){
        super(assetManager.getSprite("Target", "UpWalk"), stage, assetManager, map);
        this.sprite.stop();
        this.PositionMe(320, 320);
        this.stage.addChild(this._sprite);
        this.map = map;
    }

    public override update(){
        if(this.ended) return;
        if(this.state == Character.STATE_DEAD){
            /*
            console.log("end");
            this.ended = true;
            this.map.currentRoom.unload();
            this.stage.removeAllChildren();
            let winScreen:createjs.Sprite;
            winScreen = this.assetManager.getSprite("Endings", "Win");
            this.stage.addChild(winScreen);
            */
           this.stage.dispatchEvent("win");
        }
    }

}