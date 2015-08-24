import Jest from '../../es2015/index';

const Game = new Jest({
    canvas : "jestCanvas",
    width: 640,
    height : 480,
    frameRate : Math.ceil(1000/60),
    showFrameRate : true
});

window.onload = function(){
    Game.load();
};
