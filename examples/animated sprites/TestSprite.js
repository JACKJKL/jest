import Sprite from '../../es2015/Sprite';
import Vector from '../../es2015/Vector';

export default class TestSprite extends Sprite{
    constructor(options){
        super(options)       

        this.width = 32;
        this.height = 32;
        this.shape = true;
        this.color = {r: 255, g: 0, b: 0, a: 255};
    }
};
