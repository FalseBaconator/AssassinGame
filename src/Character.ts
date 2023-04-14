import { AssetManager } from "./AssetManager";
import { SPRITE_SIZE } from "./Constants";
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

    public Kill(){
        this.stage.removeChild(this.sprite);
        if(this.map.currentRoom.guards.includes(this)) this.map.currentRoom.guards;
        this.state = Character.STATE_DEAD;
    }

    protected Attack():void{
        if(this.state == Character.STATE_DEAD) return;
        if(this.sprite.currentAnimation != "DownAttack" &&
        this.sprite.currentAnimation != "LeftAttack" &&
        this.sprite.currentAnimation != "RightAttack" &&
        this.sprite.currentAnimation != "UpAttack")
        {
            switch(this.dir){
                case Character.DIR_DOWN:
                    this._sprite.gotoAndPlay("DownAttack");
                    for (let i = 0; i < this.map.currentRoom.guards.length; i++) {
                        if(pointHit(this.sprite, this.map.currentRoom.guards[i].sprite, SPRITE_SIZE/2 + 15, SPRITE_SIZE+15) ||
                        pointHit(this.sprite, this.map.currentRoom.guards[i].sprite, SPRITE_SIZE/2 - 15, SPRITE_SIZE+15)) this.map.currentRoom.guards[i].Kill();
                    }
                    if(pointHit(this.sprite, this.map.currentRoom.player.sprite, SPRITE_SIZE/2 + 15, SPRITE_SIZE+15) || 
                    pointHit(this.sprite, this.map.currentRoom.player.sprite, SPRITE_SIZE/2 - 15, SPRITE_SIZE+15))this.map.currentRoom.player.Kill();
                    if(this.map.currentRoom.hasTarget == true){
                        if(pointHit(this.sprite, this.map.currentRoom.target.sprite, SPRITE_SIZE/2 + 15, SPRITE_SIZE+15) || 
                        pointHit(this.sprite, this.map.currentRoom.target.sprite, SPRITE_SIZE/2 - 15, SPRITE_SIZE+15))this.map.currentRoom.target.Kill();
                    }
                    break;
                case Character.DIR_LEFT:
                    this._sprite.gotoAndPlay("LeftAttack");
                    for (let i = 0; i < this.map.currentRoom.guards.length; i++) {
                        if(pointHit(this.sprite, this.map.currentRoom.guards[i].sprite, - 15, SPRITE_SIZE/2 + 15) ||
                        pointHit(this.sprite, this.map.currentRoom.guards[i].sprite, - 15, SPRITE_SIZE/2 - 15)) this.map.currentRoom.guards[i].Kill();
                    }
                    if(pointHit(this.sprite, this.map.currentRoom.player.sprite, - 15, SPRITE_SIZE/2 + 15) ||
                    pointHit(this.sprite, this.map.currentRoom.player.sprite, - 15, SPRITE_SIZE/2 - 15))this.map.currentRoom.player.Kill();
                    if(this.map.currentRoom.hasTarget){
                        if(pointHit(this.sprite, this.map.currentRoom.target.sprite, - 15, SPRITE_SIZE/2 + 15) ||
                        pointHit(this.sprite, this.map.currentRoom.target.sprite, - 15, SPRITE_SIZE/2 - 15))this.map.currentRoom.target.Kill();
                    }
                    break;
                case Character.DIR_RIGHT:
                    this._sprite.gotoAndPlay("RightAttack");
                    for (let i = 0; i < this.map.currentRoom.guards.length; i++) {
                        if(pointHit(this.sprite, this.map.currentRoom.guards[i].sprite, SPRITE_SIZE + 15, SPRITE_SIZE/2 + 15) ||
                        pointHit(this.sprite, this.map.currentRoom.guards[i].sprite, SPRITE_SIZE + 15, SPRITE_SIZE/2 - 15)) this.map.currentRoom.guards[i].Kill();
                    }
                    if(pointHit(this.sprite, this.map.currentRoom.player.sprite, SPRITE_SIZE + 15, SPRITE_SIZE/2 + 15) ||
                    pointHit(this.sprite, this.map.currentRoom.player.sprite, SPRITE_SIZE + 15, SPRITE_SIZE/2 - 15))this.map.currentRoom.player.Kill();
                    if(this.map.currentRoom.hasTarget){
                        if(pointHit(this.sprite, this.map.currentRoom.target.sprite, SPRITE_SIZE + 15, SPRITE_SIZE/2 + 15) ||
                        pointHit(this.sprite, this.map.currentRoom.target.sprite, SPRITE_SIZE + 15, SPRITE_SIZE/2 - 15))this.map.currentRoom.target.Kill();
                    }
                    break;
                case Character.DIR_UP:
                    this._sprite.gotoAndPlay("UpAttack");
                    for (let i = 0; i < this.map.currentRoom.guards.length; i++) {
                        if(pointHit(this.sprite, this.map.currentRoom.guards[i].sprite, SPRITE_SIZE/2 + 15, -15) ||
                        pointHit(this.sprite, this.map.currentRoom.guards[i].sprite, SPRITE_SIZE/2 - 15, -15)) this.map.currentRoom.guards[i].Kill();
                    }
                    if(pointHit(this.sprite, this.map.currentRoom.player.sprite, SPRITE_SIZE/2 + 15, -15) ||
                    pointHit(this.sprite, this.map.currentRoom.player.sprite, SPRITE_SIZE/2 - 15, -15))this.map.currentRoom.player.Kill();
                    if(this.map.currentRoom.hasTarget){
                        if(pointHit(this.sprite, this.map.currentRoom.target.sprite, SPRITE_SIZE/2 + 15, -15) ||
                        pointHit(this.sprite, this.map.currentRoom.target.sprite, SPRITE_SIZE/2 - 15, -15))this.map.currentRoom.target.Kill();
                    }
                    break;
            }
            this.sprite.on("animationend", this.endAttack, this, true);
        }
    }

    protected endAttack(e:createjs.Event){
        this.state = Character.STATE_IDLE;
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
        for(let i:number = 0; i < this.map.currentRoom.guards.length; i++){
            switch(this.dir){
                case Character.DIR_DOWN:
                    if(pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, this.colOffset, 64)
                    || pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 64-this.colOffset, 64)
                    || pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 64/2, 64))
                        return true;
                    break;
                case Character.DIR_LEFT:
                    if(pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 0, this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 0, 64-this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 0, 64/2))
                        return true;
                    break;
                case Character.DIR_RIGHT:
                    if(pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 64, this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 64, this._sprite.getBounds().height-this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 64, this._sprite.getBounds().height/2))
                        return true;
                    break;
                case Character.DIR_UP:
                    if(pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, this.colOffset, 0)
                    || pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 64-this.colOffset, 0)
                    || pointHit(this._sprite, this.map.currentRoom.guards[i].sprite, 64/2, 0))
                        return true;
                    break;
            }
        }
        if(this.map.currentRoom.hasTarget){
            switch(this.dir){
                case Character.DIR_DOWN:
                    if(pointHit(this._sprite, this.map.currentRoom.target.sprite, this.colOffset, 64)
                    || pointHit(this._sprite, this.map.currentRoom.target.sprite, 64-this.colOffset, 64)
                    || pointHit(this._sprite, this.map.currentRoom.target.sprite, 64/2, 64))
                        return true;
                    break;
                case Character.DIR_LEFT:
                    if(pointHit(this._sprite, this.map.currentRoom.target.sprite, 0, this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.target.sprite, 0, 64-this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.target.sprite, 0, 64/2))
                        return true;
                    break;
                case Character.DIR_RIGHT:
                    if(pointHit(this._sprite, this.map.currentRoom.target.sprite, 64, this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.target.sprite, 64, this._sprite.getBounds().height-this.colOffset)
                    || pointHit(this._sprite, this.map.currentRoom.target.sprite, 64, this._sprite.getBounds().height/2))
                        return true;
                    break;
                case Character.DIR_UP:
                    if(pointHit(this._sprite, this.map.currentRoom.target.sprite, this.colOffset, 0)
                    || pointHit(this._sprite, this.map.currentRoom.target.sprite, 64-this.colOffset, 0)
                    || pointHit(this._sprite, this.map.currentRoom.target.sprite, 64/2, 0))
                        return true;
                    break;
            }
        }
        return false;
    }


    public update(){
        if(this.state == Character.STATE_DEAD) return;
        switch(this.state){
            case Character.STATE_MOVING:
                this.Move();
                break;
            case Character.STATE_ATTACKING:
                this.Attack();
                break;
        }
    }
    

}