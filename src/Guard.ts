import { AssetManager } from "./AssetManager";
import { Character } from "./Character";
import { SPRITE_SIZE, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import { Layout } from "./Layout";
import { Player } from "./Player";

export class Guard extends Character{

    public map:Layout;
    public player:Player;

    public constructor(map:Layout, stage:createjs.StageGL, assetManager:AssetManager, player:Player, dir:number, x:number, y:number){
        super(assetManager.getSprite("Guard", "DownWalk"), stage, assetManager, map);
        this.PositionMe(x, y);
        this.stage.addChild(this._sprite);
        this.map = map;
        this.player = player;
        this.dir = dir;
        this.speed = 3;
    }

    public override update(){
        this.visionCheck();
        if(this.state == Character.STATE_MOVING) this.directionCheck();
        super.update();
    }

    public directionCheck(){
        let tempX:number = this.player.sprite.x - this.sprite.x;
        let tempY:number = this.player.sprite.y - this.sprite.y;
        if(Math.abs(tempX) >= Math.abs(tempY)){
            if(tempX >= 0) this.dir = Character.DIR_RIGHT;
            else this.dir = Character.DIR_LEFT;
        }else{
            if(tempY >= 0) this.dir = Character.DIR_DOWN;
            else this.dir = Character.DIR_UP;
        }
    }

    public visionCheck(){
        switch(this.dir){
            case Character.DIR_DOWN:
                if(this.player.sprite.x + SPRITE_SIZE > this.sprite.x &&
                    this.player.sprite.x < this.sprite.x + SPRITE_SIZE &&
                    this.player.sprite.y > this.sprite.y){
                        this.state = Character.STATE_MOVING;
                    }
                break;
            case Character.DIR_UP:
                if(this.player.sprite.x + SPRITE_SIZE > this.sprite.x &&
                    this.player.sprite.x < this.sprite.x + SPRITE_SIZE &&
                    this.player.sprite.y < this.sprite.y){
                        this.state = Character.STATE_MOVING;
                    }
                break;
            case Character.DIR_LEFT:
                if(this.player.sprite.y + SPRITE_SIZE > this.sprite.y &&
                    this.player.sprite.y < this.sprite.y + SPRITE_SIZE &&
                    this.player.sprite.x < this.sprite.x){
                        this.state = Character.STATE_MOVING;
                    }
                break;
            case Character.DIR_RIGHT:
                if(this.player.sprite.y + SPRITE_SIZE > this.sprite.y &&
                    this.player.sprite.y < this.sprite.y + SPRITE_SIZE &&
                    this.player.sprite.x > this.sprite.x){
                        this.state = Character.STATE_MOVING;
                    }
                break;
        }
    }

}