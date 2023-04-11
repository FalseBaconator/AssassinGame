import { AssetManager } from "./AssetManager";
import { Layout } from "./Layout";
import { boxHit, pointHit } from "./Toolkit";

export class Character{
    public static STATE_IDLE = 0;
    public static STATE_DEAD = 1;
    public static STATE_MOVING = 2;
    public static STATE_ATTACKING = 3;

    public static DIR_UP = 0;
    public static DIR_DOWN = 1;
    public static DIR_RIGHT = 2;
    public static DIR_LEFT = 3;

    //protected _moving:Boolean;
    protected _state:number = Character.STATE_IDLE;
    protected _dir:number = Character.DIR_DOWN;
    protected speed:number = 5;
    protected _sprite:createjs.Sprite;
    protected stage:createjs.StageGL;
    protected assetManager:AssetManager;
    protected map:Layout;
    protected colOffset:number = 2;

    public constructor(sprite:createjs.Sprite, stage:createjs.StageGL, assetManager:AssetManager, map:Layout){
        this._sprite = sprite;
        this.stage = stage;
        this.assetManager = assetManager;
        this.map = map;
    }

    get sprite(){
        return this._sprite;
    }

    get state(){
        return this._state;
    }

    set state(value:number){
        if(value == Character.STATE_IDLE){
            switch(this._dir){
                case Character.DIR_DOWN:
                    this._sprite.gotoAndStop("DownWalk");
                    break;
                case Character.DIR_LEFT:
                    this._sprite.gotoAndStop("LeftWalk");
                    break;
                case Character.DIR_RIGHT:
                    this._sprite.gotoAndStop("RightWalk");
                    break;
                case Character.DIR_UP:
                    this._sprite.gotoAndStop("UpWalk");
                    break;
            }
        }
        this._state = value;
    }

    get dir(){
        return this._dir;
    }

    set dir(value:number){
        //console.log(this._dir);
        switch(value){
            case Character.DIR_DOWN:
                if(this._sprite.currentAnimation != "DownWalk" || this._sprite.paused == true)
                    this._sprite.gotoAndPlay("DownWalk");
                break;
            case Character.DIR_UP:
                if(this._sprite.currentAnimation != "UpWalk" || this._sprite.paused == true)
                    this._sprite.gotoAndPlay("UpWalk");
                break;
            case Character.DIR_LEFT:
                if(this._sprite.currentAnimation != "LeftWalk" || this._sprite.paused == true)
                    this._sprite.gotoAndPlay("LeftWalk");
                break;
            case Character.DIR_RIGHT:
                if(this._sprite.currentAnimation != "RightWalk" || this._sprite.paused == true)
                    this._sprite.gotoAndPlay("RightWalk");
                break;
        }
        this._dir = value;
    }

    public PositionMe(x:number, y:number){
        this._sprite.x = x;
        this._sprite.y = y;
    }

    protected Move():void {
        if(this.state == Character.STATE_DEAD) return;
        //console.log(this._dir);
        switch(this._dir){
            case Character.DIR_DOWN:
                this._sprite.y += this.speed;
                if(this.checkEnviroCollision())
                    this._sprite.y -= this.speed;
                break;
            case Character.DIR_LEFT:
                this._sprite.x -= this.speed;
                if(this.checkEnviroCollision())
                    this._sprite.x += this.speed;
                break;
            case Character.DIR_RIGHT:
                this._sprite.x += this.speed;
                if(this.checkEnviroCollision())
                    this._sprite.x -= this.speed;
                break;
            case Character.DIR_UP:
                this._sprite.y -= this.speed;
                if(this.checkEnviroCollision())
                    this._sprite.y += this.speed;
                break;
        }
    }

    protected Attack():void{
        if(this.state == Character.STATE_DEAD) return;
        this.state = Character.STATE_ATTACKING;
        switch(this.dir){
            case Character.DIR_DOWN:
                this._sprite.gotoAndPlay("DownAttack");
                break;
            case Character.DIR_LEFT:
                this._sprite.gotoAndPlay("LeftAttack");
                break;
            case Character.DIR_RIGHT:
                this._sprite.gotoAndPlay("RightAttack");
                break;
            case Character.DIR_UP:
                this._sprite.gotoAndPlay("UpAttack");
                break;
        }
    }

    protected checkEnviroCollision():boolean{
        for(let i:number = 0; i < this.map.currentRoom.props.length; i++){
            switch(this.dir){
                case Character.DIR_DOWN:
                    if(pointHit(this._sprite, this.map.currentRoom.props[i], this.colOffset, 64)
                    || pointHit(this._sprite, this.map.currentRoom.props[i], 64-this.colOffset, 64))
                        return true;
                    break;
                case Character.DIR_LEFT:
                    if(pointHit(this._sprite, this.map.currentRoom.props[i], 0, this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.props[i], 0, 64-this.colOffset))
                        return true;
                    break;
                case Character.DIR_RIGHT:
                    if(pointHit(this._sprite, this.map.currentRoom.props[i], 64, this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.props[i], 64, this._sprite.getBounds().height-this.colOffset))
                        return true;
                    break;
                case Character.DIR_UP:
                    if(pointHit(this._sprite, this.map.currentRoom.props[i], this.colOffset, 0)
                    || pointHit(this._sprite, this.map.currentRoom.props[i], 64-this.colOffset, 0))
                        return true;
                    break;
            }
        }
        return false;
    }


    public update(){
        switch(this.state){
            case Character.STATE_MOVING:
                this.Move();
                break;
            case Character.STATE_ATTACKING:
                break;
        }
    }
    

}