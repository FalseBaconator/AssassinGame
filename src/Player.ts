import { AssetManager } from "./AssetManager";
import { Character } from "./Character";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import { Layout } from "./Layout";

export class Player extends Character{

    public map:Layout;

    public constructor(map:Layout, stage:createjs.StageGL, assetManager:AssetManager){
        super(assetManager.getSprite("Player", "DownWalk"), stage, assetManager, map);
        this.PositionMe(320, 320);
        this.stage.addChild(this._sprite);
        this.map = map;
    }

    public override update(){
        super.update();
        if(this._sprite.x > STAGE_WIDTH + this._sprite.getBounds().width){
            this.map.switchRoom(1, 0);
            this.PositionMe(-this._sprite.getBounds().width + this.speed, this._sprite.y);
        }
        else if(this._sprite.x < -this._sprite.getBounds().width){
            this.map.switchRoom(-1, 0);
            this.PositionMe(this._sprite.getBounds().width - this.speed + STAGE_WIDTH, this._sprite.y);
        }
        else if(this._sprite.y > STAGE_HEIGHT + this._sprite.getBounds().height){
            this.map.switchRoom(0, 1);
            this.PositionMe(this._sprite.x, -this._sprite.getBounds().height + this.speed);
        }
        else if(this._sprite.y < -this._sprite.getBounds().height){
            this.map.switchRoom(0, -1);
            this.PositionMe(this._sprite.x, this._sprite.getBounds().height - this.speed + STAGE_HEIGHT);
        }
    }

}