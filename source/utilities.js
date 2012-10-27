// Utility merge from the awesome https://github.com/Titani/SO-ChatBot/
Object.merge = function () {
	return [].reduce.call( arguments, function ( ret, merger ) {

		Object.keys( merger ).forEach(function ( key ) {
			ret[ key ] = merger[ key ];
		});

		return ret;
	}, {} );
};

(function () {

	function Utilities(){
		// Constructor
	}

	this.Utilities = Utilities;

	Utilities.prototype.getRandomRange = function(_min, _max){   
		return Math.floor(Math.random()*(_max-_min+1))+_min;
	}
	
	Utilities.prototype.fGetRandomRange = function(_min, _max){   
		return Math.random()*(_max-_min)+_min;
	}
	
	Utilities.prototype.getDistance = function(a, b){
		return Math.sqrt((b.x - a.x) *(b.x - a.x) + (b.y - a.y) * (b.y - a.y));
	}
	
	Utilities.prototype.getAngle = function(a,b){
		var tx = b.x - a.x,
			ty = b.y - a.y,
			rad = Math.atan2(ty,tx),
			angle = rad/Math.PI * 180;
		
		return angle;
	}
	
	Utilities.prototype.getRad = function(a,b){
		var tx = b.x - a.x,
			ty = b.y - a.y,
			rad = Math.atan2(ty,tx);
		
		return rad;
	}
	
	Utilities.prototype.mouse = function(ev)
	{
		if(ev.pageX || ev.pageY){
			return {x:ev.pageX, y:ev.pageY};
		}
		return {
			x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
			y:ev.clientY + document.body.scrollTop  - document.body.clientTop
		};
	}
	
	Utilities.prototype.getGradColor = function(startColor, endColor, height, width){
		  var scale = -(width-height)/6,
			  r = startColor.r + scale*(endColor.r - startColor.r);
			  b = startColor.b + scale*(endColor.b - startColor.b);
			  g = startColor.g + scale*(endColor.g - startColor.g);

		  return "rgb(" +  Math.floor( Math.min(255,  Math.max(0, r))) + "," +  Math.floor( Math.min(255,  Math.max(0, g))) + "," +  Math.floor( Math.min(255,  Math.max(0, b))) + ")";
	}
	
	Utilities.prototype.preCalcRotation = function(resource, numRotations, frameWidth, frameHeight, offsetAngle){
		if(resource.nodeType === 1){
			var img = resource;
			resource = {};
			resource.source = img;
		}
		
		var tempCanvas = document.createElement("canvas"),
			tempCtx = tempCanvas.getContext("2d"),
			frameCanvas = document.createElement("canvas"),
			frameCtx = frameCanvas.getContext("2d"),
			frames =  resource.source.width/frameWidth,
			angleIncrement = 360/numRotations;
			startAngle = 0;

		if(offsetAngle){
			startAngle = offsetAngle;
		}
		
		tempCanvas.width = resource.source.width;
		tempCanvas.height = Math.ceil(frameHeight * 360/angleIncrement);
		frameCanvas.width = frameWidth;
		frameCanvas.height = frameHeight;
		
		// goes through each frame and rotates it adding it vertically
		for(var y = 0; y < numRotations; y++){
			for(var x = 0; x < frames; x++){
				frameCtx.clearRect(0,0,frameWidth,frameHeight);
				frameCtx.save();
				frameCtx.translate(frameCanvas.width/2, frameCanvas.height/2);
				frameCtx.rotate((startAngle + angleIncrement*y)*Math.PI/180);
				frameCtx.drawImage(resource.source,x*frameWidth,0,frameWidth,frameHeight,-frameWidth/2,-frameHeight/2,frameWidth,frameHeight); 
				frameCtx.restore();
				tempCtx.drawImage(frameCanvas,0,0,frameWidth,frameHeight,x*frameWidth,y*frameHeight,frameWidth,frameHeight); 
			}
		}
		//document.body.appendChild(tempCanvas);
		resource.source = tempCanvas;
		return tempCanvas;
	}
	
	Utilities.prototype.colorize = function(resource, hsv){
		var tempCanvas = document.createElement("canvas"),
			tempCtx = tempCanvas.getContext("2d");
			
			tempCanvas.width = resource.source.width;
			tempCanvas.height = resource.source.height;
			tempCtx.drawImage(resource.source, 0 , 0);
			
		var	imgd = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height),
			pix = imgd.data,
			h = hsv.h,
			s = hsv.s,
			v = hsv.v;
		
		for (var i = 0, n = pix.length; i <n; i += 4) {
			var hsv = this.rgbhsv({r : pix[i], g:pix[i + 1], b:pix[i + 2]});

			hsv.h+=h;
			if(hsv.h < 0){
				hsv.h = 0
			}else if(hsv.h > 360){
				hsv.h = 360;
			}
			hsv.s+=s;
			hsv.v+=v;
			
			var newColor = this.hsvrgb(hsv);
			
			pix[i] = newColor.r;
			pix[i+1] = newColor.g;
			pix[i+2] = newColor.b;
		}

		tempCtx.putImageData(imgd, 0, 0);
		//document.body.appendChild(tempCanvas);
		return tempCanvas.toDataURL();
	}
	
	Utilities.prototype.rgbhsv = function(color){
		var r = color.r,
			g = color.g,
			b = color.b,
			maxColor = Math.max(r,g,b),
			minColor = Math.min(r,g,b),
			h = 0,
			s = 0, 
			v = 0;
			
			if(maxColor == minColor){
				h = 0;
			}else if(maxColor == r){
				h = 60.0 * ((g - b) / (maxColor - minColor)) % 360.0;
			}else if(maxColor == g){
				h = 60.0 * ((b - r) / (maxColor - minColor)) + 120.0;
			}else if(maxColor == b){
				h = 60.0 * ((r - g) / (maxColor - minColor)) + 240.0;
			}
			
			v = maxColor;
			if(maxColor == 0.0){
				s = 0.0;
			}else{
				s = 1.0 - (minColor / maxColor);
			}
			
			return {h : h, s : s, v :v};
	}
	
	Utilities.prototype.hsvrgb = function(hsv){
		var h = hsv.h,
			s = hsv.s,
			v = hsv.v,
			color = {r:0,g:0,b:0},
			hi = Math.floor(h/60.0)%6,
			f =  (h / 60.0) - Math.floor(h / 60.0),
			p = v * (1.0 - s),
			q = v * (1.0 - (f*s)),
			t = v * (1.0 - ((1.0 - f) * s));
			
			switch(hi){
				case 0: 
					color.r =v;
					color.g = t; 
					color.b = p;
					break;
				case 1: 
					color.r =q;
					color.g = v; 
					color.b = p;
					break;
				case 2: 
					color.r = p;
					color.g = v; 
					color.b = t;
					break;
				case 3: 
					color.r = p;
					color.g = q; 
					color.b = v;
					break;
				case 4: 
					color.r = t;
					color.g = p; 
					color.b = v;
					break;
				case 5: 
					color.r = v;
					color.g = p; 
					color.b = q;
					break;
			}
			
			return color;
	}
})();
(function(p,n,j,t,q,u,v){function x(b){var c,d,a=this,f=b.length,e=0,i=a.c=a.d=a.f=0;a.a=[];a.e=[];for(f||(b=[f++]);e<j;)a.a[e]=e++;for(e=0;e<j;e++){c=a.a[e];i=g(i+c+b[e%f]);d=a.a[i];a.a[e]=d;a.a[i]=c}a.b=function(y){var h=a.a,k=g(a.c+1),l=h[k],m=g(a.d+l),o=h[m];h[k]=o;h[m]=l;for(var r=h[g(l+o)];--y;){k=g(k+1);l=h[k];m=g(m+l);o=h[m];h[k]=o;h[m]=l;r=r*j+h[g(l+o)]}a.c=k;a.d=m;return r};a.b(j)}function w(b,c,d,a){d=[];if(c&&typeof b=="object")for(a in b)if(a.indexOf("S")<5)try{d.push(w(b[a],c-1))}catch(f){}return d.length?d:""+b}function s(b,c,d,a){b+="";for(a=d=0;a<b.length;a++)c[g(a)]=g((d^=c[g(a)]*19)+b.charCodeAt(a));b="";for(a in c)b+=String.fromCharCode(c[a]);return b}function g(b){return b&j-1}n.seedrandom=function(b,c){var d=[],a;b=s(w(c?[b,p]:arguments.length?b:[(new Date).getTime(),p,window],3),d);a=new x(d);s(a.a,p);n.random=function(){for(var f=a.b(t),e=v,i=0;f<q;){f=(f+i)*j;e*=j;i=a.b(1)}for(;f>=u;){f/=2;e/=2;i>>>=1}return(f+i)/e};return b};v=n.pow(j,t);q=n.pow(2,q);u=q*2;s(n.random(),p)})([],Math,256,6,52);