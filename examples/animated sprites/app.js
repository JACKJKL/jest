/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _es2015Index = __webpack_require__(2);
	
	var _es2015Index2 = _interopRequireDefault(_es2015Index);
	
	var Game = new _es2015Index2["default"]({
	    canvas: "jestCanvas",
	    width: 640,
	    height: 480,
	    frameRate: Math.ceil(1000 / 60),
	    showFrameRate: true
	});
	
	window.onload = function () {
	    Game.load();
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _ResourceManager = __webpack_require__(3);
	
	var _ResourceManager2 = _interopRequireDefault(_ResourceManager);
	
	var _Renderer = __webpack_require__(4);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
	var _Label = __webpack_require__(5);
	
	var _Label2 = _interopRequireDefault(_Label);
	
	var Jest = (function () {
	    function Jest(options) {
	        _classCallCheck(this, Jest);
	
	        options = options || {};
	        this.renderCanvas = options.canvas || "playCanvas";
	        this.width = options.width || 320;
	        this.height = options.height || 240;
	        this.frameRate = options.frameRate || Math.ceil(1000 / 60);
	        this.showFrameRate = options.showFrameRate || false;
	        this.stateName = options.stateName || "0";
	
	        // State info
	        this.states = [];
	        this.currentState = {};
	
	        // Render stuff
	        this.renderer = {};
	        this.renderList = [];
	        this.entities = [];
	
	        // Timing
	        this.intervalId = {};
	        this.lastTime = Date.now();
	        this.accTime = 0;
	        this.timeStep = 1;
	
	        // game bounds
	        this.bounds = { x: 0, y: 0, width: this.width, height: this.height };
	
	        // used to show the fps
	        this.frameRateLabel = {};
	
	        // init the utilities and resource manager
	        this.resourceManager = new _ResourceManager2['default']();
	
	        // List of entities in a recent collision
	        this.hitEntities = [];
	
	        // Keep track of how many particles we have on screen
	        this.particleCount = 0;
	
	        Jest.frameRate = this.frameRate;
	        Jest.bounds = this.bounds;
	        Jest.particleCount = this.particleCount;
	        Jest.utilities = this.utilities;
	        Jest.states = this.states;
	        Jest.currentState = this.currentState;
	        Jest.focused = true;
	        Jest.keys = [];
	    }
	
	    /**
	    * Jest.load()
	    *
	    * prepares the canvas for rendering, and starts the update process
	    **/
	
	    _createClass(Jest, [{
	        key: 'load',
	        value: function load() {
	            this.loaded(this);
	        }
	
	        /**
	         * Jest.loaded()
	         * object event
	         * makes sure everything is loaded until continuing
	         **/
	    }, {
	        key: 'loaded',
	        value: function loaded(game) {
	            var self = this;
	            if (this.resourceManager.loadingComplete) {
	                game.init();
	                return true;
	            } else {
	                setTimeout(function () {
	                    self.loaded(game);
	                }, 100);
	                return false;
	            }
	        }
	
	        /**
	         * Jest.init()
	         *
	         * prepares the canvas for rendering, and starts the update process
	         **/
	    }, {
	        key: 'init',
	        value: function init() {
	            // base for starting, presetup ect.
	            var self = this;
	
	            this.renderCanvas = document.getElementById(this.renderCanvas);
	
	            if (this.renderCanvas === null) {
	                this.renderCanvas = document.createElement("canvas");
	            }
	
	            // disable dragging
	            this.renderCanvas.draggable = false;
	
	            // determine if the game has the focus or not
	            document.addEventListener("touchstart", function (event) {
	                if (event.target !== self.renderCanvas) {
	                    Jest.focused = false;
	                } else {
	                    Jest.focused = true;
	                }
	            });
	
	            //this.renderCanvas.addEventListener('touchstart', function(event){Jest.focused = true; self.clicked(event,self);}, false);
	            this.renderCanvas.addEventListener('click', function (event) {
	                Jest.focused = true;self.clicked(event, self);
	            }, false);
	            this.renderCanvas.addEventListener('mousemove', function (event) {
	                self.mouseMove(event, self);
	            }, false);
	            this.renderCanvas.addEventListener('mousedown', function (event) {
	                self.mouseDown(event, self);
	            }, false);
	            this.renderCanvas.addEventListener('mouseup', function (event) {
	                self.mouseUp(event, self);
	            }, false);
	
	            this.renderCanvas.addEventListener('contextmenu', function (event) {
	                event.preventDefault();
	            }, false);
	
	            // mousewheel
	            this.renderCanvas.addEventListener("mousewheel", function (event) {
	                self.mouseWheel(event, self);
	            }, false);
	            this.renderCanvas.addEventListener("DOMMouseScroll", function (event) {
	                self.mouseWheel(event, self);
	            }, false);
	
	            // keypress
	            document.addEventListener("keydown", function (event) {
	                if (Jest.focused) {
	                    self.keyDown(event, self);
	                }
	            }, false);
	            document.addEventListener("keyup", function (event) {
	                if (Jest.focused) {
	                    self.keyUp(event, self);
	                }
	            }, false);
	
	            this.renderCanvas.width = this.width;
	            this.renderCanvas.height = this.height;
	
	            this.renderer = new _Renderer2['default'](this.renderCanvas);
	
	            this.addState(this.stateName);
	            this.switchState({ 'id': 0 });
	
	            // setup a label to display the frameRate
	            if (this.showFrameRate) {
	                this.frameRateLabel = new _Label2['default']({ 'text': ' ', x: 0, y: 30, z: 1, 'font': '14pt arial bold' });
	                this.addEntity(this.frameRateLabel);
	            }
	
	            this.mouseX = 0;
	            this.mouseY = 0;
	
	            this.moused = false;
	            this.leftDown = false;
	            this.rightDown = false;
	            this.midDown = false;
	
	            this.update();
	        }
	
	        /**
	         * Jest.update()
	         *
	         * Main update loop for the game, updates all objects, and calls the renderer.
	         **/
	    }, {
	        key: 'update',
	        value: function update() {
	            var curTime = new Date().getTime(),
	                update = this.update;
	
	            this.deltaTime = curTime - this.lastTime;
	            this.lastTime = curTime;
	            this.accTime += this.deltaTime;
	
	            // Limit the delta queing
	            if (this.accTime > 60) {
	                this.accTime = 0;
	            }
	
	            while (this.accTime > this.timeStep) {
	                this.accTime -= this.timeStep;
	                var entities = this.entities,
	                    entLen = this.entities.length;
	
	                while (entLen--) {
	                    var object = entities[entLen];
	                    if (object !== undefined) {
	                        if (object.live) {
	                            object.update(this.timeStep / 100);
	                        } else {
	                            this.removeEntity(object);
	                        }
	                    }
	                }
	            }
	
	            this.renderer.redraw();
	            this.frameRateLabel.text = Math.round(1000 / this.deltaTime) + " fps";
	            this.currentFrameRate = Math.round(1000 / this.deltaTime);
	
	            var self = this;
	            requestAnimationFrame(function () {
	                self.update();
	            });
	        }
	
	        /**
	         * Jest.getKey()
	         * returns the state of a key
	         **/
	    }, {
	        key: 'getKey',
	        value: function getKey(key) {
	            //todo: add logic to return the state of the key, get the keycode based off of thekey passed
	            return Jest.keys[key];
	        }
	
	        /**
	         * Jest.keyDown()
	         * sets the state of the key pressed to true
	         **/
	    }, {
	        key: 'keyDown',
	        value: function keyDown(event, self) {
	            Jest.keys[event.keyCode] = true;
	        }
	
	        /**
	         * Jest.keyUp()
	         * sets the state of the key pressed to false
	         **/
	    }, {
	        key: 'keyUp',
	        value: function keyUp(event, self) {
	            Jest.keys[event.keyCode] = false;
	        }
	
	        /**
	         * Jest.clicked()
	         * object event
	         * handles the click event for the canvas
	         * TODO update this, I dont like how it requires origin and pos
	         **/
	    }, {
	        key: 'clicked',
	        value: function clicked(event, self) {
	            this.cX = 0;
	            this.cY = 0;
	
	            if (event.pageX || event.pageY) {
	                this.cX = event.pageX;
	                this.cY = event.pageY;
	            } else if (event.changedTouches) {
	                this.cX = event.changedTouches[0].pageX;
	                this.cY = event.changedTouches[0].pageY;
	            } else {
	                this.cX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	                this.cY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	            }
	
	            this.cX -= self.renderCanvas.offsetLeft;
	            this.cY -= self.renderCanvas.offsetTop;
	
	            var id = self.entities.length,
	                entities = self.entities;
	
	            while (id--) {
	                var entity = entities[id];
	                if (entity.clickable && entity.pos && entity.origin) {
	                    if (this.cX > entity.pos.x - entity.origin.x && this.cX < entity.pos.x - entity.origin.x + entity.width && this.cY > entity.pos.y - entity.origin.y && this.cY < entity.pos.y - entity.origin.y + entity.height) {
	                        entity.clicked();
	                        if (entity.noClickThrough) {
	                            break;
	                        }
	                    }
	                }
	            }
	
	            return { 'clickX': this.cX, 'clickY': this.cY };
	        }
	
	        /**
	         * Jest.mouseMove()
	         * object event
	         * handles the mouse move event
	         **/
	    }, {
	        key: 'mouseMove',
	        value: function mouseMove(event, self) {
	            if (event.pageX || event.pageY) {
	                self.mouseX = event.pageX - self.renderCanvas.offsetLeft;
	                self.mouseY = event.pageY - self.renderCanvas.offsetTop;
	            } else {
	                self.mouseX = event.clientX + document.body.scrollLeft - document.body.clientLeft - self.renderCanvas.offsetLeft;
	                self.mouseY = event.clientY + document.body.scrollTop - document.body.clientTop - self.renderCanvas.offsetTop;
	            }
	        }
	    }, {
	        key: 'mouseDown',
	        value: function mouseDown(event, self) {
	            self.moused = true;
	            if ('which' in event) {
	                switch (event.which) {
	                    case 1:
	                        self.leftDown = true;
	                        break;
	                    case 2:
	                        self.midDown = true;
	                        break;
	                    case 3:
	                        self.rightDown = true;
	                        break;
	                }
	            }
	
	            this.mdX = 0;
	            this.mdY = 0;
	
	            if (event.pageX || event.pageY) {
	                this.mdX = event.pageX;
	                this.mdY = event.pageY;
	            } else {
	                this.mdX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	                this.mdY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	            }
	
	            this.mdX -= self.renderCanvas.offsetLeft;
	            this.mdY -= self.renderCanvas.offsetTop;
	
	            var id = self.entities.length,
	                entities = self.entities;
	
	            while (id--) {
	                var entity = entities[id];
	                if (entity.clickable && entity.pos && entity.origin) {
	                    if (this.mdX > entity.pos.x - entity.origin.x && this.mdX < entity.pos.x - entity.origin.x + entity.width && this.mdY > entity.pos.y - entity.origin.y && this.mdY < entity.pos.y - entity.origin.y + entity.height) {
	                        entity.mouseDown();
	                    }
	                }
	            }
	
	            return { 'mouseDownX': this.mdX, 'mouseDownY': this.mdY };
	        }
	    }, {
	        key: 'mouseUp',
	        value: function mouseUp(event, self) {
	            self.moused = false;
	            self.leftDown = false;
	            self.midDown = false;
	            self.rightDown = false;
	        }
	    }, {
	        key: 'mouseWheel',
	        value: function mouseWheel(event, self) {
	            var dir = 0;
	            if ('wheelDelta' in event) {
	                if (Math.abs(event.wheelDelta) - event.wheelDelta === 0) {
	                    dir = -1;
	                } else {
	                    dir = 1;
	                }
	            } else if (event.detail) {
	                if (Math.abs(event.detail) - event.detail === 0) {
	                    dir = 1;
	                } else {
	                    dir = -1;
	                }
	            }
	
	            return dir;
	        }
	
	        // Handles Entities
	
	        /**
	         * Jest.addEntity()
	         * object entity, renderFalse bool, state object
	         * renderFalse : controls if the item is added to the renderer.. idk this is kind of hack, basically its for things you want in the
	         * main update loop but doesn't render at all, so like a container
	         * state {name : string, OR id : number}: allows you to specify what state you want to add the entity to, if you dont specify it adds it to the current state
	         **/
	    }, {
	        key: 'addEntity',
	        value: function addEntity(object, renderFalse, state) {
	            // add the live prop since the renderer/update chooses to display or update based on it
	            if (!("live" in object)) {
	                object.live = true;
	            }
	
	            this.renderFalse = renderFalse;
	
	            if (state) {
	                var foundState = this.getState(state);
	
	                if (foundState) {
	                    foundState.entityList.push(object);
	                    object.state = foundState;
	                }
	            } else {
	                this.entities.push(object);
	                object.state = this.currentState;
	            }
	
	            if (!renderFalse) {
	                this.renderer.addToRenderer(object);
	            }
	        }
	
	        /**
	         * Jest.removeEntity()
	         * object entity, state Object
	         * Removes an entity from the update cycle and renderer, you can also specify the state you want to remove from
	         **/
	    }, {
	        key: 'removeEntity',
	        value: function removeEntity(object, state) {
	            var entities = this.entities,
	                numEntities = entities.length;
	
	            if (state) {
	                var foundState = this.getState(state);
	
	                if (foundState) {
	                    entities = foundState.entityList;
	                    numEntities = entities.length;
	                }
	            }
	
	            var item = entities.indexOf(object);
	
	            if (typeof object.kill != 'undefined') {
	                object.kill();
	            }
	
	            entities.splice(item, 1);
	
	            this.renderer.removeFromRenderer(object);
	        }
	
	        /**
	         * Jest.addState()
	         * object options
	         * {name : string}
	         * Adds a state the Jest, states hold their own entity list, and render list
	         **/
	    }, {
	        key: 'addState',
	        value: function addState(name, enterState, exitState) {
	            var stateObj = {};
	
	            if (name) {
	                stateObj.name = name;
	            } else {
	                stateObj.name = this.states.length;
	            }
	
	            stateObj.enterState = enterState || undefined;
	
	            // assign it the next val
	            stateObj.id = this.states.length;
	            stateObj.renderList = [];
	            stateObj.entityList = [];
	            this.states.push(stateObj);
	        }
	
	        /**
	         * Jest.getState()
	         * object options
	         * {name : string, id : number}
	         * Finds and returns the state
	         **/
	    }, {
	        key: 'getState',
	        value: function getState(options) {
	            var foundState = false;
	
	            if ("id" in options) {
	                foundState = this.states[options.id];
	            } else if ("name" in options) {
	                var stateName = options.name;
	                for (var i = 0, len = this.states.length; i < len; i++) {
	                    if (this.states[i].name === stateName) {
	                        foundState = this.states[i];
	                        break;
	                    }
	                }
	            }
	
	            return foundState;
	        }
	
	        /**
	         * Jest.switchState()
	         * object options
	         * {name : string, id : number}
	         * Adds a state the Jest, states hold their own entity list, and render list
	         **/
	    }, {
	        key: 'switchState',
	        value: function switchState(options) {
	            var foundState = this.getState(options);
	
	            // throw in a debug if the state hasn't been found
	            if (foundState) {
	                if (options.exitTransition && !options.exitComplete) {
	                    // perform exit transition if one exists
	                    options.exitComplete = true;
	                    Game.addEntity(new Jest.Transition(options.exitTransition, function () {
	                        Game.switchState(options);
	                    }));
	                } else {
	                    // switch the render list, and the entity list
	                    this.currentState = foundState;
	                    this.renderer.renderList = this.currentState.renderList;
	                    this.entities = this.currentState.entityList;
	
	                    // if the state has an enter state function call it
	                    if (foundState.enterState) {
	                        foundState.enterState();
	                    }
	
	                    // Perform enter transition if one exists
	                    if (options.enterTransition) {
	                        Game.addEntity(new Jest.Transition(options.enterTransition));
	                    }
	                }
	            }
	        }
	
	        /**
	         * Jest.checkHit(x,y)
	         * x,y number
	         * Checks all the entities to see if they were hit by the coords. Very expensive right now definitly need to clean it up
	         **/
	    }, {
	        key: 'checkHit',
	        value: function checkHit(x, y) {
	            var numEntities = this.entities.length,
	                entities = this.entities;
	
	            this.hitEntities = [];
	
	            for (var id = 0, entLen = this.entities.length; id < entLen; id++) {
	                var object = entities[id];
	                if (object.live && object.clickable) {
	                    if (x > object.x && x < object.x + object.width && y > object.y && y < object.y + object.height) {
	                        this.hitEntities.push(object);
	                    }
	                }
	            }
	        }
	    }]);
	
	    return Jest;
	})();
	
	exports['default'] = Jest;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var ResourceManager = (function () {
	    function ResourceManager() {
	        _classCallCheck(this, ResourceManager);
	
	        this.resources = [];
	        this.loaded = 0;
	        this.loadingComplete = true;
	    }
	
	    /**
	     * Resourcemanager.add(_resource, _type)
	     * object resource, String/Number, String
	     * adds a new resource for use and begins the process of loading
	     **/
	
	    _createClass(ResourceManager, [{
	        key: 'add',
	        value: function add(_resource, _type, _name) {
	            var resource = { 'path': _resource, 'type': _type, 'name': _name };
	
	            // if the resource is an existing image
	            if (_resource.src) {
	                resource.path = _resource.src;
	            }
	
	            this.loadingComplete = false;
	
	            if (_name === undefined) {
	                _name = "";
	            }
	
	            if (_type == 1 || _type == "img" || _type === null) {
	                if (_resource.nodeType === 1) {
	                    resource.source = _resource;
	                } else {
	                    resource.source = new Image();
	                }
	
	                this.resources.push({ resource: resource, name: _name });
	                resource.source.onload = (function (callback, res) {
	                    resource.loaded = true;callback.loadImg(callback, res);
	                })(this, resource);
	
	                if (_resource.nodeType === 1) {
	                    resource.source.src = _resource.src;
	                } else {
	                    resource.source.src = _resource;
	                }
	            } else if (_type == 2 || _type == "audio") {
	                resource.source = new Audio();
	                this.resources.push({ resource: resource, name: _name });
	                this.loadAudio(resource);
	                resource.source.src = _resource;
	            }
	
	            return resource;
	        }
	
	        /**
	         * Resourcemanager.loadImg()
	         * object event
	         * reports when an image is loaded
	         **/
	    }, {
	        key: 'loadImg',
	        value: function loadImg(callback, resource) {
	            if (resource.source.complete && resource.source.width) {
	                callback.loaded++;
	
	                if (callback.loaded === callback.resources.length) {
	                    callback.loadingComplete = true;
	                }
	            } else {
	                setTimeout(function () {
	                    callback.loadImg(callback, resource);
	                }, 10);
	            }
	        }
	
	        /**
	         * Resourcemanager.loadAudio(audio)
	         * object audio resource
	         * reports when audio is loaded
	         **/
	    }, {
	        key: 'loadAudio',
	        value: function loadAudio(audio, timeOut) {
	            clearTimeout(timeOut);
	            timeOut = 0;
	
	            var self = this;
	
	            if (audio.source.readyState > 0) {
	                this.loaded++;
	
	                if (this.loaded === this.resources.length) {
	                    this.loadingComplete = true;
	                }
	            } else {
	                timeOut = setTimeout(function () {
	                    self.loadAudio(audio, timeOut);
	                }, 100);
	            }
	        }
	
	        /**
	         * Resourcemanager.getResource(name)
	         * string/text
	         * returns the resource by name if found
	         **/
	    }, {
	        key: 'getResource',
	        value: function getResource(_name) {
	            var resources = this.resources;
	
	            for (var i = 0, l = resources.length; i < l; i++) {
	                if (resources[i].name == _name) {
	                    return resources[i].resource;
	                }
	            }
	        }
	    }]);
	
	    return ResourceManager;
	})();
	
	exports['default'] = ResourceManager;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Renderer = (function () {
	    function Renderer(canvas) {
	        _classCallCheck(this, Renderer);
	
	        this.renderList = [];
	        this.canvas = canvas;
	        this.context = this.canvas.getContext("2d");
	        this.width = this.canvas.width;
	        this.height = this.canvas.height;
	    }
	
	    // Todo: I dont like this. fix the sorting, right now sorts on y, but could potentially sort based on z
	
	    _createClass(Renderer, [{
	        key: "redraw",
	        value: function redraw() {
	            this.context.clearRect(0, 0, this.width, this.height);
	            //this.renderList.sort(function(a,b){return b.y-a.y});
	
	            this.renderList.sort(function (a, b) {
	                if (a.bg && b.bg) {
	                    return b.bgIndex - a.bgIndex;
	                } else if (a.ui && b.ui) {
	                    return b.uiIndex - a.uiIndex;
	                } else if (a.bg || b.ui) {
	                    return 1;
	                } else if (b.bg || a.ui) {
	                    return -1;
	                } else if (a.pos && b.pos) {
	                    return b.pos.z - a.pos.z;
	                }
	                return 0;
	            });
	
	            var id = this.renderList.length;
	
	            while (id--) {
	                var curObject = this.renderList[id];
	                if (curObject.visible) {
	                    curObject.render(this.context);
	                }
	            }
	        }
	
	        /**
	         * Renderer.addToRenderer(object)
	         *
	         * add a new item to the renderer
	         **/
	    }, {
	        key: "addToRenderer",
	        value: function addToRenderer(object) {
	            this.renderList.push(object);
	        }
	
	        /**
	         * Renderer.removeFromRenderer(object)
	         *
	         * remove an item from the renderer
	         **/
	    }, {
	        key: "removeFromRenderer",
	        value: function removeFromRenderer(object) {
	            var list = this.renderList,
	                objIndex = list.indexOf(object);
	
	            if (objIndex !== -1) {
	                list.splice(list.indexOf(object), 1);
	            }
	        }
	    }]);
	
	    return Renderer;
	})();
	
	exports["default"] = Renderer;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Label = (function () {
	    function Label(options) {
	        _classCallCheck(this, Label);
	
	        options = options || {};
	        this.text = options.text || "Undefined Label Text";
	        this.font = options.font || "1em Arial";
	
	        this.pos = { x: 0, y: 0 };
	        this.pos.x = options.x || 0;
	        this.pos.y = options.y || 0;
	        this.pos = options.pos || { x: this.pos.x, y: this.pos.y };
	        this.color = options.color || "#fff";
	
	        this.x = this.pos.x;
	        this.y = this.pos.y;
	
	        this.live = true;
	        this.visible = true;
	    }
	
	    _createClass(Label, [{
	        key: "update",
	        value: function update(deltaTime) {}
	
	        // Draw the label
	    }, {
	        key: "render",
	        value: function render(context) {
	            context.fillStyle = this.color;
	            context.font = this.font;
	            context.fillText(this.text, this.pos.x, this.pos.y);
	        }
	    }]);
	
	    return Label;
	})();
	
	exports["default"] = Label;
	module.exports = exports["default"];

/***/ }
/******/ ])
//# sourceMappingURL=app.js.map