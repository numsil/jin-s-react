//프래임과 키프래임을 동시에 지원하는 녀석이다
function AnmateKeyFrameInfo()
{
	this.totalFrame = 0;
	this.animateFrame = null;
	this.animateFrameLen = null;
	this.animateFrameOffset = null;
	this.nCurrentIndex = 0;
	this.nCurrentFrame = -1;
	this.bPlay = true;
	this.repeat = -1;			//-1 이면 무한 반복
	
	this.handler = null;
	
	this.tempFrame = null;
	
	this.init = function()
	{
		this.handler = new EventHandler();
		this.animateFrame = [];
		this.animateFrameLen = [] ;
		this.animateFrameOffset = [] ;
		
		this.tempFrame = new AnmateFrame( null, {});
	}
	
	this.append = function( aniFrame, len, bKeyframe )
	{
		aniFrame.keyframe = bKeyframe;
		this.animateFrame.push(aniFrame);
		this.animateFrameLen.push( len );
		this.animateFrameOffset.push( this.totalFrame );
		this.totalFrame += len;
	}
	
	this.play = function()
	{
		this.bPlay = true;
	}
	
	this.onEnterFrame = function( oCanvas )
	{
		this.nCurrentFrame++;
		var nTotal = this.totalFrame;
		var i = 0;
		
		if( this.totalFrame <= this.nCurrentFrame )
		{
			if( this.repeat != 0 )
			{
				if( this.repeat > 0 ) this.repeat--;
				this.gotoAndPlay(0);
			}
			else
			{
				this.nCurrentFrame--;
				this.stop();
				this.handler.doHandle( "endOfFrame", null );
			}
		}

		//현재 Frame 서치
		for( i=this.animateFrame.length-1;i>=0;i-- )
		{
			nTotal -= this.animateFrameLen[i];
			if( this.nCurrentFrame >= nTotal ){ break; }
		}
		this.nCurrentIndex = i;
		
	}
	
	this.do = function( oCanvas ) 
	{
		//마지막 프래임이거나, 혹은 뒤가 없다
		if( this.nCurrentIndex == this.animateFrame.length -1 || !this.animateFrame[this.nCurrentIndex].keyframe ) 
		{
			this.animateFrame[this.nCurrentIndex].do(oCanvas);		
		}
		else
		{
			//마지막이 아니므로 어디쯤 있는건지 계산 필요
			var sOffset = this.animateFrameOffset[this.nCurrentIndex];
			var eOffset = this.animateFrameOffset[this.nCurrentIndex+1];
			var len = this.animateFrameLen[this.nCurrentIndex];
			var move = this.nCurrentFrame - sOffset;
			
			this.tempFrame.resource = this.animateFrame[this.nCurrentIndex].resource;
			this.tempFrame.x 			= this.animateFrame[this.nCurrentIndex].x + (this.animateFrame[this.nCurrentIndex+1].x 			- this.animateFrame[this.nCurrentIndex].x)*move/len; 
			this.tempFrame.y 			= this.animateFrame[this.nCurrentIndex].y + (this.animateFrame[this.nCurrentIndex+1].y 			- this.animateFrame[this.nCurrentIndex].y)*move/len; 
			this.tempFrame.xscale = this.animateFrame[this.nCurrentIndex].xscale + (this.animateFrame[this.nCurrentIndex+1].xscale	- this.animateFrame[this.nCurrentIndex].xscale)*move/len; 
			this.tempFrame.yscale = this.animateFrame[this.nCurrentIndex].yscale + (this.animateFrame[this.nCurrentIndex+1].yscale	- this.animateFrame[this.nCurrentIndex].yscale)*move/len; 
			this.tempFrame.alpha = this.animateFrame[this.nCurrentIndex].alpha + (this.animateFrame[this.nCurrentIndex+1].alpha		- this.animateFrame[this.nCurrentIndex].alpha)*move/len; 
			
			this.tempFrame.do(oCanvas);
		}
	}
	
	this.stop = function()
	{
		this.bPlay = false;
	}
	
	this.gotoAndPlay = function( frame )
	{
		this.nCurrentFrame = frame;
		this.play();
	}
	
	this.gotoAndStop = function( frame )
	{
		this.nCurrentFrame = frame;
		this.stop();
	}
	
	this.init();
	return this;
}

function AnmateFrame( resource, params )
{
	this.resource = null;
	this.x = 0;
	this.y = 0;
	this.xscale = 100;
	this.yscale = 100;
	this.alpha = 100;
	
	this.init = function( resource, params )
	{
		this.resource = resource;
		
		if( params.x ) this.x = params.x;
		if( params.y ) this.y = params.y;
		if( params.xscale ) this.xscale = params.xscale;
		if( params.yscale ) this.yscale = params.yscale;
		if( params.alpha ) this.alpha = params.alpha;
		
	}
	
	this.do = function( oCanvas )
	{
		if( this.resource )
		{
			oCanvas.globalAlpha = this.alpha/100;
			this.resource.draw( oCanvas, this.x, this.y, this.xscale, this.yscale );
			oCanvas.globalAlpha = 1;
		}
	}
	
	this.init( resource, params );
	return this;
}

//연속적인 이미지를 애니메이트 하긴 좋지만 확장성이 떨어진다
function AnmateInfo()
{
	this.animateFrame = null;
	this.nCurrentFrame = -1;
	this.bPlay = true;
	this.repeat = -1;			//-1 이면 무한 반복
	
	this.handler = null;
	
	this.init = function()
	{
		this.handler = new EventHandler();
		this.animateFrame = [];
	}
	
	this.append = function( aniFrame )
	{
		this.animateFrame.push(aniFrame);
	}
	
	this.play = function()
	{
		this.bPlay = true;
	}
	
	this.onEnterFrame = function( oCanvas )
	{
	
		this.nCurrentFrame++;
		if( this.animateFrame.length <= this.nCurrentFrame )
		{
			if( this.repeat != 0 )
			{
				if( this.repeat > 0 ) this.repeat--;
				this.gotoAndPlay(0);
			}
			else
			{
				this.nCurrentFrame--;
				this.stop();
				this.handler.doHandle( "endOfFrame", null );
			}
		}
	}
	
	this.do = function( oCanvas ) 
	{
		this.animateFrame[this.nCurrentFrame].do(oCanvas);		
	}
	
	this.stop = function()
	{
		this.bPlay = false;
	}
	
	this.gotoAndPlay = function( frame )
	{
		this.nCurrentFrame = frame;
		this.play();
	}
	
	this.gotoAndStop = function( frame )
	{
		this.nCurrentFrame = frame;
		this.stop();
	}
	
	this.init();
	return this;
}

var Anmate = 
{
	oNodes:[]
	
	,E_ANITYPE_SPIRTE:0
	,E_ANITYPE_IMAGE:1
	,E_ANITYPE_KEYFRAME:2
	
	,onEnterFrame:function( oCanvas )
	{
		//UTIL.debug("on "+this.oNodes.length);
		for( var i=0;i<this.oNodes.length;i++ )
		{
			if( this.oNodes[i].bPlay )
				this.oNodes[i].onEnterFrame( oCanvas );
			if( this.oNodes[i] )
				this.oNodes[i].do( oCanvas );
		}
	}

	,append:function( oNode )
	{
		this.oNodes.push(oNode);
		//if( oNode.init ) oNode.init();
	}

	,remove:function( oNode )
	{
		for( var i=0;i<this.oNodes.length;i++ )
		{
			if( this.oNodes[i] == oNode ) { this.oNodes.remove( i ); i--; }
		}
	}
}
