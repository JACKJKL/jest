import Jest from '../../es2015/index';
import TestSprite from './TestSprite';

let Game = class Game extends Jest{
    constructor(options){
        super(options);
    }
    init(){
        super.init();
        this.gameState = {};
        let gameState = this.gameState;
        gameState.sprites = [];
        let testSprite = new TestSprite({x: Math.random() * 640, y: Math.random() * 480 });
        gameState.sprites.push(testSprite);
        this.addEntity(testSprite);
    }
}

let AnimatedSpritesExample = new Game({
            canvas : "jestCanvas",
            width: 640,
            height : 480,
            frameRate : Math.ceil(1000/60),
            showFrameRate : true
        });

window.onload = function(){
    AnimatedSpritesExample.load();
};
