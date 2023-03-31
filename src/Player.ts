import { AssetManager } from "./AssetManager";
import { Character } from "./Character";
import { Layout } from "./Layout";

export class Player extends Character{

    public map:Layout;

    public constructor(map:Layout, stage:createjs.StageGL, assetManager:AssetManager){
        super(assetManager.getSprite("Player", "DownWalk"), stage, assetManager);
        this.PositionMe(320, 320);
        this.stage.addChild(this.sprite);
        this.map = map;
    }

}