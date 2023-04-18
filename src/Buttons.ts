import { AssetManager } from "./AssetManager";
import { Layout } from "./Layout";
import { Player } from "./Player";

export class Buttons{
    public static STATE_INACTIVE = 0;
    public static STATE_ACTIVE = 1;
    public static START = 0;
    public static WIN = 1;
    public static LOSE = 2;

    public state:number;
    private sprite:createjs.Sprite;
    private stage:createjs.StageGL;
    private assetManager:AssetManager;
    //private player:Player;
    private startScreenBG:createjs.Sprite;
    private MainBG:createjs.Sprite;
    private loseScreen:createjs.Sprite;
    private winScreen:createjs.Sprite;
    private map:Layout;

    public constructor(stage:createjs.StageGL, assetManager:AssetManager, map:Layout){
        this.stage = stage;
        this.assetManager = assetManager;
        //this.player = player;
        this.sprite = assetManager.getSprite("Buttons", "Button");
        this.sprite.x = 320-64;
        this.sprite.y = 320-32;
        this.startScreenBG = assetManager.getSprite("StartScreen", "StartScreen");
        this.MainBG = assetManager.getSprite("Background", "Background");
        this.loseScreen = this.assetManager.getSprite("Endings", "Death")
        this.winScreen = this.assetManager.getSprite("Endings", "Win");
        this.map = map;
        this.sprite.gotoAndStop(0);
    }

    public Activate(condition:number){
        createjs.Sound.stop();
        this.map.currentRoom.unload();
        this.stage.removeAllChildren();
        switch(condition){
            case Buttons.START:
                this.stage.addChild(this.startScreenBG);
                
                this.sprite.gotoAndStop(0);
                break;
            case Buttons.WIN:
                this.stage.addChild(this.winScreen);
                this.sprite.gotoAndStop(1);
                break;
            case Buttons.LOSE:
                this.stage.addChild(this.loseScreen);
                this.sprite.gotoAndStop(1);
                break;
        }
        this.state = Buttons.STATE_ACTIVE;
        this.stage.addChild(this.sprite);
        this.sprite.on("mousedown", this.Start, this, true);
    }

    public Start(){
        this.state = Buttons.STATE_INACTIVE;
        this.stage.dispatchEvent("reset");
    }

}