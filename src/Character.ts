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
        if(value == Character.STATE_IDLE){
            switch(this._dir){
                case Character.DIR_DOWN:
                    this.sprite.gotoAndStop("DownWalk");
                    break;
                case Character.DIR_LEFT:
                    this.sprite.gotoAndStop("LeftWalk");
                    break;
                case Character.DIR_RIGHT:
                    this.sprite.gotoAndStop("RightWalk");
                    break;
                case Character.DIR_UP:
                    this.sprite.gotoAndStop("UpWalk");
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
                if(this.sprite.currentAnimation != "DownWalk" || this.sprite.paused == true)
                    this.sprite.gotoAndPlay("DownWalk");
                break;
            case Character.DIR_UP:
                if(this.sprite.currentAnimation != "UpWalk" || this.sprite.paused == true)
                    this.sprite.gotoAndPlay("UpWalk");
                break;
            case Character.DIR_LEFT:
                if(this.sprite.currentAnimation != "LeftWalk" || this.sprite.paused == true)
                    this.sprite.gotoAndPlay("LeftWalk");
                break;
            case Character.DIR_RIGHT:
                if(this.sprite.currentAnimation != "RightWalk" || this.sprite.paused == true)
                    this.sprite.gotoAndPlay("RightWalk");
                break;
        }
        this._dir = value;
    }

    public PositionMe(x:number, y:number){
        this.sprite.x = x;
        this.sprite.y = y;
    }

    protected Move():void {
        if(this.state == Character.STATE_DEAD) return;
        //console.log(this._dir);
        switch(this._dir){
            case Character.DIR_DOWN:
                this.sprite.y += this.speed;
                break;
            case Character.DIR_LEFT:
                this.sprite.x -= this.speed;
                break;
            case Character.DIR_RIGHT:
                this.sprite.x += this.speed;
                break;
            case Character.DIR_UP:
                this.sprite.y -= this.speed;
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