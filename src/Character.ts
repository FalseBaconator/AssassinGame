import { AssetManager } from "./AssetManager";

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
    protected sprite:createjs.Sprite;
    protected stage:createjs.StageGL;
    protected assetManager:AssetManager;

    public constructor(sprite:createjs.Sprite, stage:createjs.StageGL, assetManager:AssetManager){
        this.sprite = sprite;
        this.stage = stage;
        this.assetManager = assetManager;
    }

    get state(){
        return this._state;
    }

    set state(value:number){
        this._state = value;
    }

    get dir(){
        return this._dir;
    }

    set dir(value:number){
        switch(value){
            case Character.DIR_DOWN:
                this.sprite.gotoAndPlay("DownWalk");
                break;
            case Character.DIR_UP:
                this.sprite.gotoAndPlay("UpWalk");
                break;
            case Character.DIR_LEFT:
                this.sprite.gotoAndPlay("LeftWalk");
                break;
            case Character.DIR_RIGHT:
                this.sprite.gotoAndPlay("RightWalk");
                break;
        }
    }

    public PositionMe(x:number, y:number){
        this.sprite.x = x;
        this.sprite.y = y;
    }

    protected Move():void {
        if(this.state == Character.STATE_DEAD) return;
        switch(this._dir){
            case Character.DIR_DOWN:
                this.sprite.y -= this.speed;
                break;
            case Character.DIR_LEFT:
                this.sprite.x -= this.speed;
                break;
            case Character.DIR_RIGHT:
                this.sprite.x += this.speed;
                break;
            case Character.DIR_UP:
                this.sprite.y += this.speed;
                break;
        }
    }

    protected Attack():void{
        if(this.state == Character.STATE_DEAD) return;
        this.state = Character.STATE_ATTACKING;
        switch(this.dir){
            case Character.DIR_DOWN:
                this.sprite.gotoAndPlay("DownAttack");
                break;
            case Character.DIR_LEFT:
                this.sprite.gotoAndPlay("LeftAttack");
                break;
            case Character.DIR_RIGHT:
                this.sprite.gotoAndPlay("RightAttack");
                break;
            case Character.DIR_UP:
                this.sprite.gotoAndPlay("UpAttack");
                break;
        }
    }

    /*
    public update(){
        switch(this.state){
            case Character.STATE_MOVING:
                this.Move();
                break;
            case Character.STATE_ATTACKING:
                break;
        }
    }
    */

}